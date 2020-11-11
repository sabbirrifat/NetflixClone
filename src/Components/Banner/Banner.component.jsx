import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../../Utils/axios';
import requests from '../../Utils/requests';
import './banner.styles.css';

const Banner = () => {
    const [movie, setmovie] = useState([])

    useEffect(() => {
       async function fetchData(){
           const request = await axios.get(requests.fetchNetflixOriginals);
           setmovie(
               request.data.results[
                   Math.floor(Math.random() * request.data.results.length -1)
               ]
           );
           return request

       }
       fetchData()
    }, [])
    return (
        <header className="banner" style={{
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundColor: "rgba(0, 0,0, 0.3)",
            height: "748px"
        }}>
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>

                <p className="banner_description">
                    {movie?.overview?.length > 150 ? movie?.overview.slice(0, 150) + '...' : movie?.overview}
                </p>
            </div>
            <div className="banner_fadeBottom"></div>
        </header>
    )
}

export default Banner
