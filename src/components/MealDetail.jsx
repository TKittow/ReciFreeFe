import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './MealDetail.css'
import { currentUser } from '../lib/CurrentUser'


export default function MealDetail() {
    const [meal, setMeal] = useState({})
    const [author, setAuthor] = useState('')
    const { id } = useParams()
    const [saved, setSaved] = useState(true)

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
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const userData = currentUser(); // Assuming this returns the user ID
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userData}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(response.data.username)
                
                setAuthor(response.data.username);
                checkSaved(response.data.username)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchCurrentUser();
        //eslint-disable-next-line
    }, []);

    const checkSaved = async (username) => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/meals/${username}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(res.data);
            let meals = res.data
            meals.forEach((meal)=>{
                console.log(id)
                console.log(meal.api_id)
                if (meal.api_id !== id){
                    setSaved(false)
                }
            })
        } catch (err) {
            console.error(err);
        }
    }

    let ingredients = []
    let measurements = []
    let i = 1
    while (meal[`strIngredient${i}`]) {
        ingredients.push(meal[`strIngredient${i}`])
        measurements.push(meal[`strMeasure${i}`])
        i++
    }

    // name = models.CharField(max_length=100)
    // apiId = models.CharField(max_length=20)
    // description = models.TextField()
    // source = models.CharField(max_length=200)
    // created_at = models.DateTimeField(auto_now_add=True)
    // updated_at = models.DateTimeField(auto_now=True)
    // image = models.TextField()

    async function postRecipe(meal){
        try {
            const mealData = {
                name: meal.strMeal,
                api_id: meal.idMeal,
                description: meal.strArea,
                source: meal.strSource,
                image: meal.strMealThumb,
                steps: meal.strInstructions,
                author: author,
            };
            console.log(mealData)

            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/meals/`,
                mealData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            window.location.href = `/`;
        } catch (err) {
            console.error(err);
        }
    }


  return (
    <div className="meal-detail-container">
        <h1>{meal.strMeal}</h1>
        <h6>{meal.strArea}</h6>
        {saved === false ? <>
            <button onClick={()=> postRecipe(meal)}>Add Recipe</button>
        </> : <>
        </>}
        
        <br />
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
