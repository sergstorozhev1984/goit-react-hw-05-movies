import axios from 'axios';

export const getTrendingMovies = async () => {
  const { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=33111964670c7b76b46171e4b76d4670');
  return data.results;
}

export const getSearchedMovies = async name => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=33111964670c7b76b46171e4b76d4670&query=${name}`);
  return data.results;
};

export const getMovieDetails = async id => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=33111964670c7b76b46171e4b76d4670`);
  return data;
}

export const getMovieCast = async id => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=33111964670c7b76b46171e4b76d4670`);
  return data.cast;
}

export const getMovieReviews = async id => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=33111964670c7b76b46171e4b76d4670`);
  return data.results;
}