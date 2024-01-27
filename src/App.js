// src/App.js
import React, { useState } from 'react';
import './App.css'; // This file is for your styles

function App() {
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
    <div className="App">
      <header className="App-header">
        <h1>Groupthink!</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleInputChange}
          />
          <button type="submit">Get Started</button>
        </form>
      </header>
    </div>
  );
}

export default App;
