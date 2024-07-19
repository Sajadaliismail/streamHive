import './videos.css';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge
} from 'mdb-react-ui-kit';
import Header from "../HomePage/Navbar/Navbar";
import { TVPlayer } from "react-tv-player";
import RowCard from '../HomePage/Rows/Rows';
import { API_KEY, request } from '../../Constants/Constants';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../axios';
import { ScaleLoader } from 'react-spinners';

const Video = () => {
  const { id, type } = useParams();
  const [movieId, setMovieId] = useState("");
  const [movieData, setMovieData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    viewTrailer(id, type);
    return () => {
    };
  }, [id, type]);

  const viewTrailer = (movie_id, type) => {
    if (movie_id) {
      axios
        .get(
          `https://api.themoviedb.org/3/${type}/${movie_id}?api_key=${API_KEY}`
        )
        .then((res) => {
          if (res.data) {
            setMovieData(res.data);
            console.log(res.data);

          }
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          setError("Error fetching movie data");
        });

      axios
        .get(
          `https://api.themoviedb.org/3/${type}/${movie_id}/videos?api_key=${API_KEY}`
        )
        .then((res) => {
          if (res.data.results[0]?.key) {
            setMovieId(res.data.results[0].key);
          }
          setLoading(false); // Set loading to false after fetching data
        })
        .catch((error) => {
          console.error("Error fetching trailer:", error);
          setError("Error fetching trailer");
          setLoading(false); // Set loading to false after error
        });
    }
  };

  if (loading) {
    return <div>
      <div className="loading-container">
      <ScaleLoader
        color="#d43434"
        height={50}
        width={10}
        radius={5}
        margin={2}
      />
    </div>
    </div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <>
      <Header />


      <div className="container mt-3">
        {movieData&&
  <div className="row">
    <div className="col-md-3 col-12 mb-3">
      <MDBCard>
        <MDBCardImage position="top" alt="..." src={`${request.fetchBannerImage}${movieData.backdrop_path || movieData.poster_path}`} />
        
        <MDBCardBody>
          <MDBCardTitle>{movieData.title || movieData.original_title}</MDBCardTitle>
          {movieData.runtime && (
            <MDBBadge color="secondary" style={{ minWidth: '50px', margin: '2px' }}>
              {movieData.runtime} min
            </MDBBadge>
          )}
          <MDBCardText>{movieData.overview}</MDBCardText>
        </MDBCardBody>
        <MDBListGroup flush>
          {type && type === 'movie' && (
            <>
              {movieData.status && movieData.status === 'Released' ? (
                <>
                  <MDBListGroupItem>Released on: {movieData.release_date}</MDBListGroupItem>
                  <MDBListGroupItem>Rating: {movieData.vote_average.toFixed(2)}</MDBListGroupItem>
                </>
              ) : (
                <MDBListGroupItem>Release date: {movieData.release_date}</MDBListGroupItem>
              )}
            </>
          )}
          {type && type === 'tv' && (
            <>
              <MDBListGroupItem>Aired on: {movieData.first_air_date}</MDBListGroupItem>
              <MDBListGroupItem>Rating: {movieData.vote_average.toFixed(2)}</MDBListGroupItem>
              <MDBListGroupItem>Seasons: {movieData.number_of_seasons}, Episodes: {movieData.number_of_episodes}</MDBListGroupItem>
              {movieData.seasons && (
                <MDBListGroup>
                  {movieData.seasons.map((season, index) => (
                    <MDBListGroupItem key={index} color="secondary">
                      Season {season.name || season.season_number} - Episodes: {season.episode_count}
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              )}
            </>
          )}
          <MDBListGroupItem>
            {movieData.genres && movieData.genres.map((genre, index) => (
              <MDBBadge color="secondary" style={{ minWidth: '50px', margin: '2px' }} key={index}>
                {genre.name}
              </MDBBadge>
            ))}
          </MDBListGroupItem>
        </MDBListGroup>
        <MDBCardBody>
          <MDBCardLink target="_blank" href={movieData.homepage}>{movieData.homepage}</MDBCardLink>
        </MDBCardBody>
      </MDBCard>
    </div>
    <div className="col-md-9 col-12">
      <div className="d-flex flex-column align-items-center">
        <div style={{ borderRadius: '15px', backgroundColor: 'black', height: '720px', padding: '5px', width: '100%' }}>
          {movieId ? (
            <TVPlayer
              title={movieData.title || movieData.original_title}
              playing={true}
              className="custom-tv-player"
              url={`https://www.youtube.com/watch?v=${movieId}`}
              disableFullscreen="true"
              width="100%"
              height="700px"
            />
          ) : (
            <div><img style={{ width: '100%' }} src={`${request.fetchBannerImage}${movieData.backdrop_path}`} alt="" /></div>
          )}
        </div>
        <div className="mt-3" style={{ width: '100%' }}>
          <div className="row">
            {movieData.genres && movieData.genres.map((genre) => (
              <div className="col-md-4 col-sm-6 col-lg-12  mb-3" key={genre.id}>
                <RowCard
                  type={`/discover/${type}${request.fetchRelated}${genre.id}`}
                  name={genre.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
}
</div>

    </>
  );
}

export default Video;
