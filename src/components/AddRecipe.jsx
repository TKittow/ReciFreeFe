import React, { useState } from 'react';
import axios from 'axios';

export default function AddRecipe() {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'author') {
            setAuthor(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'ingredients') {
            setIngredients(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const recipeData = {
                name: name,
                author: author,
                description: description,
                ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
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
            <p>Author:</p>
            <input
                type="text"
                name="author"
                value={author}
                onChange={handleChange}
                placeholder="Recipe Creator"
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
                value={ingredients}
                onChange={handleChange}
                placeholder="Ingredients (comma-separated)"
                required
            />
            <br />
            <button type="submit">ADD</button>
        </form>
    );
}