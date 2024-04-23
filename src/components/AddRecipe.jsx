import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { currentUser } from '../lib/CurrentUser'
import './AddRecipe.css'

export default function AddRecipe() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [ingredient1, setIngredient1] = useState('')
    const [ingredient2, setIngredient2] = useState('')
    const [ingredient3, setIngredient3] = useState('')
    const [ingredient4, setIngredient4] = useState('')
    const [ingredient5, setIngredient5] = useState('')
    const [ingredient6, setIngredient6] = useState('')
    const [ingredient7, setIngredient7] = useState('')
    const [ingredient8, setIngredient8] = useState('')
    const [ingredient9, setIngredient9] = useState('')
    const [ingredient10, setIngredient10] = useState('')
    const [ingredient11, setIngredient11] = useState('')
    const [ingredient12, setIngredient12] = useState('')
    const [ingredient13, setIngredient13] = useState('')
    const [ingredient14, setIngredient14] = useState('')
    const [ingredient15, setIngredient15] = useState('')
    const [ingredient16, setIngredient16] = useState('')
    const [ingredient17, setIngredient17] = useState('')
    const [ingredient18, setIngredient18] = useState('')
    const [ingredient19, setIngredient19] = useState('')
    const [ingredient20, setIngredient20] = useState('')
    const [measurement1, setMeasurement1] = useState(null)
    const [measurement2, setMeasurement2] = useState(null)
    const [measurement3, setMeasurement3] = useState(null)
    const [measurement4, setMeasurement4] = useState(null)
    const [measurement5, setMeasurement5] = useState(null)
    const [measurement6, setMeasurement6] = useState(null)
    const [measurement7, setMeasurement7] = useState(null)
    const [measurement8, setMeasurement8] = useState(null)
    const [measurement9, setMeasurement9] = useState(null)
    const [measurement10, setMeasurement10] = useState(null)
    const [measurement11, setMeasurement11] = useState(null)
    const [measurement12, setMeasurement12] = useState(null)
    const [measurement13, setMeasurement13] = useState(null)
    const [measurement14, setMeasurement14] = useState(null)
    const [measurement15, setMeasurement15] = useState(null)
    const [measurement16, setMeasurement16] = useState(null)
    const [measurement17, setMeasurement17] = useState(null)
    const [measurement18, setMeasurement18] = useState(null)
    const [measurement19, setMeasurement19] = useState(null)
    const [measurement20, setMeasurement20] = useState(null)
    
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
        } else if (name.startsWith('ingredient')) {
            console.log(`Ingredient ${e} and ${index}`)
            setIngredient(index, value)
        } else if (name.startsWith('measurement')) {
            setMeasurement(index, value)
        } else if (name === 'steps') {
            setSteps(value)
        }
    };

    function setIngredient(index, value){
        if(index === 0){
            setIngredient1(value)
        }else if (index === 1){
            setIngredient2(value)
        }else if (index === 2){
            setIngredient3(value)
        }else if (index === 3){
            setIngredient4(value)
        }else if (index === 4){
            setIngredient5(value)
        }else if (index === 5){
            setIngredient6(value)
        }else if (index === 6){
            setIngredient7(value)
        }else if (index === 7){
            setIngredient8(value)
        }else if (index === 8){
            setIngredient9(value)
        }else if (index === 9){
            setIngredient10(value)
        }else if (index === 10){
            setIngredient11(value)
        }else if (index === 11){
            setIngredient12(value)
        }else if (index === 12){
            setIngredient13(value)
        }else if (index === 13){
            setIngredient14(value)
        }else if (index === 14){
            setIngredient15(value)
        }else if (index === 15){
            setIngredient16(value)
        }else if (index === 16){
            setIngredient17(value)
        }else if (index === 17){
            setIngredient18(value)
        }else if (index === 18){
            setIngredient19(value)
        }else {setIngredient20(value)
        }
    }

    function setMeasurement(index, value){
        if(index === 0){
            setMeasurement1(value)
        }else if (index === 1){
            setMeasurement2(value)
        }else if (index === 2){
            setMeasurement3(value)
        }else if (index === 3){
            setMeasurement4(value)
        }else if (index === 4){
            setMeasurement5(value)
        }else if (index === 5){
            setMeasurement6(value)
        }else if (index === 6){
            setMeasurement7(value)
        }else if (index === 7){
            setMeasurement8(value)
        }else if (index === 8){
            setMeasurement9(value)
        }else if (index === 9){
            setMeasurement10(value)
        }else if (index === 10){
            setMeasurement11(value)
        }else if (index === 11){
            setMeasurement12(value)
        }else if (index === 12){
            setMeasurement13(value)
        }else if (index === 13){
            setMeasurement14(value)
        }else if (index === 14){
            setMeasurement15(value)
        }else if (index === 15){
            setMeasurement16(value)
        }else if (index === 16){
            setMeasurement17(value)
        }else if (index === 17){
            setMeasurement18(value)
        }else if (index === 18){
            setMeasurement19(value)
        }else {setMeasurement20(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const recipeData = {
                name,
                author: author,
                description,
                ingredient1: ingredient1,
                ingredient2: ingredient2,
                ingredient3: ingredient3,
                ingredient4: ingredient4,
                ingredient5: ingredient5,
                ingredient6: ingredient6,
                ingredient7: ingredient7,
                ingredient8: ingredient8,
                ingredient9: ingredient9,
                ingredient10: ingredient10,
                ingredient11: ingredient11,
                ingredient12: ingredient12,
                ingredient13: ingredient13,
                ingredient14: ingredient14,
                ingredient15: ingredient15,
                ingredient16: ingredient16,
                ingredient17: ingredient17,
                ingredient18: ingredient18,
                ingredient19: ingredient19,
                ingredient20: ingredient20,
                measurement1: measurement1,
                measurement2: measurement2,
                measurement3: measurement3,
                measurement4: measurement4,
                measurement5: measurement5,
                measurement6: measurement6,
                measurement7: measurement7,
                measurement8: measurement8,
                measurement9: measurement9,
                measurement10: measurement10,
                measurement11: measurement11,
                measurement12: measurement12,
                measurement13: measurement13,
                measurement14: measurement14,
                measurement15: measurement15,
                measurement16: measurement16,
                measurement17: measurement17,
                measurement18: measurement18,
                measurement19: measurement19,
                measurement20: measurement20,
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

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingredient: '', measurement: '' }])
    }


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
            {ingredients.map((ing, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name={`ingredient${index + 1}`}
                        //eslint-disable-next-line
                        value={eval(`ingredient${index + 1}`)}
                        onChange={(e) => handleChange(e, index)}
                        placeholder={`Ingredient ${index + 1}`}
                    />
                    <input
                        type="text"
                        name={`measurement${index + 1}`}
                        //eslint-disable-next-line
                        value={eval(`measurement${index + 1}`)}
                        onChange={(e) => handleChange(e, index)}
                        placeholder={`Measurement ${index + 1}`}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>
                Add More Ingredients
            </button>
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