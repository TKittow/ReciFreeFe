import React, {useEffect, useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { currentUser } from '../lib/CurrentUser'
import './RecipeDetail.css'


export default function RecipeDetail() {
    const [recipe, setRecipe] = useState({})
    // const [meal, setMeal] = useState({})
    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editImage, setEditImage] = useState('')
    const [author, setAuthor] = useState('')
    

    const { id } = useParams()
    const navigate = useNavigate()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleEditClose = () => setShowEdit(false)
    const handleEditShow = () => {
        setEditName(recipe.name)
        setEditDescription(recipe.description)
        setEditImage(recipe.image)
        setShowEdit(true)
    }

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const userData = currentUser()
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userData}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                });
                
                setAuthor(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        };
    
        fetchCurrentUser();
    }, []);

    const handleChange = (e) =>{
        const { name, value } = e.target
        if(name === 'editName') setEditName(value)
        if(name === 'editDescription') setEditDescription(value)
        if(name === 'editImage') setEditImage(value)
    }

    async function updateRecipe(){
        try{
            const accessToken = localStorage.getItem("access_token")
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}/`,
            {
                name: editName,
                description: editDescription,
                author: currentUser().user_id,
                image: editImage,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setRecipe({
                ...recipe,
                name: editName,
                description: editDescription,
                image: editImage
            })
            setShowEdit(false)
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        async function fetchRecipe(){
            try{
                const accessToken = localStorage.getItem("access_token")
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setRecipe(res.data)
            }
            catch(err){
                console.error(err)
            }
        }
        fetchRecipe()
    },[id])

    async function deleteRecipe(){
        try{
            const accessToken = localStorage.getItem("access_token")
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            navigate('/recipes')
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <>
        <div className='recipeBody'>
            <p>{recipe?.author?.username}</p>
            <div className='bold'>{recipe.name}</div>
            {author === recipe.author? <>
                <div className='buttons'>
            <Button variant='primary' onClick={handleEditShow}>
                Edit
            </Button>
            <Button variant='outline-danger' onClick={handleShow}>
                Delete
            </Button>
            </div>
            </> : <></>}
            
            <img src={recipe.image} alt={recipe.name} width={'70%'} className='centre'/>
            <hr />
            <p>{recipe.description}</p>
            <ul>{recipe.ingredients && recipe.ingredients.map((ingredient, idx)=>(
                <li key={idx}>{ingredient.name}</li>
            ))}</ul>
            <div>{recipe.steps}</div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to Delete {recipe.name}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer className='buttonWrapper'>
                <Button variant="warning" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => { deleteRecipe(); handleClose(); }}>
                    Delete {recipe.name}
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEdit} onHide={handleEditClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Edit {recipe.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="editName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="editName" name="editName" value={editName} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editDescription" className="form-label">Description</label>
                        <textarea className="form-control" id="editDescription" name="editDescription" value={editDescription} onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editImage" className="form-label">Image</label>
                        <input type='text' className="form-control" id="editImage" name="editImage" value={editImage} onChange={handleChange}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={handleEditClose}>
                    Close
                </Button>
                <Button variant="success" onClick={updateRecipe}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
      );
    }