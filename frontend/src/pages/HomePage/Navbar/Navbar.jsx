import { useContext } from "react";
import { useDispatch } from "react-redux";
import { SearchInputContext } from "../../../Contexts/SearchInputContext";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
    MDBInputGroup,
  } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../features/userAsyncThunks";


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { search, setSearch } = useContext(SearchInputContext);  
    function handleInput(e) {
      e.preventDefault()
      const searchTerm = e.target.value;
      setSearch(searchTerm);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      if (search.trim() !== "") {
        navigate(`/search/${search}`)
      } else {
      }
    }
  
    function handleLogout() {
      dispatch(logout());
    }
  
    return (
      <>
        <MDBNavbar sticky='true' style={{zIndex:'6'}} bgColor="light" className="text-dark">
          <MDBContainer fluid>
            <MDBNavbarBrand className="gap-4">
            <Link className="nav-link" to="/">
              <img style={{ width: "110px" }} src="/nf-logo.png" alt="" />
              </Link>
              <Link className="nav-link" to="/home">
                Home
              </Link>
              <Link className="nav-link" to="/tvshows">
                TV Shows
              </Link>
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
              <Link className="nav-link" to="/popular">
                Popular
              </Link>
            </MDBNavbarBrand>
  
            <MDBInputGroup tag="form" className="d-flex w-auto ms-auto">
              <input
                value={search}
                onChange={handleInput}
                className="form-control"
                placeholder="Search movies..."
                aria-label="Search"
                type="Search"
              />
              <MDBBtn type="button" onClick={handleSubmit}>
                Search
              </MDBBtn>
            </MDBInputGroup>
            <MDBBtn onClick={handleLogout} className="mx-2" color="danger">
              Logout
            </MDBBtn>
          </MDBContainer>
        </MDBNavbar>
        <MDBBtn color="dark" className="mt-2" onClick={(e)=>{
          e.preventDefault()
          navigate(-1)}} >Back</MDBBtn>
      </>
    );
  }

  export default Header