import React, { useEffect, useState } from "react";
import MovieDetails from './MovieDetails.component';
import axios from "./axios";
import './row.css';


const baseUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setmovies] = useState([]);
  const [ movieDetails, setmovieDetails] = useState('');
  const [videoType, setVideoType] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);


  const handleClick = (movie) => {
    if(movieDetails){
      setmovieDetails('')
    }
    else{
      if(fetchUrl.includes('movie')){
        setVideoType('movie')
      }
      else{
        setVideoType('tv')
      }
      setmovieDetails(movie) 
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters" >
        
        {movies.map((item, key) => (
          <>
          <img
            key={key}
            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
            src={`${baseUrl}${isLargeRow ? item.poster_path : item.backdrop_path}`}
            alt={item.name}
            onClick={() => handleClick(item)}
          />
          </>
        ))}
        


      </div>
      {
        movieDetails ? <MovieDetails movie={movieDetails} videoType={videoType} />  : null
      }
      
    </div>
  );
};

export default Row;
