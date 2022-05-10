import { FETCH_RECIPE_DETAILS_INITIATE, FETCH_RECIPE_DETAILS_SUCCESS, FETCH_RECIPE_DETAILS_FAIL } from "../actionTypes";

const initialState = {
    loading: true,
    recipeDetails: [],
    error: false
}

export const fetchRecipeDetailsReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case FETCH_RECIPE_DETAILS_INITIATE:
            return {
                ...state,
                loading: true
            }
        case FETCH_RECIPE_DETAILS_SUCCESS:
            console.log(payload);
            return {
                ...state,
                loading: false,
                recipeDetails: payload
            }
        case FETCH_RECIPE_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                recipeDetails: [],
                error: true
            }
        default:
            return {
                state
            }
    }
}