import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWZmZDczNTgyNWRkZjM5MDBjMDZlOGJjZjhmMTlmZSIsIm5iZiI6MTczMDI4MjQ2Ny4wODY0OTA5LCJzdWIiOiI2NzE4YWMyOTI3YmQ1N2Q5MWY2MjFjZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qX7aLZ_Vb3dMm60DhbteGJHM1Hfppq8N2FFagwWRIdU`,
        },
        params: {
          language: "en-US",
          page: 1,
        },
      })
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке отзывов:", error);
      });
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <h3 className={styles.author}>Автор: {review.author}</h3>
            <p className={styles.content}>{review.content}</p>
          </div>
        ))
      ) : (
        <p>There are no reviews yet</p>
      )}
    </div>
  );
};

export default MovieReviews;
