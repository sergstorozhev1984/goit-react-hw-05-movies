import {toast} from 'react-toastify';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchedMovies } from 'services/Api';
import { MoviesList } from 'components/MoviesList/MoviesList';

export const Movies = () => {
//   const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    
    if (!searchQuery) {
        return;
      }
    const fetchSearchedMovies = async searchQuery => {
    //   setIsLoading(true);
      try {
        const movies = await getSearchedMovies(searchQuery);
        setSearchedMovies(movies);
        // console.log(movies);
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchSearchedMovies(searchQuery);
  }, [searchQuery]);

  const onSubmit = query => {
    setSearchParams( query !== '' ? { query } : {});
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      <MoviesList movies={searchedMovies}/>
    </>
  );
};
