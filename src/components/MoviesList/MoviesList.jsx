import { Link } from 'react-router-dom';

export const MoviesList = ({ movies }) => {
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  console.log('ok');
  return (
    <ul>
      {movies.map(({ id, title, name, poster_path }) => (
        <li key={id}>
          <Link>
            <img src={imgBaseUrl.concat(poster_path)} alt="" />
            <p>{title ?? name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
