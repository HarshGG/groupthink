import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [formData, setFormData] = useState({
    topic: '',
    background: '',
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData); // Logging the form data to the console
    const data = {
      topic: document.getElementById('topic').value,
      background: document.getElementById('background').value,
  };

  // Make the POST request
  fetch('http://localhost:3001/generate-questions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      // Display the result
      document.getElementById('result').innerText = data.questions.join('\n');
  })
  .catch((error) => {
      console.error('Error:', error);
  });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Groupthink!</h1>
      </header>
      <form id="questionForm" onSubmit={handleFormSubmit}>
        <input type="text" id="topic" placeholder="Topic" value={formData.topic} onChange={handleInputChange} />
        <input type="text" id="background" placeholder="Background" value={formData.background} onChange={handleInputChange} />
        <button type="submit">Generate Questions</button>
      </form>

      <div id="result"></div>
    </div>
  );
}

export default App;
