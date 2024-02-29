import axios from 'axios'
import React, { useEffect, useState } from 'react'


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
    <div>{recipes && recipes.map((recipe, idx)=>(
        <div key={idx} className='recipeCard'>
        <p>{recipe.name}</p>
        <p>Author: {recipe.author}</p>
        <p>{recipe.description}</p>
        <div>{recipe.ingredients && recipe.ingredients.map((ingredient, idx)=>(
            <div>{ingredient.name}</div>
        ))}</div>
        </div>
    ))}</div>
  )
}
