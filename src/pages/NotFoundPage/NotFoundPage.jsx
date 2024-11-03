import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h2>Oops! Not found!</h2>
      <Link to="/">Back to home page!</Link>
    </div>
  );
}
