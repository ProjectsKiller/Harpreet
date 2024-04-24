import React, { useEffect, useState } from 'react';

const HomePage = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [cssContent, setCssContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/homepage')
            .then(response => response.json())
            .then(data => {
                setHtmlContent(data.html);
                setCssContent(data.css);
                setIsLoading(false);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching homepage:', error);
                setIsLoading(false);
                
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <style dangerouslySetInnerHTML={{ __html: cssContent }} />
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
};

export default HomePage;
