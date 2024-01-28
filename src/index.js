import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import CourseList from "./CourseList";
import CourseThumbnail from './CourseThumbnail';
import TopicPage from './TopicPage';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/courses" element={<CourseList pageTitle="Courses" thumbnails={[<CourseThumbnail courseName="NumPy" />, <CourseThumbnail courseName="Finance" />, <CourseThumbnail courseName="Business Law" />]} />} />
      <Route path="/course/numpy" element={<CourseList pageTitle="NumPy" thumbnails={[<CourseThumbnail courseName="Basics" />, <CourseThumbnail courseName="Data processing" />]} />} />
      <Route path="/course/numpy/main" element={<TopicPage pageTitle="NumPy - Learning" summaySubtitles={["first", "second"]} summaryContents={["lorem ipsum dolor", "sit amet"]}/>} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
