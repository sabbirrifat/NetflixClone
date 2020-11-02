import React, { useEffect, useState } from "react";
import axios from "./axios";
import './row.css';

const baseUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl }) => {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="row_posters">
        
        {movies.map((item, key) => (
          <img
            key={key}
            className="row_poster"
            src={`${baseUrl}${item.poster_path}`}
            alt={item.name}
          />
        ))}

      </div>
    </div>
  );
};

export default Row;
