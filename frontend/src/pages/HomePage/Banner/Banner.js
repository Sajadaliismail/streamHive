import React, { useState, useEffect, useRef } from "react";
import { request } from "../../../Constants/Constants";
import "./Banner.css";
import Slider from "react-slick";
import { settings, settingsNav } from "../../../features/bannerSlider";
import { fetchBanners } from "../../../Constants/requests";
import { useNavigate } from "react-router-dom";
import {ScaleLoader} from 'react-spinners'
function Content(props) {
  const navigate = useNavigate()
  const [banner,setBanner] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  useEffect(() => {
    const fetchBannersAsync = async () => {
      try {
        setLoading(true)
        const response = await fetchBanners(props.type);
        setBanner(response)
        console.log(response);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching banners:", error);
        setError('Server Busy')
      }
    };
    fetchBannersAsync();
  }, [props]);

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

  if(error){
    return <>
    <div>{error}</div>
    </>
  }

  return (
    <>
   <div>
        <Slider
          {...settings}
          ref={(slider) => (sliderRef1 = slider)}
          asNavFor={nav2}
        >
          {banner &&
            banner.map((banners) => (
              <div key={banners.id}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0), rgba(0, 0, 0, 0.45)), url("${request.fetchBannerImage}${banners.backdrop_path}")`,
                    alignContent: "center",
                    margin: "20px",
                    borderRadius: "10px",
                  }}
                  className="banner text-white fw-bold ps-5"
                >
                  <h4 className="">
                    <span className="text-danger">{props.topic.split(' ').slice(0,1)} </span>{props.topic.split(' ').slice(1)}  
                  </h4>
                  <h1>{banners.title || banners.original_title || banners.original_name}</h1>
                  <button onClick={(e)=>navigateToList(banners.release_date,banners.id,e)}
                    className="btn btn-danger"
                  >
                    <i
                      className="bi bi-play-fill"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    PLAY
                  </button>
                  <button className="btn btn-rounded ms-2 btn-dark text-white">
                    <i className="bi bi-plus" style={{ fontSize: "1rem" }}></i>
                    Add to List
                  </button>
                  <p style={{ width: "50%" }} className="fw-light">
                    {banners.overview}
                  </p>
                </div>
              </div>
            ))}
        </Slider>
        <div
          style={{
            marginLeft: "60px",
            marginTop: "-180px",
            zIndex: "5",
            marginBottom: "70px",
          }}
          className="col-3"
        >
          <Slider
            {...settingsNav}
            asNavFor={nav1}
            ref={(slider) => (sliderRef2 = slider)}
          >
            {banner &&
              banner.map((banner) => (
                <div key={banner.id}>
                  <img
                    style={{ width: "100px" }}
                    src={`${request.fetchPosterImage}${banner.poster_path}`}
                    alt={`Banner ${banner.id}`}
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Content;
