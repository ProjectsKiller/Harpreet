import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Page = () => {
  const { pageUrl } = useParams();
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    // Fetch page content from your API based on pageUrl
    // Example: fetch(`/api/pages/${pageUrl}`)
    // Then set the page content with setPageContent
  }, [pageUrl]);

  return (
    <div dangerouslySetInnerHTML={{ __html: pageContent }} />
  );
};

export default Page;
