// src/CourseList.js
import React, { useState } from 'react';
import './CourseList.css'; // This file is for your styles
import { Link, useLocation } from 'react-router-dom';
import CourseThumbnail from './CourseThumbnail';

function CourseList({pageTitle, thumbnails}) {
  const [name, setName] = useState(''); // Using useState to handle the name input
  let location = useLocation();

  let content = JSON.parse(localStorage.getItem('content'))['Content'];
  if(!content) {
    content = {};
  }

  let handleClick = (courseName) => {
    localStorage.setItem(JSON.stringify({selectedTopic: courseName}));
  }

  const handleInputChange = (event) => {
    setName(event.target.value); // Update the name state when input changes
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    // Here you might handle the submission, like storing the name or navigating to another page
    console.log(name); // For now, we'll just log the name to the console
  };

  return (
    <div className="CourseList">
      <header className="CourseList-header">
        <h1>{pageTitle}</h1>
      </header>
      <div className="courses"> 
        {/* <CourseThumbnail courseName="NumPy" />
        <CourseThumbnail courseName="Finance" />
        <CourseThumbnail courseName="Business Law" /> */}
        {Object.keys(content).map((subtopic, i) => (<Link to="/course" onClick={() => {this.handleClick(content[subtopic])}}><CourseThumbnail courseName={content[subtopic]} /></Link>))}
      </div>
    </div>
  );
}

export default CourseList;
