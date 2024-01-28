import React from 'react';
import totalScreens from '../assets/constants';
import './Preferences.css'; // This file is for your styles
import { firestore } from "../assets/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { Link } from 'react-router-dom'

class Preferences extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      name: '',
      topic: '',
      background: '',
      question1: '',
      answer1: '',
      question2: '',
      answer2: '',
    }
  }


  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    const { name, topic, background, question1, answer1, question2, answer2 } = this.state
    const topicDataInput = {
      name: name,
      topic: topic,
      background: background,
      question1: question1,
      question2: question2,
      answer1: answer1,
      answer2: answer2
    };
    await fetch("http://localhost:3001/api/getTopicData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topicDataInput),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error('Error:', error));

  }

  _next = async () => {
    let currentStep = this.state.currentStep

    if (currentStep === 3) {
      this.setState({ question1: 'Loading...', question2: 'Loading...' });
      const { topic, background } = this.state
      const questionInputData = {
        topic: topic,
        background: background
      }
      await fetch('http://localhost:3001/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionInputData),
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            question1: data.q1,
            question2: data.q2,
          });
        })
        .catch(error => console.error('Error:', error));
    } else if (currentStep === 5) {
      const { name, topic, background, question1, answer1, question2, answer2 } = this.state
      const topicDataInput = {
        name: name,
        topic: topic,
        background: background,
        question1: question1,
        question2: question2,
        answer1: answer1,
        answer2: answer2
      };
      await fetch("http://localhost:3001/api/getTopicData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topicDataInput),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          localStorage.setItem('content', JSON.stringify(data));
          localStorage.setItem('background', background);
        })
        .catch(error => console.error('Error:', error));

    }

    currentStep = currentStep >= totalScreens - 1 ? totalScreens : currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button" onClick={this._prev}>
          Previous
        </button>
      )
    }
    return (
      <div></div>
    );
  }

  nextButton() {
    console.log(this.formData);

    let currentStep = this.state.currentStep;
    if (currentStep < totalScreens) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button" onClick={this._next}>
          Next
        </button>
      )
    } else {
      return (
        <button
          className="btn btn-primary float-right"
          type="button" onClick={this.handleSubmit}>
          Get Started!
        </button>
      )
    }
    return null;
  }

  async fetchTopicData() {
    const { name, topic, background, question1, answer1, question2, answer2 } = this.state
    const topicDataInput = {
      name: name,
      topic: topic,
      background: background,
      question1: question1,
      question2: question2,
      answer1: answer1,
      answer2: answer2
    };
    await fetch("https://localhost:3001/api/getTopicData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topicDataInput),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error('Error:', error));
  }


  render() {
    const isFinalStep = this.state.currentStep > 5;

    return (
      <React.Fragment>
        <h2>Your Preferences</h2>
        {!isFinalStep && (
          <>
            <form onSubmit={this.handleSubmit}>
              <Screen1 currentStep={this.state.currentStep}
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
                question1={this.state.question1}
              />
              <Screen5
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                answer2={this.state.answer2}
                question2={this.state.question2}
              />
            </form>
            <div class="buttonContainer">
              {this.previousButton()}
              {this.nextButton()}
            </div>
          </>
        )}
        {isFinalStep && (
          // Render your new component with navigate button here
          <div class="align-items: center">
            <button>
              <Link to={{
                pathname: "/courses",
              }}>
                Go to home
              </Link>
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

function Screen1(props) {
  if (props.currentStep !== 1) {
    return null
  }
  return (
    <div className="form-group">
      <div>
        <label className="labels" htmlFor="name">Name</label>
      </div>

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
  return (
    <div className="form-group">
      <div>
      <label htmlFor="topic">topic</label>
      </div>
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
  return (
    <div className="form-group">
      <div>
      <label htmlFor="background">Background</label>
      </div>
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
  return (
    <div className="form-group">
      <div>
      <label htmlFor="answer1">{props.question1}</label>
      </div>
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
  return (
    <React.Fragment>
      <div className="form-group">
        <div>
        <label htmlFor="answer2">{props.question2}</label>
        </div>
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
    </React.Fragment>
  );
}

// ReactDOM.render(<MasterForm />, document.getElementById('root'))

export default Preferences;