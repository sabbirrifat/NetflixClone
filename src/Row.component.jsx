import React, {useEffect, useState} from 'react'
import axios from './axios';

const Row = ({title, fetchUrl}) => {

    const [movies, setmovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setmovies(request.data.results);
            return request
        }
        fetchData();
    }, [fetchUrl])
    return (
        <div>
            <h2>{title}</h2>
        </div>
    )
}


export default Row
