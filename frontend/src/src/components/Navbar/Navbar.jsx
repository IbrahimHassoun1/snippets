import React, { useContext } from 'react'
import "./navbar.css"
import { Link } from 'react-router'
import { MyContext } from '../../context/Context'


const Navbar = () => {


    const {id,setId,setImages,loggedIn,setLoggedIn} = useContext(MyContext)


return (
    <div className='navbar '>
        <div className="navbar-content container">
        <h1>Codebase</h1>
        <ul>
            
            <li><button className={id!=null?"Logout":"Signup"}>
            {loggedIn?
             <span onClick={()=>{localStorage.removeItem("access_token");setLoggedIn(false);setImages([])}}>Logout</span>
            :<Link to="/login" className='link' >Signup</Link>}
                
                
                </button></li>
        </ul>
        
        </div>
        

    </div>
)
}

export default Navbar
