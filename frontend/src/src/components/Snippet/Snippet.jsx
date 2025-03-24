import 'prismjs/themes/prism.css'; 
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';
import "./styles.css"
import { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPen,faHeart } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from '../../context/Context';
import { request } from '../../utils/remote/axios';
import { requestMethods } from '../../utils/enum/request.methods';

const Snippet = ({language,code,title,id}) => {

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const {globalFeedBack,setGlobalFeedback}=useContext(MyContext)

    const deleteSnippet = async()=>{
        const response = await request({
            method:requestMethods.DELETE,
            route:"/snippet/delete",
            body:{"id":id}
        })
        console.log("deletion response")
        console.log(response)
        setGlobalFeedback(response.message)
    }
    return (
    
        <div className="snippet-card">
            <h4>{title}</h4>
            <pre className='pre'>
                <code className={`language-${language}`}>
                    {code}
                </code>
            </pre>
            <ul>
                <li>
                <FontAwesomeIcon icon={faTrash} className='fontawesome-icon' onClick={()=>deleteSnippet()} />
                </li>
                <li>
                <FontAwesomeIcon icon={faPen} className='fontawesome-icon'/>
                </li>
                <li>
                <FontAwesomeIcon icon={faHeart} className='fontawesome-icon'/>
                </li>
            </ul>
        </div>

)
}

export default Snippet
