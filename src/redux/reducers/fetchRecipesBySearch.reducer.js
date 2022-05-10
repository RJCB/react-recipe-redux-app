import { FETCH_RECIPES_BY_SEARCH_INITIATE, FETCH_RECIPES_BY_SEARCH_SUCCESS, FETCH_RECIPES_BY_SEARCH_FAIL } from "../actionTypes";

const initialState = {
    loading: true,
    recipes: [],
    error:false
}

export const fetchRecipesBySearchReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case FETCH_RECIPES_BY_SEARCH_INITIATE:
            return {
                ...state,
                loading:true
            }
        case FETCH_RECIPES_BY_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: payload,
                error:false
            }
        case FETCH_RECIPES_BY_SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                recipes: [],
                error:true
            }
        default:
            return state;
    }
}