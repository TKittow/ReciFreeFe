import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './MealDetail.css'


export default function MealDetail() {
    const [meal, setMeal] = useState({})
    const { id } = useParams()

    useEffect(() => {
        async function fetchMeal() {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                console.log(response.data);
                setMeal(response.data.meals[0]);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMeal();
    }, [id]);

    let ingredients = []
    let measurements = []
    let i = 1
    while (meal[`strIngredient${i}`]) {
        ingredients.push(meal[`strIngredient${i}`])
        measurements.push(meal[`strMeasure${i}`])
        i++
    }


  return (
    <div className="meal-detail-container">
        <h1>{meal.strMeal}</h1>
        <h6>{meal.strArea}</h6>
        <br />
        <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
        <br />
        <h2 className="section-title">Ingredients</h2>
        <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
                <li key={index}>{measurements[index]} {ingredient}</li>
            ))}
        </ul>
        <div className="instructions-section">
            <h2 className="section-title">Instructions</h2>
            {meal.strInstructions ? (
                <p>{meal.strInstructions}</p>
            ) : (
                <p className="not-available">No Instructions Available</p>
            )}
        </div>
        <div className="tutorial-section">
            <h2 className="section-title">Tutorial</h2>
            {meal.strYoutube ? (
                <a href={meal.strYoutube} className="tutorial-link">Click here!</a>
            ) : (
                <p className="not-available">No Tutorial Available</p>
            )}
        </div>
    </div>
    );
}
