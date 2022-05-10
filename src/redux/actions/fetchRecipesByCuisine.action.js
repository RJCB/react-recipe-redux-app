import { FETCH_RECIPES_BY_CUISINE_INITIATE, FETCH_RECIPES_BY_CUISINE_SUCCESS, FETCH_RECIPES_BY_CUISINE_FAIL } from "../actionTypes";
import { API_URL, API_KEY } from "../../config";
import axios from 'axios';

export const fetchRecipesByCuisine = (cuisine) => async dispatch => {
    try {
        dispatch({
            type: FETCH_RECIPES_BY_CUISINE_INITIATE
        })
        let recipes = [];
        const randomRecipes = await axios.get(`${API_URL}/complexSearch?cuisine=${cuisine}&apiKey=${API_KEY}`);
        const result = randomRecipes.data.results;
        recipes = result;

        dispatch({
            type: FETCH_RECIPES_BY_CUISINE_SUCCESS,
            payload: recipes
        })
    } catch {
        dispatch({
            type: FETCH_RECIPES_BY_CUISINE_FAIL
        })
    }
}
