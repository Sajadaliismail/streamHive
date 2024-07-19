import { useParams } from "react-router-dom"
import Header from "../HomePage/Navbar/Navbar"
import { useEffect, useState } from "react"
import axios from "../../axios"
import { request } from "../../Constants/Constants"
import RowCards from "../HomePage/Rows/Sample"
import RowCard from "../HomePage/Rows/Rows"

const SearchContent =()=>{
    const { search } = useParams();
    const [movieData, setMovieData] = useState([]);
    const [tvData, setTvData] = useState([]);
  
    useEffect(() => {
      const fetchList = async () => {
        try {
          const moviesResponse = await axios.get(`${request.fetchSearchResultMovies}${search}`);
          const tvsResponse = await axios.get(`${request.fetchSearchResultSeries}${search}`);
  
          setMovieData(moviesResponse.data.results);
          setTvData(tvsResponse.data.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
  
      fetchList();
    }, [search]);
    return (
        <>
        <Header>
        </Header>
        <h1>Search Results for '{search}'</h1>
        {(movieData || tvData) && (movieData.length>0 || tvData.length>0 )?
        (
            <>
            <RowCards data={movieData} type={'movie'} name={'Movies'}></RowCards>
            <RowCards data={tvData} type={'tv'} name={'Series'}></RowCards>
            </>

        )
    :
    (
   
        <>
        <div className="no-result-message">No result</div>
        <div className="check-out-message">Please check out these movies</div>
        <RowCard type={request.fetchTopRatedMovies} name={'Top rated'}></RowCard>
        <RowCard type={request.fetchNowPlayingMovies} name={'Now playing'}></RowCard>
        </>
        
    )}
        </>
    )
}

export default SearchContent