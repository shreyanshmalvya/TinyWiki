import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import parser from 'html-react-parser';
import axios from 'axios';
import './read.css';


const Read = () => {
    // creating states to store data
    const [response, setResponse] = React.useState('');

    //fetching title from the store and assigning it to the state
    const title = useSelector(state => state.title.title);
    
    // using useEffect to fetch data from the api
    useEffect(() => {
        //fetching results from the api
        if (title) {
            const result = async () => {
                const response = await axios.get(`http://localhost:5000/read/${title}`);
                const data = await response.data.html;
                setResponse(data);
            }
            result();
        }
    }, [title]);

    return (
        <div className="dataWrapper">
            <div className="titleHeader">
                <h1>{title}</h1>
            </div>
            <div className="response">
                <>
                {
                    response ? parser(response) : <div>Loading...</div>
                }
                </>
            </div>
        </div>
    );
}

export default Read;