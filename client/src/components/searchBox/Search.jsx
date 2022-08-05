import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { incrementByAmount } from '../../redux/title'
import axios from 'axios';
import './search.css'


const Search = () => {
    //declaring states
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);

    //intializing redux state
    const dispatch = useDispatch()
    //fuction to pass title into store
    const getTitle = (reqTitle) => {
        console.log(reqTitle)
        dispatch(incrementByAmount(reqTitle));
    }

    //using useEffect to fetch data from the api
    useEffect(() => {
        //fetching results from the api
        if (search) {
            const result = async () => {
                const response = await axios.get(`http://localhost:5000/search/${search}`);
                const result = await response.data.pages;
                setSearchResults(result);
                console.log(result);
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
                {searchResults.map((result, key) => {
                    return (
                        //return data in leaflet from
                        <div className="resultWrapper">
                            <div className="searchResult" key={key}>
                                <div className="searchResultTitle">
                                    {result.title}
                                </div>
                                <div className="searchResultDescription">
                                    {result.description}
                                </div>
                                <div className="readOption" onClick={() => {getTitle(result.title)}}>
                                    <Link to= '/read'>Read</Link>
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