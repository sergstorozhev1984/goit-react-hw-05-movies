import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovieDetails } from 'services/Api';
import css from './MovieDetails.module.css';

export const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async movieId => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovieDetails(movieDetails);
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      }
    };
    fetchMovieDetails(movieId);
  }, [movieId]);

  if (!movieDetails) return <Loader />;

  const backLink = location.state?.from ?? '/';
  const { title, release_date, vote_average, overview, genres, poster_path } =
    movieDetails;
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  const imgUrl = imgBaseUrl.concat(poster_path);
  const releaseDate = release_date.slice(0, 4);
  const voteScore = vote_average.toFixed(1) * 10;
  const genresList = genres.map(({ name }) => name).join(' ');
  return (
    <div className={css.container}>
      <Link to={backLink} className={css.buttonLink} >
        ← Go back
      </Link>
      <div className={css.movieDetailsWraper}>
        <img src={imgUrl} alt={title} width="350" />
        <div className={css.movieDescriptionWraper}>
          <h2 className={css.movieNameTitle}>
            {title} <span>({releaseDate})</span>
          </h2>
          <p className={css.description}>
            User score: <span>{voteScore}%</span>
          </p>
          <p className={css.movieOverviewTitle}>
            Overview<span className={css.description}>{overview}</span>
          </p>
          <p className={css.movieGenresTitle}>
            Genres<span className={css.description}>{genresList}</span>
          </p>
        </div>
      </div>
      <div>
        <p className={css.information}>Additional information</p>
        <Link to={'cast'} state={{ from: Link }} className={css.buttonLink}>
          Cast
        </Link>
        <Link to={'reviews'} state={{ from: Link }} className={css.buttonLink } >
          Reviews
        </Link>
        <Outlet />
      </div>
    </div>
  );
};
