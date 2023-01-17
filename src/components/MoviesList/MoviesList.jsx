import { Link, useLocation } from 'react-router-dom';
import css from './MoviesList.module.css';
import PropTypes from 'prop-types';

export const MoviesList = ({ movies }) => {
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  const location = useLocation();
  return (
    <ul className={css.movieGallery}>
      {movies.map(({ id, title, name, poster_path }) => (
        <li className={css.movieGalleryItem} key={id}>
          <Link className={css.movieGalleryItemLink} to={`/movies/${id}`} state={{from: location}}>
            <img className={css.movieGalleryItemImage} src={imgBaseUrl.concat(poster_path)} alt="" />
            <p className={css.movieGalleryItemTitle}>{title ?? name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      poster_path: PropTypes.string,
    }).isRequired,
  ).isRequired
}