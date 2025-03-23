import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'

import './login.css'
import LoginComponent from '../../components/LoginComponent/LoginComponent.jsx'
import Signup from '../../components/Signup/Signup.jsx'
import { MyContext } from '../../context/Context.jsx'
import FadeInOut from '../../effects/FadeInOut.jsx'

const Login = () => {
  const {registered} = useContext(MyContext)







  return (
    <div className='login'>
        
        {registered?

        <FadeInOut direction='in'><LoginComponent/></FadeInOut>:
        <FadeInOut direction='in'><Signup/></FadeInOut>
      }
        
    </div>
  )
}

export default Login
