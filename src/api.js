import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWZmZDczNTgyNWRkZjM5MDBjMDZlOGJjZjhmMTlmZSIsIm5iZiI6MTczMDI4MjQ2Ny4wODY0OTA5LCJzdWIiOiI2NzE4YWMyOTI3YmQ1N2Q5MWY2MjFjZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qX7aLZ_Vb3dMm60DhbteGJHM1Hfppq8N2FFagwWRIdU";

const fetch = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const searchMovie = async () => {
  const { data } = await axios.get(`/trending/movie/day`, fetch);
  return data;
};

export const searchMovies = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`, fetch);

  return data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, fetch);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, fetch);
  return response.data.results;
};

export const fetchSearchMovie = async (query) => {
  const { data } = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    fetch
  );
  return data.results;
};
