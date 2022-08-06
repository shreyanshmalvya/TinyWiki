import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { incrementByAmount } from '../../redux/title'
import axios from 'axios';
import './search.css'


const Search = () => {
    //declaring states
    const [query, setQuery] = React.useState('')
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);

    //storing the value of the search input in the state
    const searchHandler =()=>{
        setSearch(query);
    };

    //intializing redux state
    const dispatch = useDispatch()
    //fuction to pass title into store
    const getTitle = (reqTitle) => {
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
            }
            result();
        }
    }, [search]);

    return (
        <>
            <div className="searchWrapper">
                <div className="search">
                    <div className="searchInput">
                        <input id='searchTerm' type="text" placeholder="Search anything" onChange={(val) => setQuery(val.target.value)} />
                    </div>
                    <div className="searchIcon">
                        <div className='searchButton' id='searchIcon' type="submit" onClick={()=> searchHandler()}>Search</div>
                    </div>
                </div>
            </div >
            <div className="searchResults">
                {searchResults.map((result, key) => {
                    return (
                        //return data in leaflet from
                        <div className="resultWrapper" key={key}>
                            <div className="searchResult" >
                                <div className="searchResultTitle">
                                    {result.title}
                                </div>
                                <div className="searchResultDescription" >
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