import { MoviesList } from "components/MoviesList/MoviesList";
import { useEffect } from "react";
import { useState } from "react";
import {toast} from 'react-toastify';
import { getTrendingMovies } from "services/Api";

export const Home = () => {
    const [movies, setMovies] =useState([]);
    
    useEffect(() => {
        const fetchTrendingMovies =  async () => {
            try {
                const movies = await getTrendingMovies();
                console.log(movies);
               
                setMovies(movies);
            } catch (error) {
                toast.error(`Oops! Something went wrong! ${error}`)
            }
        }
        fetchTrendingMovies();
    }, [])
   
    return (
        <>
            <h1>Trending today</h1>
            <MoviesList movies={movies} />
        </>
    )
}


    