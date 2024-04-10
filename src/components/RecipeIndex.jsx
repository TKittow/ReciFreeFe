import './RecipeIndex.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function RecipeIndex() {
    const [recipes, setRecipes] = useState([])
    const [meals, setMeals] = useState([])

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

    async function getMeals(){
      try{
          const accessToken = localStorage.getItem("access_token")
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/meals`, {
              headers: {
                  Authorization: `Bearer ${accessToken}`
              }
          })
          console.log(res.data)
          setMeals(res.data)
      }
      catch(err){
          console.error(err)
      }
  }
  useEffect(()=> {
      getMeals()
  },[])

  function sourceChanger(source) {
    const domainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n?]+)/g;
    const matches = domainRegex.exec(source);
    
    if (matches && matches.length >= 2) {
        const domain = matches[1];
        const dotIndex = domain.indexOf('.');
        return dotIndex !== -1 ? domain.substring(0, dotIndex) : domain;
    } else {
        return null;
    }
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
            <p className='foodName bolded'>{recipe.name}</p>
            {/* <p className='description'>{recipe.description}</p> */}
            <div className='ingredients'>
              {/* {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                <div key={idx}>{ingredient.name}</div>
              ))} */}
            </div>
          </div>
        </Link>
      ))}
    </div>
    <br />
    <hr />
    <p>Saved Online Recipes</p>
    <hr />
    <br />
    <div className='cardHolder'>
      {meals && meals.map((meal, index) => (
         <Link to={`/meals/${meal.api_id}`} key={index}>
         <div className='recipeCard' style={{ 
           backgroundImage: `url(${meal.image})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center', }}>
             {meal.strSource? 
             <div className='author bolded'>Source: {sourceChanger(meal.source)}</div>
           :
           <></>}
           
           <p className='foodName bolded'>{meal.name}</p>
           {/* <p className='description'>{recipe.description}</p> */}
         </div>
       </Link>
      ))}
    </div>
    </>
  )
}
