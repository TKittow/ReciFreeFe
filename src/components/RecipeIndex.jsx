import './RecipeIndex.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function RecipeIndex() {
    const [recipes, setRecipes] = useState([])

    async function getRecipes(){
        try{
            const accessToken = localStorage.getItem("access_token")
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(res.data)
            setRecipes(res.data)
        }
        catch(err){
            console.error(err)
        }
    }
    useEffect(()=> {
        getRecipes()
    },[])

  return (
    <div className='cardHolder'>
      {recipes && recipes.map((recipe, idx) => (
        <Link to={`/recipes/${recipe.id}`} key={idx}>
          <div className='recipeCard' style={{ 
            backgroundImage: `url(${recipe.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', }}>
            <div className='author'>Author: {recipe.author.username}</div>
            <p className='foodName'>{recipe.name}</p>
            <p className='description'>{recipe.description}</p>
            <div className='ingredients'>
              {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                <div key={idx}>{ingredient.name}</div>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
