/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './Gallery.css'
import Snippet from '../Snippet/Snippet'
import AddSnippet from '../AddSnippet/AddSnippet'
import { MyContext } from '../../context/Context'
import FadeInOut from '../../effects/FadeInOut'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'



const Gallery = () => {

  
  const {addPopup, setAddPopup,id,url,images,setImages,loggedIn,globalFeedBack,setGlobalFeedback}=useContext(MyContext)
  const getAllSnippets = async ()=>{
    const response = await request({
      method:requestMethods.GET,
      route:"/snippet/get",
    })
    if(!response.error){
      setImages(response.data)
      console.log(response.data)
    }
  }


  useEffect(()=>{
    localStorage.getItem("access_token")!=null? getAllSnippets():"",
    console.log(images)
  },[])

 
  return (
    <div className='parent'>
      {addPopup?<AddSnippet/>:""}
    <div className='container gallery'>
        
        <h1 id='photos'>Snippets</h1>
        <hr />
        <div className="table">
          {images.length>0?
          images.map((element,index)=>{
            return <FadeInOut direction='in' id={element.id} key={element.id}><Snippet title={element.title} code={element.code} key={element.id} index={index} language={element.language}/></FadeInOut>
          })
          :loggedIn?
          <h1>There are no snippets available now</h1>
          :<h1>Login to access Snippets</h1>}
        
          </div>
          {loggedIn? <button addPopup={addPopup} setAddPopup={setAddPopup} className='add-button'>Add snippet</button>:""}
          <p>{globalFeedBack}</p>
    </div>
    </div>
    
  )
}

export default Gallery
