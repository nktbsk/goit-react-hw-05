import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./MovieDetailsPage.module.css";
import axios from "axios";

const MovieDetailsPage = ({ movies }) => {
  const [genres, setGenres] = useState([]);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((movie) => movie.id === parseInt(movieId));

  // Запрос для списка жанров
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
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, []);

  const getGenreNames = (genreIds) => {
    return genreIds.map(
      (id) => genres.find((genre) => genre.id === id)?.name || "Unknown"
    );
  };

  if (!movie) {
    return <p>Фильм не найден.</p>; // Сообщение, если фильм не найден
  }

  return (
    <div>
      <button type="button" onClick={() => navigate(-1)}>
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
          <p>Rating: {movie.vote_average}</p>
          <p>Release date: {movie.release_date}</p>
          <p>Genres: {getGenreNames(movie.genre_ids).join(", ")}</p>
          <p>Original language: {movie.original_language}</p>
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
