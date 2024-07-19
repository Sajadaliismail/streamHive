import React from "react";
import { request } from "../../../Constants/Constants";
import { useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

function RowCards(props) {
  const navigate = useNavigate()


  
  const navigateToList = (release_date,id,e) => {
    e.preventDefault()
    if (release_date) {
      navigate(`/videos/movie/${id}`); 
    } else  {
      navigate(`/videos/tv/${id}`);
    } 
  };

  return (
    <>
        <h3>{props.name}</h3>
      <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap', gap:'15px'}}>
        {props.data.map((poster, index) => (
          <div key={index} className="rowDsiv">
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

        
    </>
  );
}

export default RowCards;
