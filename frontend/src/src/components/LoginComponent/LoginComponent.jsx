import React,{useContext, useState} from 'react'
import { MyContext } from '../../context/Context'
import { useNavigate } from 'react-router'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'

const LoginComponent = () => {

  
    const {setRegistered,setToken,setLoggedIn} =   useContext(MyContext)
    const [feedback,setFeedback] = ("")
    const [data,setData] = useState({
      email:"",
      password:""
    })
    const handleChange = (e) =>{
      setData(
          {
              ...data,
              [e.target.name]:e.target.value
          }
      )
  }
    //this will navigate without refreshing
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(data)
      

        const response = await request({
          method:requestMethods.POST,
          route:"/login",
          body:data
        })
        console.log(response)
        if(response.success){
          
          if (response.data.token !=null){
            localStorage.setItem('access_token',response.data.token)
            setToken(response.token)
            setLoggedIn(true)
            navigate("/")
          }
        }else{
          setFeedback(response.message)
        }
      
      }


  return (
    <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={(e)=>handleLogin(e)}>
            
            <input type="email" placeholder="Email" name='email' onChange={(e)=>handleChange(e)} required/>
            <input type="password" placeholder="Password" name='password' onChange={(e)=>handleChange(e)} required/>
            <button className="login-btn">Login</button>
            {feedback?<p>{feedback}</p>:""}
        </form>
        <p className="login-register-btn">Don't have an account? <span onClick={()=>{setRegistered(false)}}>Register</span></p>
    </div>
  )
}

export default LoginComponent
