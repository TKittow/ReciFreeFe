import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUser } from '../lib/CurrentUser';
import './AddRecipe.css';

export default function AddRecipe() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredients, setCurrentIngredients] = useState([]);
    const [image, setImage] = useState('');
    const [steps, setSteps] = useState('');
    const [author, setAuthor] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState('');

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const userData = currentUser();
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userData}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(response.data.username)
                
                setAuthor(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/ingredients/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                });
                setCurrentIngredients(response.data);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'image') {
            setImage(value);
        } else if (name === 'steps') {
            setSteps(value);
        }
    };

    const handleAddIngredient = () => {

            setIngredients([...ingredients, { id: selectedIngredient, quantity: 100 }]);
            setSelectedIngredient('');
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = { id: value, quantity: 100 };
        setIngredients(updatedIngredients);
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
            console.log(recipeData)
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
                    <select 
                        value={ingredient.id} 
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                    >
                        <option value="">Select Ingredient</option>
                        {currentIngredients.map((ing) => (
                            <option key={ing.id} value={ing.id}>{ing.name}</option>
                        ))}
                    </select>
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