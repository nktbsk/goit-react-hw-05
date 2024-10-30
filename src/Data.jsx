import axios from "axios";
import { useEffect, useState } from "react";

const Data = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWZmZDczNTgyNWRkZjM5MDBjMDZlOGJjZjhmMTlmZSIsIm5iZiI6MTczMDI4MjQ2Ny4wODY0OTA5LCJzdWIiOiI2NzE4YWMyOTI3YmQ1N2Q5MWY2MjFjZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qX7aLZ_Vb3dMm60DhbteGJHM1Hfppq8N2FFagwWRIdU`,
        },
        params: {
          language: "en-US",
          page: 1,
        },
      })
      .then((response) => {
        setMovie(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
};

export default Data;
