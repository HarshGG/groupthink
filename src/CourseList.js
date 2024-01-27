// src/CourseList.js
import React, { useState } from 'react';
import './CourseList.css'; // This file is for your styles
import CourseThumbnail from './CourseThumbnail';

function CourseList() {
  const [name, setName] = useState(''); // Using useState to handle the name input

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
        <h1>This is my room</h1>
        <CourseThumbnail />
      </header>
    </div>
  );
}

export default CourseList;
