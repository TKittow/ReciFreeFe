import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUser } from '../lib/CurrentUser';

export default function AddRecipe() {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [image, setImage] = useState('');


    useEffect(() => {
        let mounted = true;
    
        async function fetchIngredients() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/ingredients/`);
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
        } else if (name === 'author') {
            setAuthor(value);
            console.log(author)
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'ingredients') {
            setIngredients(value.split(',').map(ingredient => ingredient.trim()));
        } else if (name === 'image') {
            setImage(value);
        }
    };

    const handleIngredientChange = (e) => {
        const selectedIngredients = Array.from(e.target.selectedOptions, option => option.value);
        setIngredients(selectedIngredients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const recipeData = {
                name: name,
                author: currentUser().user_id,
                description: description,
                ingredients: ingredients,
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