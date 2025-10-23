import {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';

export default function Headline() {
    const [headline, setHeadline] = useState([]);

    useEffect(() => {
        fetchHeadline();
    }, []);

    const fetchHeadline = async () => {
        try {
            const response = await fetch('http://localhost:8090/headline');
            const data = await response.json();
            setHeadline(<ReactMarkdown>{data.headLine}</ReactMarkdown>);
        } catch (error) {
            console.error('Error fetching headline:', error);
        }
    };
    
    return (
        <div className="header">
            <h2> Professional Summary </h2>
            <p className='myHeadline'>{headline}</p>
        </div>
    );
}
