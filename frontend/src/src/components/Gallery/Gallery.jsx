/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './Gallery.css'
import ImageCard from '../ImageCard/ImageCard'
import AddImage from '../AddImage/AddImage'
import { MyContext } from '../../context/Context'
import FadeInOut from '../../effects/FadeInOut'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'



const Gallery = () => {

  
  const {addPopup, setAddPopup,id,url,images,setImages,loggedIn,setLoggedIn}=useContext(MyContext)
  const getAllImages = async ()=>{
    const response = await request({
      method:requestMethods.POST,
      route:"/image/readAllImages.php",
      body:{"owner_id":localStorage.getItem("id")}
    })
    if(!response.error){
      setImages(response.data)
      console.log(response.data)
    }
  }


  useEffect(()=>{
    localStorage.getItem("id")!=null? getAllImages():"",
    console.log(images)
  },[])

 
  return (
    <div className='parent'>
      {addPopup?<AddImage/>:""}
    <div className='container gallery'>
        
        <h1 id='photos'>Snippets</h1>
        <hr />
        <div className="table">
          {images.length>0?
          images.map((element,index)=>{
            return <FadeInOut direction='in' key={element.id}><ImageCard src={element.base64} title={element.title} description={element.description} key={element.id} image_id={element.id} index={index}/></FadeInOut>
          })
          :loggedIn?
          <h1>There are no snippets available now</h1>
          :<h1>Login to access Snippets</h1>}
        
          </div>
          {loggedIn? <button addPopup={addPopup} setAddPopup={setAddPopup} >Add snippet</button>:""}
          
    </div>
    </div>
    
  )
}

export default Gallery
