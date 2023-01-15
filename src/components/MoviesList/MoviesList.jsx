import { Link, useLocation } from 'react-router-dom';
import css from './MoviesList.module.css';

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
