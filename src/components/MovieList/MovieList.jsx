import { Link, useLocation } from "react-router-dom";
import style from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={style.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={style.movieItem}>
          <Link
            className={style.movieLink}
            to={`/movies/${movie.id}`}
            state={location}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              className={style.movieImage}
              alt="poster"
              width="180"
            />
            <p className={style.movieTitle}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
