import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import style from "./MovieCast.module.css";

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCastByMovie() {
      setError(false);
      try {
        const data = await fetchMovieCast(movieId);
        setMovieCast(data);
      } catch (error) {
        setError(true);
      }
    }
    fetchCastByMovie();
  }, [movieId]);

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <div className={style.container}>
      {error && <ErrorMessage />}
      <ul className={style.list}>
        {movieCast.map(({ id, name, profile_path }) => {
          return (
            <li className={style.itemList} key={id}>
              <img
                src={profile_path ? baseUrl + profile_path : null}
                alt={name}
                width={150}
              />
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
