import React, { useState, useEffect } from "react";
//components
import Hero from "./Hero";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecipesBySearch } from "../redux/actions/fetchRecipesBySearch.action";
import { fetchRecipesByCuisine } from "../redux/actions/fetchRecipesByCuisine.action";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cuisine, setCuisine] = useState('');
    const dispatch = useDispatch();

    let { loading:cuisineLoading, recipes:cuisineRecipes, error:cuisineError} = useSelector(state => state.fetchRecipesByCuisine);
    let { loading, recipes, error } = useSelector(state => state.fetchRecipesBySearch);


    useEffect(() => {
        if (cuisine) {
            dispatch(fetchRecipesByCuisine(cuisine));
        } else {
            dispatch(fetchRecipesBySearch(searchTerm));
            setCuisine('');
        }
    }, [searchTerm,cuisine,dispatch]);

    const recipeThumbs = recipes?.map(recipe => {
        return <Thumb recipeId={recipe.id}
            key={recipe.id}
            image={recipe.image}
            title={recipe.title} />
    })
    const recipeThumbsCuisine = cuisineRecipes?.map(recipe => {
        return <Thumb recipeId={recipe.id}
            key={recipe.id}
            image={recipe.image}
            title={recipe.title} />
    })

    const handleCuisineSelection = (cuisine) => {
        setCuisine(cuisine);
    }

    return (
        <div className="main-container">
            <Hero
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleCuisineSelection={handleCuisineSelection}
                cuisineState={cuisine} />
            {(loading || cuisineLoading) && <Spinner />}
            {!(loading || cuisineLoading) && (error || cuisineError) ? <p className="error-message">Sorry, something went wrong.</p> :
                <>{recipes && <div className="recipe-thumb">{!cuisine ? recipeThumbs : recipeThumbsCuisine} </div>}</>
            }
        </div>
    )
}

export default Home;