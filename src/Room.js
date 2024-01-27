// src/Room.js
import React, { useState } from 'react';
import './Room.css'; // This file is for your styles

function Room() {
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
    <div className="Room">
      <header className="Room-header">
        <h1>This is my room</h1>
      </header>
    </div>
  );
}

export default Room;
