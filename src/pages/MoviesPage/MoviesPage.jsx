import { useEffect, useState } from "react";
import { fetchSearchMovie } from "../../api";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import style from "./MoviesPage.module.css";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [params] = useSearchParams();
  const [error, setError] = useState(false);
  const query = params.get("query") ?? "";

  useEffect(() => {
    async function fetchData() {
      setError(false);
      try {
        const data = await fetchSearchMovie(query);
        setMovies(data);
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, [query]);

  return (
    <div className={style.container}>
      <SearchBar query={params} />
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
