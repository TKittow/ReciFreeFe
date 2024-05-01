import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './MealDetail.css'
import { useNavigate } from 'react-router-dom';


export default function MyPage() {
    const [meals, setMeals] = useState([]);
    const { username } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getMeals();
        //eslint-disable-next-line
    }, []);

    async function getMeals() {
        try {
            const accessToken = localStorage.getItem("access_token");
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/meals/${username}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setMeals(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    function sourceChanger(source) {
        //eslint-disable-next-line
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

    function goToMeals(){
        navigate(`/`)
    }

    return (
        <div>
            {meals && meals.length > 0 ? <></> : <>
            <div className='bolded'>No Saved Meals</div>
            <button onClick={goToMeals}>Add Meals</button>
            </>}
            <div className='center title'>{`${username}'s page `}</div>
            <div className='cardHolder'>
                {meals && meals.map((meal, index) => (
                    <Link to={`/meals/${meal.api_id}`} key={index}>
                        <div className='recipeCard' style={{
                            backgroundImage: `url(${meal.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                            {meal.strSource ?
                                <div className='author bolded'>Source: {sourceChanger(meal.source)}</div>
                                :
                                <></>}

                            <p className='foodName bolded'>{meal.name}</p>
                            {/* <p className='description'>{recipe.description}</p> */}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
