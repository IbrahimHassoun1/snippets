import React from 'react'
import Gallery from '../../components/Gallery/Gallery.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx'
import "./styles.css"
const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Gallery/>
    </div>
  )
}

export default Home 