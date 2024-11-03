import { useEffect, useState } from "react";
import { searchMovie } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import style from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movies) {
      return "Is Loading ...";
    }
    const getData = async () => {
      setError(false);
      try {
        const data = await searchMovie();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Trending Today</h1>
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
