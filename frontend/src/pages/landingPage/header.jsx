import { Link } from "react-router-dom";
import LoginForm from "./loginForm"; 
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { SearchInputContext } from "../../Contexts/SearchInputContext";
import { useContext } from "react";

function Headers({ loginForm, visible }){

  const { search, setSearch } = useContext(SearchInputContext);  
  function handleInput(e) {
    e.preventDefault()
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  }


    return (
      <>
      <MDBNavbar sticky='true' style={{zIndex:'6'}} bgColor="light" className="text-dark">
          <MDBContainer fluid>
            <MDBNavbarBrand className="gap-4">
            <Link  className="nav-link" to="/">
              <img style={{ width: "110px" }} src="/nf-logo.png" alt="" />
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
              <MDBBtn type="button" onClick={()=>{

              }}>
                Search
              </MDBBtn>
            </MDBInputGroup>
      <div className="ms-4">
        <select className='selectLangugae' name="" id="">
          <option className='options' value="english">English</option>
          <option  className='options' value="hindi">हिन्दी</option>
        </select>
      <button onClick={loginForm} className='loginBtn'>Sign in</button>
      </div>
    
          </MDBContainer>
        </MDBNavbar>
      <div className='header'>
      {visible &&
       (
      <LoginForm func={loginForm} visible={visible} />
      )
      }
      </div>
      
      
      </>
    )
  }

  export default Headers;