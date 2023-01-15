import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovieDetails } from 'services/Api';
export const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => { 
    if(!movieId) return;
    
    setTimeout(()=> {const fetchMovieDetails = async movieId => {
      try {
        setIsLoading(true);
        const movieDetails = await getMovieDetails(movieId);
        setMovieDetails(movieDetails);
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails(movieId);}, 3000);
    
  }, [movieId]);

  if (!movieDetails) return null;

  const backLink = location.state?.from ?? '/';
  const { title, release_date, vote_average, overview, genres, poster_path } =
    movieDetails;
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  const imgUrl = imgBaseUrl.concat(poster_path);
  const releaseDate = release_date.slice(0, 4);
  const voteScore = vote_average.toFixed(1) * 10;
  const genresList = genres.map(({ name }) => name).join(' ');
  return (
    <>
      {isLoading && <Loader />}
      <Link to={backLink}>← Go back</Link>
      <div>
        <img src={imgUrl} alt={title} width="350" />
        <div>
          <h2>
            {title} <span>({releaseDate})</span>
          </h2>
          <p>
            User score: <span>{voteScore}%</span>
          </p>
          <p>
            Overview: <span>{overview}</span>
          </p>
          <p>
            Genres: <span>{genresList}</span>
          </p>
        </div>
      </div>
      <div>
        <Link to={'cast'} state={{ from: Link }}>
          Cast
        </Link>
        <Link to={'reviews'} state={{ from: Link }}>
          Reviews
        </Link>
        <Outlet/>
      </div>
    </>
  );
};
