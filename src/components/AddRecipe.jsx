import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { currentUser } from '../lib/CurrentUser'
import './AddRecipe.css'

export default function AddRecipe() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([{ ingredient: '', measurement: '' }]);
    const [image, setImage] = useState('')
    const [steps, setSteps] = useState('')
    const [author, setAuthor] = useState(null)

    // let nameValue = 'Test'

    // function getThisUser(id){
    //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then(response => {
    //         const userData = response.data
    //         nameValue = userData.username
    //         setAuthor(nameValue)
    //     })
    //     .catch(error => console.error(error))
        
    // }

    // getThisUser(userId)
    useEffect(() => {
        const fetchCurrentUser = () => {
            const userData = currentUser();
            setAuthor(userData.user_id);
            // console.log(userData.user_id) DOES RETURN THE ID NUMBER
        };

        fetchCurrentUser();
    }, []);

    const handleChange = (e, index) => {
        const { name, value } = e.target
        if (name === 'name') {
            setName(value);
        }  if (name === 'description') {
            setDescription(value)
        } else if (name === 'image') {
            setImage(value);
        } else if (name === 'ingredient') {
            const newIngredients = [...ingredients]
            newIngredients[index].ingredient = value
            setIngredients(newIngredients)
        } else if (name === 'measurement') {
            const newIngredients = [...ingredients]
            newIngredients[index].measurement = value
            setIngredients(newIngredients)
        } else if (name === 'steps') {
            setSteps(value)
        }
    };




    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingredient: '', measurement: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const recipeData = {
                name,
                author: author,
                description,
                ingredients,
                image,
                steps,
            };

            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/recipes/`,
                recipeData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            window.location.href = `/recipes`;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Title:</p>
            <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Recipe Title"
                required
            />
            <br />
            <p>Description:</p>
            <textarea
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <br />
            <p>Ingredients:</p>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="ingredient"
                        value={ingredient.ingredient}
                        onChange={(e) => handleChange(e, index)}
                        placeholder={"Ingredient " + (index +1) }
                        required
                    />
                    <input
                        type="text"
                        name="measurement"
                        value={ingredient.measurement}
                        onChange={(e) => handleChange(e, index)}
                        placeholder={"Measurement " + (index +1)}
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
            <br />
            <p>Image URL:</p>
            <input
                type="text"
                name="image"
                value={image}
                onChange={handleChange}
                placeholder="Image URL"
                required
            />
            <br />
            <p>Steps:</p>
            <textarea 
                name="steps"
                value={steps}
                onChange={handleChange}
                placeholder='Steps'
                required
            ></textarea>
            <br />
            <button type="submit">ADD</button>
        </form>
    );
}