import axios from 'axios';

const content = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default content;