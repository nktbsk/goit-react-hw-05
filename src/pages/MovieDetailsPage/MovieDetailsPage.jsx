import {
  useParams,
  useLocation,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const MovieDetailsPage = ({ movies }) => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]); // состояние для жанров

  // Запрос для получения всех жанров
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWZmZDczNTgyNWRkZjM5MDBjMDZlOGJjZjhmMTlmZSIsIm5iZiI6MTczMDI4MjQ2Ny4wODY0OTA5LCJzdWIiOiI2NzE4YWMyOTI3YmQ1N2Q5MWY2MjFjZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qX7aLZ_Vb3dMm60DhbteGJHM1Hfppq8N2FFagwWRIdU`,
        },
        params: {
          language: "en-US",
        },
      })
      .then((response) => setGenres(response.data.genres))
      .catch((error) => console.error("Ошибка при загрузке жанров:", error));
  }, []);

  // Запрос фильма
  useEffect(() => {
    const foundMovie = movies.find((m) => m.id === parseInt(movieId));
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWZmZDczNTgyNWRkZjM5MDBjMDZlOGJjZjhmMTlmZSIsIm5iZiI6MTczMDI4MjQ2Ny4wODY0OTA5LCJzdWIiOiI2NzE4YWMyOTI3YmQ1N2Q5MWY2MjFjZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qX7aLZ_Vb3dMm60DhbteGJHM1Hfppq8N2FFagwWRIdU`,
          },
        })
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке фильма:", error);
        });
    }
  }, [movieId, movies]);

  // Функция для получения названий жанров
  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  if (!movie) {
    return <p>Загрузка данных о фильме...</p>;
  }

  return (
    <div className={style.container}>
      <button className={style.btn} type="button" onClick={handleGoBack}>
        Go back
      </button>
      <h2 className={style.title}>{movie.title}</h2>
      <div className={style.wrapper}>
        <img
          className={style.img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={style.info}>
          <h3 className={style.subtitle}>Overview</h3>
          <p className={style.text}>{movie.overview}</p>
          <h3 className={style.subtitle}>Info</h3>
          <p className={style.text}>
            <span className={style.span}>Rating:</span> {movie.vote_average}
          </p>
          <p className={style.text}>
            <span className={style.span}>Release date:</span>{" "}
            {movie.release_date}
          </p>
          <p className={style.text}>
            <span className={style.span}>Genres:</span>{" "}
            {getGenreNames(movie.genre_ids || [])}
          </p>
          <p className={style.text}>
            <span className={style.span}>Original language:</span>{" "}
            {movie.original_language}
          </p>
        </div>
      </div>
      <div className={style.wrapperLink}>
        <NavLink
          className={({ isActive }) =>
            clsx(style.link, isActive && style.active)
          }
          to={`/movies/${movie.id}/cast`}
        >
          Cast
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(style.link, isActive && style.active)
          }
          to={`/movies/${movie.id}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
