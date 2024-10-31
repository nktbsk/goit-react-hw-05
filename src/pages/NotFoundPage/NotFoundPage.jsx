import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 - Сторінку не знайдено</h2>
      <p>На жаль, сторінка, яку ви шукаєте, не існує.</p>
      <Link to="/">Повернутися на домашню сторінку</Link>
    </div>
  );
};

export default NotFoundPage;
