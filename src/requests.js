const API_KEY = "d157a4c0c49d8680fec022915ac81440";

const requests = {
    fetchTrending: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=223&with_networks=213`,
    fetchTopRated: `/tv/popular?api_key=${API_KEY}`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchScifiMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchDramaSeries: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
    fetchCrimeSeries: `/discover/tv?api_key=${API_KEY}&with_genres=80`
}

export default requests;