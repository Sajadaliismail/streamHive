import React, { useState, useEffect } from "react";
import {  BASE_URL, request } from "../../../Constants/Constants";
import axios from "axios";
import "./rows.css";
import {  MDBBtn } from 'mdb-react-ui-kit'
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";


function RowCard(props) {
  const navigate = useNavigate()
  const [posterState, setPosterState] = useState([]);
  const [loading, setLoading] = useState(true)



  
  useEffect(() => {
    getData(props);
  }, [props]);

  function getData(props) {
    setLoading(true)
    axios
      .get(`${BASE_URL}${props.type}`)
      .then((response) => {
        setPosterState(response.data.results)
          setLoading(false) 
      })
      .catch((error) => {
        setLoading(false)
      });
  }



  const navigateToList = (release_date,id,e) => {
    e.preventDefault()
    if (release_date) {
      navigate(`/videos/movie/${id}`); 
    } else  {
      navigate(`/videos/tv/${id}`); 
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
  return (
    <>
      
      <h3 style={{fontWeight:'500'}}>{props.name}</h3>
      <div className="rowPost">
        {posterState.map((poster, index) => (
          <div key={index} className="rowDiv">
            <div id="rowimg" onClick={(e)=>navigateToList(poster.release_date,poster.id,e)} className={`${props.isPoster ? "isLarge" : "isSmall"} py-5 mt-4 `} key={index} style={{
              backgroundImage: ` url("${request.fetchBannerImage}${poster.poster_path}")`
            }}>
            </div>

            <MDBBtn  className="btn-addto btn-dark">Add to list</MDBBtn>
            <div className="d-flex justify-content-between pt-1">
              <span className="text-truncate me-2" style={{ maxWidth: '80px', fontSize: '15px' }}>
                {poster.title || poster.original_name}
              </span>
              <span className="badge bg-secondary">
                {poster.release_date
                  ? poster.release_date.substring(0, 4)
                  : (poster.first_air_date
                    ? poster.first_air_date.substring(0, 4)
                    : "")
                }
              </span>
            </div>


          </div>
        ))}
      </div>
      {/* <div
        className={`modal fade ${open ? "show" : ""}`}
        style={{ display: open ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg bg-dark">
          <div className="modal-content bg-dark">
            <div className="modal-header bg-dark">
              <h5 className="modal-title">Trailer</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body ">

              <div className="d-block text-start">
                {movieData && (
                  <>
                    <h5 className="modal-title ">
                      {movieData.title}
                      <span className="badge bg-success ms-2">
                        {Math.floor(movieData.vote_average * 10)}%
                      </span>
                    </h5>
                    <p>{movieData.overview}</p>
                  </>
                )}{" "}
              </div>
              {movieId && (
                <ClickAwayListener onClickAway={handleClose}>
                  <div>
                    <YouTube videoId={movieId} opts={opts} />
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
        </div>
      </div>
      {open && <div className="modal-backdrop fade show"></div>} */}
    </>
  );
}

export default RowCard;
