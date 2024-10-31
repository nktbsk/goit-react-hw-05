import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./MovieDetailsPage.module.css";

const MovieDetailsPage = ({ movies }) => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

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

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from); // Возвращаем на предыдущую страницу
    } else {
      navigate("/movies"); // Если откуда не пришли, возвращаем на страницу фильмов
    }
  };

  if (!movie) {
    return <p>Загрузка данных о фильме...</p>;
  }

  return (
    <div>
      <button type="button" onClick={handleGoBack}>
        Go back
      </button>
      <h1>{movie.title}</h1>
      <div className={style.wrapper}>
        <img
          className={style.img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={style.info}>
          <p>{movie.overview}</p>
          <p>Рейтинг: {movie.vote_average}</p>
          <p>Дата выхода: {movie.release_date}</p>
          <p>
            Жанры:{" "}
            {Array.isArray(movie.genres)
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "Нет данных о жанрах."}
          </p>
          <p>Оригинальный язык: {movie.original_language}</p>
        </div>
      </div>
      <ul>
        <li>
          <Link to={`/movies/${movie.id}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movie.id}/reviews`}>Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
