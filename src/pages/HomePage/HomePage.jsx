import style from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = ({ movies }) => {
  return (
    <>
      <h1 className={style.title}>Trending Today</h1>
      <div className={style.wrapper}>
        {movies &&
          movies.map((movie) => (
            <Link
              className={style.link}
              key={movie.id}
              to={`/movies/${movie.id}`}
              state={{ from: "/" }} // Передаем информацию о предыдущей странице
            >
              {movie.title}
            </Link>
          ))}
      </div>
    </>
  );
};

export default HomePage;
