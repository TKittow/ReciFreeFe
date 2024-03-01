import React, { useState } from 'react';
import axios from 'axios';
import { currentUser } from '../lib/CurrentUser';

export default function AddRecipe() {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'author') {
            setAuthor(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'ingredients') {
            setIngredients(value.split(',').map(ingredient => ingredient.trim()));
        } else if (name === 'image') {
            setImage(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(currentUser().data)

        try {
            const recipeData = {
                name: name,
                author: currentUser().user_id,
                description: description,
                ingredients: ingredients,
                image: image,
            };
            console.log(recipeData);

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
            window.location.href = `/recipes/`
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
            <input
                type="text"
                name="ingredients"
                value={ingredients.join(', ')} // Display ingredients as a comma-separated string
                onChange={handleChange}
                placeholder="Ingredients (comma-separated)"
                required
            />
            <br />
            <p>Ingredients:</p>
            <input
                type="text"
                name="image"
                value={image}
                onChange={handleChange}
                placeholder="image url"
                required
            />
            <br />
            <button type="submit">ADD</button>
        </form>
    );
}