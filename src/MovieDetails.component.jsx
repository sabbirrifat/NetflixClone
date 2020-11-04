import React, { useEffect, useState } from 'react'
import './movie-details.css'
import YouTube from 'react-youtube';
import axios from './axios'


const MovieDetails = ({movie}) => {

    const [movieVideos, setmovieVideos] = useState([]);

    const API_KEY = "d157a4c0c49d8680fec022915ac81440";

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        }
      }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`/tv/${movie.id}?api_key=${API_KEY}&append_to_response=videos`);
            setmovieVideos(request.data.videos.results);
            return request;
          }
          fetchData();
    }, [movie])


    return (
        <div>
            <YouTube videoId={movieVideos[0]?.key}  opts={opts} />
        </div>
    )
}

export default MovieDetails
