import axios from 'axios';

const axios = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default axios;