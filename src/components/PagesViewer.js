import React, { useEffect, useState } from 'react';

const PagesViewer = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/pages')
            .then(response => response.json())
            .then(data => setPages(data))
            .catch(error => console.error('Error fetching pages:', error));
    }, []);

    return (
        <div>
            {pages.map(page => (
                <div key={page.id}>
                    <h2>{page.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: page.html }}></div>
                </div>
            ))}
        </div>
    );
};

export default PagesViewer;
