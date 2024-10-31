import { useState, useEffect } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import axios from "axios";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const location = useLocation(); // текущий маршрут

  useEffect(() => {
    if (query) {
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWZmZDczNTgyNWRkZjM5MDBjMDZlOGJjZjhmMTlmZSIsIm5iZiI6MTczMDI4MjQ2Ny4wODY0OTA5LCJzdWIiOiI2NzE4YWMyOTI3YmQ1N2Q5MWY2MjFjZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qX7aLZ_Vb3dMm60DhbteGJHM1Hfppq8N2FFagwWRIdU`,
          },
          params: {
            query: query,
            language: "en-US",
            page: 1,
          },
        })
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => {
          console.error("Ошибка при поиске:", error);
        });
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.searchInput.value;
    setSearchParams({ query });
    setQuery(query);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="searchInput"
          placeholder="Поиск фильмов..."
          defaultValue={query}
        />
        <button type="submit">Искать</button>
      </form>

      <div>
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            state={{ from: location }} // сохраняем текущее местоположение
          >
            {movie.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
