import './App.css';
import Contents from './contents';
import Headers from './header';
import { useState } from 'react';

function LoginPage() {
  const [visible,setVisible] = useState(false)
  
  function loginForm(){
      setVisible(!visible)
  }
  
  return (
    <>
    <Headers  loginForm={loginForm} visible={visible} />
    <Contents loginForm={loginForm}/>
    </>
  )
}

export default LoginPage;
