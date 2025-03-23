import React, { useContext, useState } from 'react'
import { MyContext } from '../../context/Context'
import { useNavigate } from 'react-router'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'

const Signup = () => {


    const {setRegistered ,setToken,setId,loggedIn,setLoggedIn} =   useContext(MyContext)
    const [feedback,setFeedback]=useState("")
    const [data,setData] = useState({
          email:"",
          password:"",
          full_name:""
        })
    const handleChange = (e) =>{
          setData(
              {
                  ...data,
                  [e.target.name]:e.target.value
              }
          )
      }
    const navigate = useNavigate()
    

    const handleRegister = async (e) => {
        e.preventDefault()

        console.log(data)

        const response = await request({
          method:requestMethods.POST,
          route:"/register",
          body:data
        })

        console.log(response)

        if(response.success){
          setFeedback(response.message);
          setToken(response.data.token);
          localStorage.setItem("access_token",response.data.token)
          navigate("/")
          setLoggedIn(true)
        }else{
          setFeedback(response.message)
        }


      
      }

      
  return (
    <div className="login-form">
      <h1>Register</h1>
      <form onSubmit={(e)=>handleRegister(e)}>
          <input type="text" placeholder="name" name='full_name' onChange={(e)=>handleChange(e)} required/>
          <input type="email" placeholder="Email" name='email' onChange={(e)=>handleChange(e)} required/>
          <input type="password" placeholder="Password" name='password' onChange={(e)=>handleChange(e)} required/>
          <button className="login-btn">Register</button>
      </form>
      <p className="login-register-btn">Already have an account? <span onClick={()=>{setRegistered(true)}}>Login</span></p>
      <h1>{feedback!=null?feedback:""}</h1>
  </div>
  )
}

export default Signup
