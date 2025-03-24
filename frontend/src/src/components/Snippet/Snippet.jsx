import React, { useContext ,useEffect,useState} from 'react'
import './ImageCard.css'
import { MyContext } from '../../context/Context'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'


const ImageCard = ({image_id,src,title,description,index}) => {


    const {setImages} = useContext(MyContext)
    const [data,setData] = useState({
        title:title,
        description:description
        })
    const [feedBack,setFeedBack] = useState("")
    const handleChange = (e) =>{
        setData(
            {
                ...data,
                [e.target.name]:e.target.value
            }
        )
    }
    const deleteImage= async (element_id)=>{

        const response = await request({
            method:requestMethods.POST,
            route:"/image/deleteImage.php",
            body:{"id":element_id}
        })

        if(!response.error){
            setImages(images => images.filter((_, i) => i !== index));
        }
        
    }
    const updateImage = async(element_id)=>{
        const response = await request({
            method:requestMethods.POST,
            route:"/image/updateImage.php",
            body:{"id":element_id,...data}
        })
        setFeedBack(response.message)
    }
    
useEffect(()=>{
console.log(data)
},[data])


  return (
    
        <div className="image-card">
            <img  src={src} alt="image" />
            <div className="image-card-content">
                
                <div className='info'>
                    <input type="text"  value={data.title} onChange={(e)=>handleChange(e)} name='title'/>
                    <textarea onChange={(e)=>handleChange(e)} name='description' value={data.description}></textarea>
                </div>
                <div className='buttons'>
                    <button className='delete-button' onClick={()=>deleteImage(image_id)} >Delete</button>
                    <button onClick={()=>updateImage(image_id)}>Edit</button>
                </div>
                <h3>{feedBack}</h3>
            </div>
        </div>

  )
}

export default ImageCard
