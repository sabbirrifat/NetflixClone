import React from 'react';
import './homepage.styles.css'
import requests from '../../Utils/requests';
import Row from '../../Components/Row/Row.component';
import Banner from '../../Components/Banner/Banner.component';

function HomePage() {
  return (
    <div className="homepage">
      <Banner />
      <Row title="NETFLIX ORIGINALS" isLargeRow fetchUrl={requests.fetchNetflixOriginals}/>
      <Row title="TRENDING NOW" fetchUrl={requests.fetchTrending}/>
      <Row title="Sci-fi Movies" fetchUrl={requests.fetchScifiMovies}/>
      <Row title="Popular TV Show" fetchUrl={requests.fetchTopRated}/>      
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="Crime Series" fetchUrl={requests.fetchCrimeSeries}/>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
      <Row title="Drama Series" fetchUrl={requests.fetchDramaSeries}/>
    </div>
  );
}

export default HomePage;
