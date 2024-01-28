import React, { useState, useEffect } from 'react';
import TopicPage from './TopicPage';

function TopicPageGenerator() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("titl")

  useEffect(() => {
    async function fetchData() {
      let content = JSON.stringify(JSON.parse(localStorage.getItem('content'))['Content']);
      let index = localStorage.getItem('selectedTopic');
    //   console.log(JSON.parse(localStorage.getItem('content'))['Content'][index])
      setTitle(JSON.parse(localStorage.getItem('content'))['Content'][index]);
      let background = localStorage.getItem('background');

      let postData = { headlines: content, number: index, background: background };

      try {
        const response = await fetch('http://localhost:3001/api/generate-subtopic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
        const result = await response.json();
        console.log('Success:', result);
        setData(result); // Set the data to state
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run only once

  // Render only if data is available
  if (data) {
    return (
      <TopicPage pageTitle={title} summaryContents={[""]} summarySubtitles={[data]} />
    );
  } else {
    return <div>Loading...</div>; // Or any other loading state
  }
}

export default TopicPageGenerator;
