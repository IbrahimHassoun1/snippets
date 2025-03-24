import 'prismjs/themes/prism.css'; 
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';
import "./styles.css"
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ImageCard = ({language,code,title}) => {

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    
    return (
    
        <div className="snippet-card">
            <h4>{title}</h4>
            <pre className='pre'>
                <code className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        </div>

)
}

export default ImageCard
