import './RecipeIndex.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function RecipeIndex() {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    async function getRecipes(){
        try{
            const accessToken = localStorage.getItem("access_token")
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setRecipes(res.data)
        }
        catch(err){
            console.error(err)
        }
    }
    useEffect(()=> {
        getRecipes()
    },[])

    function moveToHome(){
      navigate(`/`)
    }

  return (
    <>
    <div className='cardHolder'>
      {recipes && recipes.map((recipe, idx) => (
        <Link to={`/recipes/${recipe.id}`} key={idx}>
          <div className='recipeCard' style={{ 
            backgroundImage: `url(${recipe.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', }}>
              {recipe.author !== 'Unidentified'? <>
              <p className='foodAuthor bolded'>{recipe.author}</p>
              </> : <></>}
            
            <p className='foodName bolded'>{recipe.name}</p>
            {/* <div className='ingredients'>
              {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                <div key={idx}>{ingredient.name}</div>
              ))}
            </div> */}
          </div>
        </Link>
      ))}
    </div>
    <div className='center'>
      <button onClick={moveToHome}>Search for a recipe</button>
    </div>
    </>
  )
}
