import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import style from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviewsByMovie() {
      setError(false);
      try {
        const data = await fetchMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(true);
      }
    }
    fetchReviewsByMovie();
  }, [movieId]);

  return (
    <div className={style.container}>
      {error && <ErrorMessage />}
      <ul>
        {movieReviews.map(({ id, author, content }) => {
          if (author) {
            return (
              <li key={id}>
                <h2>Author: {author}</h2>
                <p>{content}</p>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
