import { FETCH_RECIPES_BY_SEARCH_INITIATE, FETCH_RECIPES_BY_SEARCH_SUCCESS, FETCH_RECIPES_BY_SEARCH_FAIL } from "../actionTypes";
import { API_URL, API_KEY } from "../../config";
import axios from 'axios';

export const fetchRecipesBySearch = (searchTerm) => async dispatch => {
    try {
        dispatch({
            type: FETCH_RECIPES_BY_SEARCH_INITIATE
        })
        let recipes=[];
        if (!searchTerm) {
            const sessionState = sessionStorage.getItem('randomRecipes');
            if (sessionState) {
                recipes = JSON.parse(sessionState);
                return dispatch({
                    type: FETCH_RECIPES_BY_SEARCH_SUCCESS,
                    payload: recipes
                })
            }
        }
        const randomRecipes = searchTerm ? await axios.get(`${API_URL}/complexSearch?query=${searchTerm}&number=12&apiKey=${API_KEY}`) : await axios.get(`${API_URL}/random?number=12&apiKey=${API_KEY}`);
        const result = searchTerm ? randomRecipes.data.results : randomRecipes.data.recipes;
        recipes = result;
        sessionStorage.setItem("randomRecipes", JSON.stringify(result));
        dispatch({
            type: FETCH_RECIPES_BY_SEARCH_SUCCESS,
            payload: recipes
        })
    } catch {
        dispatch({
            type: FETCH_RECIPES_BY_SEARCH_FAIL
        })
    }
}
