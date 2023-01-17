import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovieCast } from 'services/Api';
import css from './cast.module.css';

export const Cast = () => {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    const fetchMovieCast = async movieId => {
      try {
        const movieCast = await getMovieCast(movieId);
        // console.log(movieCast);
        setCast(movieCast);
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      }
    };
    fetchMovieCast(movieId);
  }, [movieId]);

  if (!cast) {
    return;
  }

  return (
    <ul className={css.castGallery}>
      {cast.map(({ id, profile_path, name, character }) => (
        <li key={id} className={css.castGalleryItem}>
          <img
            src={imgBaseUrl.concat(profile_path)}
            alt=""
            className={css.castGalleryItemImage}
          />
          <div>
            <p className={css.castGalleryItemDescription}>{name}</p>
            <p className={css.castGalleryItemDescription}> Character: {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
