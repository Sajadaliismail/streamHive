import React, { useEffect } from 'react';
import { Routes, Route , Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginPage from './pages/landingPage/LandingPage';
import {HomePage,Movies,Popular,Tvshows} from './pages/HomePage/pages/pages'
import './app.css'

import Error from './pages/Error';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated } from './features/userAuthSlice';
import SignupPage from './pages/landingPage/signupPage';
import Video from './pages/VideoPage/videos';
import SearchContent from './pages/searchPage/searchContent';


function App(){
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    const authed = true || JSON.parse(localStorage.getItem('isAuthenticated'));
    if (authed !== isAuthenticated) {
      dispatch(setAuthenticated(authed)); 
    }
  }, [dispatch, isAuthenticated]);
    return(
        <>
        <Routes>
      <Route path="/" element={isAuthenticated ?  <Navigate to="/home" replace /> :<LoginPage /> } />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />} />
      <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" replace />} />
      <Route path="/tvshows" element={isAuthenticated ? <Tvshows /> : <Navigate to="/" replace />} />
      <Route path="/movies" element={isAuthenticated ? <Movies /> : <Navigate to="/" replace />} />
      <Route path="/popular" element={isAuthenticated ? <Popular /> : <Navigate to="/" replace />} />
      <Route path="/videos/:type/:id" element={isAuthenticated ? <Video /> : <Navigate to="/" replace />} />
      <Route path="/search/:search" element={isAuthenticated ? <SearchContent /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Error />} />
    </Routes>
        
        </>
    )
}

export default App

