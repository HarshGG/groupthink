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
    console.log("NAME, VALUE: ", name, value)
    
    setFormData({
      ...formData,
      [name]: value,
      
    })    
    console.log("AFTER: ", formData)
  }

  const handleChange2 = event => {
    const {name, value} = event.target
    console.log("BEFORE: ", formData)
    console.log("NAME, VALUE: ", name, value)
    
    setFormData({
      ...formData,
      [name]: value,
      
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

  }


  
  const _next = async () => {

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

    let newStep = currentStep >= totalScreens - 1 ? totalScreens : currentStep + 1
    setCurrentStep(newStep);
  }
    
  const _prev = () => {
    let newStep = currentStep <= 0? 0: currentStep - 1
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

  console.log(formData)

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <NameQuestionCard 
          name={formData.name} 
          onChange={handleChange} 
          previousButton={previousButton()} 
          nextButton={nextButton()}
          currentStep={currentStep}
        />
        <TopicQuestionCard 
          topic={formData.topic} 
          onChange={handleChange} 
          previousButton={previousButton()} 
          nextButton={nextButton()}
          currentStep={currentStep}
        />
        <BackgroundQuestionCard 
          background={formData.background} 
          onChange={handleChange} 
          previousButton={previousButton()} 
          nextButton={nextButton()}
          currentStep={currentStep}
        />

        
        {/* <QuestionCard question={getQuestion()} handleChange={handleChange} previousButton={previousButton()} nextButton={nextButton()} formData={formData} currentStep={currentStep} 
          key={Object.keys(formData)[currentStep]} value={getValue()} identifier={getIdentifier()}
        /> */}
      </form>
      <button className="help-button">Help</button>
    </div>
  );
}

function NameQuestionCard (props) { 
  if (props.currentStep !== 0) {
    return null;
  }
  return (
    <div className="content">
      <h1>Your Preferences</h1>
      <p>What's your name?</p>
      <div className="radio-buttons">
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          placeholder="Type here"
          onChange={props.onChange}
        />
      </div>
      {props.previousButton}
      {props.nextButton}
    </div>
  );
}

function TopicQuestionCard (props) { 
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="content">
      <h1>Your Preferences</h1>
      <p>What's your topic?</p>
      <div className="radio-buttons">
        <input
          className="form-control"
          id="topic"
          name="topic"
          type="text"
          placeholder="Type here"
          onChange={props.onChange}
        />
      </div>
      {props.previousButton}
      {props.nextButton}
    </div>
  );
}

function BackgroundQuestionCard (props) { 
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="content">
      <h1>Your Preferences</h1>
      <p>What's your background?</p>
      <div className="radio-buttons">
        <input
          className="form-control"
          id="background"
          name="background"
          type="text"
          placeholder="Type here"
          onChange={props.onChange}
        />
      </div>
      {props.previousButton}
      {props.nextButton}
    </div>
  );
}



export default MyComponent;