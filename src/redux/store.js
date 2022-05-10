import { legacy_createStore as createStore } from 'redux'
import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { fetchRecipesBySearchReducer } from './reducers/fetchRecipesBySearch.reducer';
import { fetchRecipesByCuisineReducer } from './reducers/fetchRecipesByCuisine.reducer';
import { fetchRecipeDetailsReducer } from './reducers/fetchRecipeDetails.reducer';

const rootReducer = combineReducers({
    fetchRecipesBySearch: fetchRecipesBySearchReducer,
    fetchRecipesByCuisine: fetchRecipesByCuisineReducer,
    fetchRecipeDetails: fetchRecipeDetailsReducer
})

const store = createStore(rootReducer, {},composeWithDevTools(applyMiddleware(thunk)));

export default store;