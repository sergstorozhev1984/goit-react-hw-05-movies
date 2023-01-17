import {toast} from 'react-toastify';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchedMovies } from 'services/Api';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Loader } from 'components/Loader/Loader';
import { NoMovies } from 'errors/NoMovies/NoMovies';

export const Movies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (!searchQuery) {
        return;
      }
    
    const fetchSearchedMovies = async searchQuery => {
      try {
        setIsLoading(true);
        const movies = await getSearchedMovies(searchQuery);
        setSearchedMovies(movies);
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      } finally {
        setIsLoading(false);
        
      }
    };
    fetchSearchedMovies(searchQuery);
  }, [searchQuery]);

  const onSubmit = query => {
    setSearchParams( {query});
  };
console.log(searchedMovies);
  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {(searchedMovies.length  === 0 && searchQuery && !isLoading) && <NoMovies/>}
      <MoviesList movies={searchedMovies}/>
      
    </>
  );
};
