import { FETCH_RECIPE_DETAILS_INITIATE, FETCH_RECIPE_DETAILS_SUCCESS, FETCH_RECIPE_DETAILS_FAIL } from "../actionTypes";
import { API_URL, API_KEY } from "../../config";
import axios from 'axios';
import noImage from "../../images/no_image.jpg";

export const fetchRecipeDetails = (recipeId) => async dispatch => {
    try {
        dispatch({
            type: FETCH_RECIPE_DETAILS_INITIATE
        })
        let summary = [];
        const recipeById = await axios.get(`${API_URL}/${recipeId}/information?includeNutrition=true&apiKey=${API_KEY}`);
        const data = recipeById.data;
        const recipeSummary = {
            id: data.id,
            aggregateLikes: data.aggregateLikes,
            instructions: data.instructions,
            time: data.readyInMinutes,
            ingredients: data.extendedIngredients,
            image: data.image ? data.image : noImage,
            nutrition: data.nutrients,
            servings: data.servings,
            summary: data.summary,
            title: data.title,
            vegetarian: data.vegetarian
        }
        summary = recipeSummary;

        dispatch({
            type: FETCH_RECIPE_DETAILS_SUCCESS,
            payload: summary
        })
    } catch {
        dispatch({
            type: FETCH_RECIPE_DETAILS_FAIL
        })
    }
}
