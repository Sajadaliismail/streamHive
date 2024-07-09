import { useDispatch, useSelector } from "react-redux";
import { userCheck } from "../../features/userAsyncThunks";
import { setEmail, setError } from "../../features/userAuthSlice";
import { useNavigate } from "react-router-dom";
import CanvasComponent from "./canvas";


function Contents({ loginForm }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {email} = useSelector((state)=>state.auth)

  function handleSignup(){
  dispatch(userCheck({email: email})).then((res)=>{
    console.log(res.payload.userExists);
    if(res.payload.userExists){
      dispatch(setError('User already exists,Please Login'))
      loginForm()

    }
    else navigate('/signup')
  })
}
    return (
      <>
    <div className="content-container">
      <div className="content">
        <h1 className="main-heading">Unlimited Movies and TV Shows</h1>
        <h3 className="sub-heading">Watch Anywhere. Cancel Anytime.</h3>
        <p className="description">Explore our extensive library of movies, TV shows, and originals. Sign up now to start streaming.</p>
        <div className="email-input">
          <input onChange={(e) => dispatch(setEmail(e.target.value))} className="form-control" value={email} placeholder="Enter your email" type="email" />
          <button onClick={handleSignup} className="btn btn-danger">
            Get Started
          </button>
        </div>
      </div>
<CanvasComponent></CanvasComponent>
    </div>
      </>
    );
  }

  export default Contents;
  