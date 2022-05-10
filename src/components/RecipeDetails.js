import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//icons
import { BiTime } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { GiForkKnifeSpoon } from 'react-icons/gi';

import { Link } from "react-router-dom";
import { fetchRecipeDetails } from "../redux/actions/fetchRecipeDetails.action";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const [showIngredients, setShowIngredients] = useState(false);
    const dispatch = useDispatch();
    const { loading, recipeDetails, error } = useSelector(state => state.fetchRecipeDetails);
    // fetch recipes by ID which is pulled in from the :route when user clicks on a specific recipe on homepage
    useEffect(() => {
        dispatch(fetchRecipeDetails(recipeId));
    }, [recipeId,dispatch]);

    const toggleButtons = () => {
        setShowIngredients(prevValue => {
            return !prevValue;
        })
    }

    const ingredientsElements = () => {
        const elements = recipeDetails?.ingredients.map((ingredient, index) => {
            return <li key={`${index}#${ingredient.id}`}>{ingredient.original}</li>
        })
        return elements;
    }

    return (
        <div className="main-container recipe-details">
            <Link className="back-to-home" to="/">Back to search page</Link>
            <h1>Recipe</h1>
            {loading && <Spinner />}
            {(!loading && recipeDetails) &&
                <div className="details-container">
                    <div className="details-image">
                        <img src={recipeDetails.image} alt={recipeDetails.title} />
                    </div>
                    <div className="details-info">
                        <h2>{recipeDetails.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
                        <ul className="details-brief-info">
                            <li><span className="details-icon"><AiFillLike /></span><span>Likes:</span>{recipeDetails.aggregateLikes}</li>
                            <li><span className="details-icon"><BiTime /></span><span>Ready in:</span>{recipeDetails.time}</li>
                            <li><span className="details-icon"><GiForkKnifeSpoon /></span><span>Servings:</span>{recipeDetails.servings}</li>
                            {recipeDetails.ingredients ? <li><span>Number of ingredients:</span>{recipeDetails.ingredients.length}</li> : null}
                        </ul>
                        <div>
                            <button className={!showIngredients ? "active" : ''} onClick={showIngredients ? toggleButtons : null}>Instructions</button>
                            <button className={showIngredients ? "active" : ''} onClick={!showIngredients ? toggleButtons : null}>Ingredients</button>
                            {recipeDetails && showIngredients ? <div className="details-ingredients"><ul>{ingredientsElements()}</ul></div> : <div className="details-instructions" dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />}
                        </div>
                    </div>
                </div>
            }
            {error &&
                <p className="error-message">Sorry, something went wrong.</p>
            }
        </div>
    )
}

export default RecipeDetails;