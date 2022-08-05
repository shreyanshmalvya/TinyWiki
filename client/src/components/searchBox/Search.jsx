import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {incrementByAmount} from '../../redux/titleSlice'
import axios from 'axios';
import './search.css'


const Search = () => {
    //declaring states
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    
    //intializing redux state
    const title = useSelector((state) => state.title.value);
    const dispatch = useDispatch()
    //fuction to pass title into store
    const getTitle = (reqTitle) =>{
        console.log('running')
        dispatch(incrementByAmount(title, reqTitle));
        console.log(title);
    }

    //using useEffect to fetch data from the api
    useEffect(() => {
        //fetching results from the api
        if (search) {
            const result = async () => {
                const response = await axios.get(`http://localhost:5000/search/${search}`);
                setSearchResults(response.data.pages);
                console.log(response.data.pages);
            }
            result();
        }
    }, [search]);

    return (
        <>
            <div className="searchWrapper">
                <div className="search">
                    <div className="searchInput">
                        <input id='searchTerm' type="text" placeholder="Search anything" onChange={(val) => setSearch(val.target.value)} />
                    </div>
                    <div className="searchIcon">
                        <div className='searchButton' id='searchIcon' type="submit">Search</div>
                    </div>
                </div>
            </div >
            <div className="searchResults">
                {searchResults.map((result,key) => {
                    return (
                        //return data in leaflet from
                        <div className="resultWrapper">
                            <div className="searchResult" key={result.id}>
                                <div className="searchResultTitle">
                                   {result.title}
                                </div>
                                <div className="searchResultDescription">
                                    {result.description}
                                </div>
                                <div className="readOption" onClick={getTitle(result.title)}> 
                                    Read 
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Search