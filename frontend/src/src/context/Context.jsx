import React, { createContext,useEffect,useState } from 'react'

export const MyContext = createContext(null)

const ContextProvider = ({children}) =>{
   

    
    const [registered,setRegistered] = useState(false)
    const [token,setToken] = useState(null)
    const [id,setId]= useState(null)
    const [loggedIn,setLoggedIn]= useState(false)
    const [addPopup, setAddPopup] = useState(false)
    const [images,setImages] = useState([])
    const [globalFeedBack,setGlobalFeedback] = useState("")
     const url='http://localhost/gallery/server/apis/v1'
    const test="test"
    useEffect(()=>{
        if(localStorage.getItem("id")!=null) setId(localStorage.getItem("id"));
    },[])
    useEffect(()=>{
        localStorage.getItem("access_token")?setLoggedIn(true):""
    },[])
    const value={
        url,
        registered,setRegistered,
        addPopup, setAddPopup,
        token,setToken,
        id,setId,
        images,setImages,
        test,
        loggedIn,setLoggedIn,
        globalFeedBack,setGlobalFeedback
    }
    
    

    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextProvider;

