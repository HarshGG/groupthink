import {React, useState} from 'react';
import totalScreens from '../assets/constants';
import './Lemonade.css'; // Make sure to include the CSS file
import {firestore} from "../assets/firebase";
import {addDoc, collection} from "@firebase/firestore";


function MyComponent() {
  const [formData, setFormData] = useState({
    currentStep: 1,
    name:  '',
    topic: '',
    background: '',
    question1: '', 
    answer1: '', 
    question2: '',
    answer2: '', 
  });

  const handleChange = event => {
    console.log("currentStep before = ", formData.currentStep)
    const {name, value} = event.target
      setFormData({
        [name]: value
    })    
    console.log("currentStep after = ", formData.currentStep)
  }
   
  const handleSubmit = event => {
    event.preventDefault()
    const { name, topic, background, question1, answer1, question2, answer2 } = formData
    alert(`Your registration detail: \n 
           Name: ${name} \n 
           Topic: ${topic} \n
           Background: ${background} \n
           Answer1: ${answer1} \n
           Answer2: ${answer2}`)

    const ref = collection(firestore, "account");

    let data = {
      name: name,
      topic: topic,
      background: background,
      question1: question1,
      answer1: answer1,
      question2: question2,
      answer2: answer2,
    };

    addDoc(ref, data);

  }
  
  const _next = async () => {
    console.log("RAN _next !!!")
    let currentStep = formData.currentStep

    if(currentStep === 3) {
      setFormData({ question1: 'Loading...', question2: 'Loading...' });
      const { topic, background } = formData
      const questionInputData = {
        topic: topic,
        background: background
      }
      await fetch('http://localhost:3001/generate-questions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(questionInputData),
        })
        .then(response => response.json())
        .then(data => {
            setFormData({
                question1: data.q1,
                question2: data.q2,
            });
        })
        .catch(error => console.error('Error:', error));
    }

    currentStep = currentStep >= totalScreens - 1 ? totalScreens : currentStep + 1
    setFormData({
      currentStep: currentStep
    })
  }
    
  const _prev = () => {
    let currentStep = formData.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    setFormData({
      currentStep: currentStep
    })
  };

  /*
  * the functions for our button
  */
  const previousButton = () => {
    let currentStep = formData.currentStep;
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={_prev}>
          Previous
        </button>
      )
    }
    return null;
  };

  const nextButton = () => {
    let currentStep = formData.currentStep;
    console.log("RAN nextButton");
    console.log(currentStep);
    if(currentStep < totalScreens){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={_next}>
        Next
        </button>        
      )
    }
    return null;
  };

  const getQuestion = () => {
    switch (formData.currentStep) {
      case 1:
        return "What's your name?";
      case 2:
        return "What's your topic?";
      case 3:
        return "What's your background?";
      case 4:
        return formData.question1;
      case 5:
        return formData.question2;
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <QuestionCard question={getQuestion()} handleChange={handleChange} previousButton={previousButton()} nextButton={nextButton()} formData={formData}/>
      </form>
      <button className="help-button">Help</button>
    </div>
  );
}

function QuestionCard (props) { 
  return (
    <div className="content">
      <h1>Your Preferences</h1>
      <p>{props.question}</p>
      <div className="radio-buttons">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={props.formData.name}
          onChange={props.handleChange}
        />
      </div>
      {props.previousButton}
      {props.nextButton}
    </div>
  );
}

export default MyComponent;