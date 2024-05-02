import React from "react";
import "./RecipeCard.css";
import { LuBeef, LuWheat } from "react-icons/lu";
import { GiBroccoli, GiChickenLeg, GiSheep } from "react-icons/gi";
import { TbPig } from "react-icons/tb";
import { RiCake3Line } from "react-icons/ri";

const image_size = 25;
const badge_data = {
  Beef: { icon: <LuBeef size={image_size}></LuBeef>, colour: "#c70f0f" },

  Chicken: {
    icon: <GiChickenLeg size={image_size}></GiChickenLeg>,
    colour: "#c7830f",
  },
  Pork: { icon: <TbPig size={image_size} />, colour: "#dd0c98" },
  Pasta: { icon: <LuWheat size={image_size} />, colour: "#ecea6d" },
  Vegetarian: { icon: <GiBroccoli size={image_size} />, colour: "#4cce2b" },
  Dessert: { icon: <RiCake3Line size={image_size} />, colour: "#ca1c64" },
  Lamb: { icon: <GiSheep size={image_size} />, colour: "#830aa1" },
};

function RecipeCard({ recipeData }) {
  return (
    <div className=" col-sm-3">
      <div className="recipe-card-container">
        <div className="image-container">
          <div
            className="badge"
            style={{
              backgroundColor:
                badge_data[recipeData.strCategory]?.colour || "#000000",
            }}
          >
            {badge_data[recipeData.strCategory]?.icon || "NaN"}
            <div className="badge-text">{recipeData.strCategory}</div>
          </div>
          <img
            className="recipe-image"
            src={recipeData.strMealThumb}
            alt={recipeData.strMeal}
          />
        </div>

        <div className="recipe-title-container">
          <div className="recipe-title">{recipeData.strMeal}</div>
        </div>
        <div className="recipe-area">{recipeData.strArea}</div>
        <div></div>
        <div className="recipe-button-parent">
          <div className="recipe-border ">
            <div className="recipe-button">View Recipe</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
