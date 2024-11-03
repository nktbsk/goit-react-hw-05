import { useEffect, useState, useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { searchMovies } from "../../api";
import style from "./MovieDetailsPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import clsx from "clsx";

export default function MovieDetailsPage() {
  const [movies, setMovies] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState(false);

  const location = useLocation();
  const buttonGoBack = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function getMovieDetails() {
      setError(false);
      try {
        const data = await searchMovies(movieId);
        data.poster = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
        setMovies(data);
      } catch (error) {
        setError(true);
      }
    }
    getMovieDetails();
  }, [movieId]);

  return (
    <>
      {error && <ErrorMessage />}
      <div className={style.container}>
        <Link className={style.btn} to={buttonGoBack.current}>
          Back
        </Link>
        <div className={style.wrapper}>
          {movies && (
            <img
              className={style.img}
              src={movies.poster}
              alt={movies.title}
              width={250}
            />
          )}
          <div className={style.info}>
            <h2 className={style.title}>{movies.title}</h2>
            <p>User Score: {movies.popularity}</p>
            <h3 className={style.secondTitle}>Overview</h3>
            <p>{movies.overview}</p>
            <h3 className={style.secondTitle}>Genres</h3>
            <p>{movies.genres?.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <h2>Additional information</h2>
        <div className={style.btns}>
          <NavLink
            className={({ isActive }) =>
              clsx(style.item, isActive && style.active)
            }
            to="Cast"
          >
            Cast
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(style.item, isActive && style.active)
            }
            to="Reviews"
          >
            Reviews
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
}
