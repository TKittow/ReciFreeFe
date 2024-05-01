import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate()

  const searchMealByName = async (mealName) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error fetching meal data:', error);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = async (event) => {
    const mealName = event.target.value;
    setSearch(mealName);
    setIsSearching(true);
    
  
    if (mealName.trim() !== '') {
      const data = await searchMealByName(mealName);
      setSearchResult(data);
    } else {
      setSearchResult([]);
    }
  };

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

  function moveToRecipe(){
    navigate(`/recipes`)
  }

  return (
    <>
      <div>HomePage</div>
      <br />
      <input type="text" placeholder='Search' value={search} onChange={handleInputChange}/>
      <br />
      <div className='cardHolder'>
        {isSearching ? (
          <p>Searching...</p>
        ) : searchResult.length > 0 ? (
          searchResult.map((meal, index) => (
            <Link to={`/meals/${meal.idMeal}`} key={index}>
              <div className='recipeCard' style={{ 
                backgroundImage: `url(${meal.strMealThumb})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center', }}>
                {meal.strSource ? 
                  <div className='author bolded'>Source: {sourceChanger(meal.strSource)}</div>
                  : <></>}
                <p className='foodName bolded'>{meal.strMeal}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>{search ? 'No Results Found' : 'Enter a search query above'}</p>
        )}
      </div>
      <div className='center'>
      <button onClick={moveToRecipe}>To posted recipes</button>
    </div>
    </>
  );
}
