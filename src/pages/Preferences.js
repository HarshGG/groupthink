import React from 'react';
import totalScreens from '../assets/constants';
import './Preferences.css'; // This file is for your styles
import {firestore} from "../assets/firebase";
import {addDoc, collection} from "@firebase/firestore";

class Preferences extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        currentStep: 1,
        name:  '',
        topic: '',
        background: '', 
        answer1: '', 
        answer2: '', 
      }
    }

  
    handleChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })    
    }
     
    handleSubmit = event => {
      event.preventDefault()
      const { name, topic, background, answer1, answer2 } = this.state
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
        answer1: answer1,
        answer2: answer2,
      };

      addDoc(ref, data);

    }
    
    _next = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep >= totalScreens - 1 ? totalScreens : currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    }
      
    _prev = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
    }
  
  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }
  
  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep < totalScreens){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }
    
    render() {    
      return (
        <React.Fragment>
        <h1>React Wizard Form 🧙‍♂️</h1>
        <p>Screen {this.state.currentStep} </p> 
  
        <form onSubmit={this.handleSubmit}>
        {/* 
          render the form steps and pass required props in
        */}
          <Screen1 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            name={this.state.name}
          />
          <Screen2 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            topic={this.state.topic}
          />
          <Screen3 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            background={this.state.background}
          />
          <Screen4 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            answer1={this.state.answer1}
          />
          <Screen5 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            answer2={this.state.answer2}
          />
          {this.previousButton()}
          {this.nextButton()}
  
        </form>
        </React.Fragment>
      );
    }
  }
  
  function Screen1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={props.name}
          onChange={props.handleChange}
          />
      </div>
    );
  }
  
  function Screen2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div className="form-group">
        <label htmlFor="topic">topic</label>
        <input
          className="form-control"
          id="topic"
          name="topic"
          type="text"
          placeholder="Enter topic"
          value={props.topic}
          onChange={props.handleChange}
          />
      </div>
    );
  }
  
  function Screen3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <div className="form-group">
        <label htmlFor="background">Background</label>
        <input
          className="form-control"
          id="background"
          name="background"
          type="text"
          placeholder="Enter background"
          value={props.background}
          onChange={props.handleChange}
          />      
      </div>
    );
  }

  function Screen4(props) {
    if (props.currentStep !== 4) {
      return null
    } 
    return(
      <div className="form-group">
        <label htmlFor="answer1">Answer1</label>
        <input
          className="form-control"
          id="answer1"
          name="answer1"
          type="text"
          placeholder="Enter answer1"
          value={props.answer1}
          onChange={props.handleChange}
          />      
      </div>
    );
  }

  function Screen5(props) {
    if (props.currentStep !== 5) {
      return null
    } 
    return(
      <React.Fragment>
      <div className="form-group">
        <label htmlFor="answer2">Answer2</label>
        <input
          className="form-control"
          id="answer2"
          name="answer2"
          type="text"
          placeholder="Enter answer2"
          value={props.answer2}
          onChange={props.handleChange}
          />      
      </div>
      <button className="btn btn-success btn-block">Sign up</button>
      </React.Fragment>
    );
  }
  
  // ReactDOM.render(<MasterForm />, document.getElementById('root'))

export default Preferences;