import { Loader } from 'components/Loader/Loader';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getTrendingMovies } from 'services/Api';
import css from './Home.module.css'

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const movies = await getTrendingMovies();
        console.log(movies);

        setMovies(movies);
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <Loader />}
      <MoviesList movies={movies} />
    </>
  );
};
