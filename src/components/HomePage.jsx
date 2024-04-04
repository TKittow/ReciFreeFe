import React from 'react'
import './HomePage.css'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleSearch = async () => {
    setIsSearching(true);
    const data = await searchMealByName(search);
    setSearchResult(data);
    console.log(data)
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    
  };

  function sourceChanger(source) {
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

  return (
    <>
      <div>HomePage</div>
      <br />
      <input type="text" placeholder='Search' value={search} onChange={handleInputChange}/>
      <button onClick={handleSearch}>Submit</button>
      <br />
      <div className='cardHolder'>
      {isSearching ? (
        <p>Searching...</p>
      ) : searchResult.length > 0 ? (
        searchResult.map((meal, index) => (
          // <div key={index}>
          //   <p>{meal.strMeal}</p>
          //   <img src={meal.strMealThumb} alt={meal.strMeal} />
          //   <p>{meal.strInstructions}</p>
          //   <a href={meal.strYoutube}>Watch on YouTube</a>
          // </div>
          <Link to={`/meals/${meal.idMeal}`} key={index}>
          <div className='recipeCard' style={{ 
            backgroundImage: `url(${meal.strMealThumb})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', }}>
            <div className='author bolded'>Source: {sourceChanger(meal.strSource)}</div>
            <p className='foodName bolded'>{meal.strMeal}</p>
            {/* <p className='description'>{recipe.description}</p> */}
          </div>
        </Link>
        ))
      ) : (
        <p>{search ? 'No Results Found' : 'Enter a search query above'}</p>
      )}
      </div>
    </>
  );
}