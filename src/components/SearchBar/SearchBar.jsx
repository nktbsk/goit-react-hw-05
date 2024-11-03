import { useSearchParams } from "react-router-dom";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const [params, setParams] = useSearchParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { query } = form.elements;
    setParams({ query: query.value });

    form.reset();
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Search movie"
          className={style.input}
        />
        <button className={style.btn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
