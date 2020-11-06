import React, { Component, useEffect, useState } from 'react'
import './movie-details.css'
import YouTube from 'react-youtube';
import axios from './axios'


class MovieDetails extends Component {

  constructor(){
    super();
    this.API_KEY = "d157a4c0c49d8680fec022915ac81440";
    this.baseUrl = "https://image.tmdb.org/t/p/original/";
    
    this.state = {
      movieVideos : [],
      showPoster: true,
      casts: [],
      movie_details: [],
      match_count: 0,
      videoType: ''
    }

  }

  opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      modestbranding: 1
      },
    };

  onPlayerStateChange = (event) => {
    if(event.data === 0){
      this.setState({showPoster: true})
    }
    else if(event.data === 1){
      setTimeout(() =>{ 
        this.handleChange()
     }, 3000);
    }
  }

  handleChange = () => {
    this.setState({showPoster: !this.state.showPoster})
  }

  getData = async () => {
    console.log('Im getting this', this.state.videoType);
    const request = await axios.get(`/${this.state.videoType}/${this.props.movie?.id}?api_key=${this.API_KEY}&append_to_response=videos`);
    this.setState({movieVideos: request.data.videos.results});
    const casts = await axios.get(`/${this.state.videoType}/${this.props.movie?.id}/credits?api_key=${this.API_KEY}&append_to_response=videos`);
    this.setState({casts: casts.data.cast});
    const details = await axios.get(`/${this.state.videoType}/${this.props.movie?.id}?api_key=${this.API_KEY}`);
    this.setState({movie_details: details.data});
   }

  componentDidUpdate(prevProps, prevState){
        let videoType = this.props.videoType;

        if(prevState.videoType !== videoType){
          this.getData()
        }
  }

  componentDidMount(){
    if (this.props.fetchUrl.includes('movie')){
      this.setState({videoType: 'movie'})
    }
    else{
      this.setState({videoType: 'tv'})
    }
    this.setState({match_count: Math.floor(Math.random() * (99 - 90) + 90)});

  }


  /* opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
        } */

    render(){

      console.log('this after the render', this.state.videoType);

      const {movie} = this.props;
      const {movieVideos, showPoster, casts, movie_details, match_count, videoType} = this.state;
      const genresLength = movie_details?.genres?.length;
      const castsLength = casts?.length;

      const timeConvert = (num) =>{
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return `${rhours} ${rhours > 1 ? 'hours' : 'hour'} and ${rminutes} ${rminutes > 1 ? 'minutes' : 'minute'}.`;
        }

      return (
        <div className="movie-details-section">
          <div className="movie-details-container">
            <div className="movie-description">
                <h1 className="movie-title">
                  {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <p className="movie-overview">
                  {movie?.overview?.length > 200 ? movie?.overview.slice(0, 200) + '...' : movie?.overview}
                </p>
                {
                  videoType === 'tv' ? 
                  <p className="extra-info">
                  <span className="movie-match-count">{match_count}% Match </span>
                  {movie_details?.last_air_date?.slice(0,4)}   
                  {movie_details?.number_of_seasons > 1 ?  ` ${movie_details?.number_of_seasons} Seasons ` :  ` ${movie_details?.number_of_seasons} Season`} 
                  <span className="production-logo">{movie_details?.networks ? 
                    <img src={`${this.baseUrl}${movie_details?.networks[0]?.logo_path}`} /> : null
                  }</span>
                  </p> :

                  <p className="extra-info">
                  <span className="movie-match-count">{match_count}% Match </span>
                  {movie_details?.release_date?.slice(0,4)}   
                  {movie_details?.runtime > 60 ? timeConvert(movie_details?.runtime) : `${movie_details?.runtime} minutes`} 
                  <span className="production-logo">{movie_details?.production_companies ? 
                    <img src={`${this.baseUrl}${movie_details?.production_companies[0]?.logo_path}`} /> : null
                  }</span>
                  </p>


                }
                  <p className="movie-casts"><span>Cast: </span> {
                    casts?.filter((item, key) => key < 5).map((item, key)=> {
                      if(castsLength === key + 1){
                        return `${item.name}`
                      }
                      else {
                        return `${item.name}, `
                      }
                      
                    })
                  } {castsLength > 5 ? 'more' : ''} </p>
                  <p className="movie-genres"><span>Genres: </span> {
                    movie_details?.genres?.filter((item, key) => key < 3).map((item, key)=> {
                      if(genresLength === key + 1){
                        return `${item.name}`
                      }
                      else{
                      return `${item.name}, `
                      }
                    })
                  } {movie_details?.genres?.length > 3 ? 'more' : ''} </p>
              </div>
              <div className="movie-trailer-part">
                  <div className="poster-overlay"></div>
                  <div className="overlay-left"></div>
                  <div className="overlay-right"></div>
                  <div className="overlay-top"></div>
                  <div className="overlay-down"></div>
                  <img className={showPoster ? 'active' : ''} src={`${this.baseUrl}${movie?.backdrop_path}`} alt={movie?.name} />
                  
                  <div className="youtube-trailer">
                      <YouTube videoId={movieVideos[0]?.key} className="youtube-trailer" onStateChange={this.onPlayerStateChange}  opts={this.opts} />
                  </div>
                  
                   
              </div>
          </div>
        </div>
     )
   }   
}

export default MovieDetails
