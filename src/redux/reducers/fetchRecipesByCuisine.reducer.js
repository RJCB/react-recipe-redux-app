import { FETCH_RECIPES_BY_CUISINE_INITIATE, FETCH_RECIPES_BY_CUISINE_SUCCESS, FETCH_RECIPES_BY_CUISINE_FAIL } from "../actionTypes";

const initialState = {
    loading: true,
    recipes: [],
    error: false
}

export const fetchRecipesByCuisineReducer = (state = initialState, action) =>{
    const { payload, type } = action;
    switch (type) {
        case FETCH_RECIPES_BY_CUISINE_INITIATE:
            return {
                ...state,
                loading:true
            }
        case FETCH_RECIPES_BY_CUISINE_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: payload
            }
        case FETCH_RECIPES_BY_CUISINE_FAIL:
            return {
                ...state,
                loading: false,
                recipes: [],
                error:true
            }
        default:
            return {
                state
            }
    }
}