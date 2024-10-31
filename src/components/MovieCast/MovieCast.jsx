import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MovieCast.module.css"; // Добавьте стили для кастинга

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWZmZDczNTgyNWRkZjM5MDBjMDZlOGJjZjhmMTlmZSIsIm5iZiI6MTczMDI4MjQ2Ny4wODY0OTA5LCJzdWIiOiI2NzE4YWMyOTI3YmQ1N2Q5MWY2MjFjZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qX7aLZ_Vb3dMm60DhbteGJHM1Hfppq8N2FFagwWRIdU`,
        },
        params: {
          language: "en-US",
        },
      })
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке каста:", error);
      });
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      {cast.length > 0 ? (
        cast.map((actor) => (
          <div key={actor.cast_id} className={styles.actorCard}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className={styles.actorImage}
            />
            <p className={styles.actorName}>{actor.name}</p>
          </div>
        ))
      ) : (
        <p>Нет данных о касте для этого фильма.</p>
      )}
    </div>
  );
};

export default MovieCast;
