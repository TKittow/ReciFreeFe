import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { currentUser } from '../lib/CurrentUser'
import './AddRecipe.css'

export default function AddRecipe() {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [measurements, setMeasurements] = useState([])
    const [allIngredients, setAllIngredients] = useState([])
    const [image, setImage] = useState('')


    useEffect(() => {
        let mounted = true;

        async function fetchIngredients() {
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/ingredients/`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (mounted) {
                    setAllIngredients(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchIngredients();

        return () => {
            mounted = false;
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'image') {
            setImage(value);
        }
    };

    const handleIngredientChange = (e) => {
        const selectedIngredients = Array.from(e.target.selectedOptions, option => option.value);
        setIngredients(selectedIngredients);
    };

    const handleMeasurementChange = (e) => {
        const { name, value } = e.target;
        const index = parseInt(name.replace('measurement', ''));
        const updatedMeasurements = [...measurements];
        updatedMeasurements[index - 1] = value;
        setMeasurements(updatedMeasurements);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const recipeData = {
                name: name,
                author: currentUser().user_id,
                description: description,
                ingredients: ingredients,
                measurements: measurements,
                image: image,
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
            window.location.href = `/recipes/`;
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
            <select multiple value={ingredients} onChange={handleIngredientChange}>
                {allIngredients && allIngredients.map(ingredient => (
                    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                ))}
            </select>
            <br />
            <p>Measurements:</p>
            <div>
                {ingredients.map((ingredient, index) => (
                    <input
                        key={index}
                        type="text"
                        name={`measurement${index + 1}`}
                        value={measurements[index] || ''}
                        onChange={handleMeasurementChange}
                        placeholder={`Measurement for ${ingredient}`}
                        required
                    />
                ))}
            </div>
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
            <button type="submit">ADD</button>
        </form>
    );
}