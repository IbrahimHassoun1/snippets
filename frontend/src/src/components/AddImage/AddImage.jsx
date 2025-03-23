/* eslint-disable no-unused-vars */
import React, {  useContext, useEffect, useState } from 'react'
import axios from 'axios'
import "./AddImage.css"
import { MyContext } from '../../context/Context'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'
const AddImage = () => {


    const { setAddPopup,url,id,setId,setGlobalFeedback}=useContext(MyContext)
    const [image, setImage] = useState(null)
    const [feedback,setFeedback] = useState(null)

    const [data,setData] = useState({
        title:"",
        description:"",
        image:""
    })


    const handleChange = (e) =>{
        setData(
            {
                id:id,
                ...data,
                [e.target.name]:e.target.value
            }
        )
    }
    const handleImage = (e) =>{
        const image = e.target.files[0]
        if(!image)return;

        const reader = new FileReader()
        
    
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };
    
        ;
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setImage(reader.result);
        };

    }
    const addImage = async (e) =>{
        e.preventDefault()
        const apiData = {
            owner_id:id,
            ...data,
            image
        }
        console.log(image)
        const response = await request({
            method:requestMethods.POST,
            body:apiData,
            route:"/image/createImage.php"
        })
        if(response.error){
            setFeedback(response.message)
        }else{
            setFeedback("Image uploaded successfully")
        }
        
    }


  return (
    <div className='add-image' >
        <div className='relative' onClick={()=>setAddPopup(false)}>
            
        </div>
        <div className="table">
            <form onSubmit={(e)=>addImage(e)}>
                <input  
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                const preview = document.getElementById('image-preview');
                                preview.src = reader.result;
                            };
                            reader.readAsDataURL(file);
                            handleImage(e);
                        }
                    }} 
                    name='image'
                    
                />
                <img id="image-preview" alt="Image Preview" style={{ display: 'block', marginTop: '10px', maxWidth: '100%' }} />
                <input type="text" placeholder="Title" name="title"   onChange={(e)=>handleChange(e)} required/>
                <textarea placeholder="Description" name="description"  onChange={(e)=>handleChange(e)} required></textarea>
                <button type="submit" >Submit</button>
                {feedback!=null?<p>{feedback}</p>:""}
            </form>
        </div>
    
    </div>
)
}

export default AddImage
