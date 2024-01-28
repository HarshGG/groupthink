import {React, useState} from 'react';
import totalScreens from '../assets/constants';
import './Lemonade.css'; // Make sure to include the CSS file
import {firestore} from "../assets/firebase";
import {addDoc, collection} from "@firebase/firestore";


function MyComponent() {
  const [formData, setFormData] = useState({
    name:  '',
    topic: '',
    background: '',
    question1: '', 
    question2: '',
    answer1: '', 
    answer2: '', 
  });

  const [currentStep, setCurrentStep] = useState(0);


  const handleChange = event => {
    const {name, value} = event.target
    console.log("BEFORE: ", formData)
    setFormData({
      ...formData,
      [name]: value
    })    
    console.log("AFTER: ", formData)
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

    createCourse();

  }


  
  const _next = async () => {

    if(currentStep === 2) {
      setFormData({ ...formData, question1: 'Loading...', question2: 'Loading...' });
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
                ...formData,
                question1: data.q1,
                question2: data.q2,
            });
        })
        .catch(error => console.error('Error:', error));
    }

    let newStep = currentStep >= totalScreens - 1 ? totalScreens - 1 : currentStep + 1
    setCurrentStep(newStep);
  }
    
  const _prev = () => {
    let newStep = currentStep <= 1? 1: currentStep - 1
    setCurrentStep(newStep);
  };

  /*
  * the functions for our button
  */
  const previousButton = () => {
    if(currentStep !== 0){
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
    if(currentStep < totalScreens - 1){
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
    switch (currentStep) {
      case 0:
        return "What's your name?";
      case 1:
        return "What's your topic?";
      case 2:
        return "What's your background?";
      case 3:
        return formData.question1;
      case 4:
        return formData.question2;
    }
  };

  const getValue = () => {
    switch (currentStep) {
      case 0:
        return formData.name;
      case 1:
        return formData.topic;
      case 2:
        return formData.background;
      case 3:
        return formData.answer1;
      case 4:
        return formData.answer2;
    }
  };

  const getIdentifier = () => {
    switch (currentStep) {
      case 0:
        return "name";
      case 1:
        return "topic";
      case 2:
        return "background";
      case 3:
        return "answer1";
      case 4:
        return "answer2";
    }
  };

  const createCourse = () => {
    console.log("GO TO NEXT PAGE");
  }

  const submitButton = () => {
    if (currentStep !== totalScreens - 1) {
      return null;      
    }
    return (
      <button 
        className="btn btn-help float-right" 
        type="submit" onClick={handleSubmit}>
        Create
      </button>
    );
  }

  console.log(formData)

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <QuestionCard question={getQuestion()} handleChange={handleChange} previousButton={previousButton()} nextButton={nextButton()} formData={formData} currentStep={currentStep} 
          key={Object.keys(formData)[currentStep]} value={getValue()} identifier={getIdentifier()} submitButton={submitButton()}
        />
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
        {/* <label htmlFor={key}>Name</label> */}
        <input
          className="form-control"
          id={props.identifier}
          name={props.identifier}
          type="text"
          placeholder="Type here"
          onChange={props.handleChange}
        />
      </div>
      <div class="buttonsContainer">
        {props.previousButton}
        {props.nextButton}
        {props.submitButton}
      </div>
    </div>
  );
}

export default MyComponent;