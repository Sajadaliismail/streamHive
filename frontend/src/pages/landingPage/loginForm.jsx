import React, { useState } from 'react';

import {
  MDBBtn,
  MDBModal,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';

import { login } from '../../features/userAsyncThunks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail } from '../../features/userAuthSlice';

function LoginForm(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {error,isAuthenticated} = useSelector((state)=>state.auth)

  const {email} = useSelector((state)=>state.auth)
  const [password,setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(login({email,password}))
    if(isAuthenticated){
      navigate('/home')
    }
  }

  return (
    
    <>
     <MDBModal open={props.visible} onClose={props.func} tabIndex='-1'>
          <MDBCard className='bg-dark text-white mx-auto' style={{borderRadius: '1rem', maxWidth: '500px',marginTop:'100px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' className='text-white' labelClass='text-white' value={email} onChange={(e)=>dispatch(setEmail(e.target.value))} label='Email address' id='formControlLgEmail' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' className='text-white' labelClass='text-white' value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' id='formControlLgPww' type='password' size="lg"/>
              <p className='small text-danger'>{error}</p>
              {/* <p className="small mb-3 pb-lg-2">Forgot password?</p> */}
              <MDBBtn outline onClick={handleSubmit} className='mx-2 px-5' color='white' size='sm'>
                Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
     </MDBModal>
    </>

  );
}

export default LoginForm;   