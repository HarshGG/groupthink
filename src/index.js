import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Preferences from "./pages/Preferences"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseList from "./CourseList";
import CourseThumbnail from './CourseThumbnail';
import TopicPage from './TopicPage';
import Test from './Test';
import Navbar from './Navbar';
import Contact from './Contact';
import Profile from './Profile';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Preferences />} />
      <Route path="/test" element={<Test />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/courses" element={<CourseList pageTitle="Courses" thumbnails={[<CourseThumbnail courseName="NumPy" />, <CourseThumbnail courseName="Finance" />, <CourseThumbnail courseName="Business Law" />]} />} />
      <Route path="/course/numpy" element={<CourseList pageTitle="NumPy" thumbnails={[<CourseThumbnail courseName="Basics" />, <CourseThumbnail courseName="Data processing" />]} />} />
      <Route path="/course/numpy/main" element={<TopicPage pageTitle="NumPy - Learning" summarySubtitles={["first", "second"]} summaryContents={["lorem ipsum dolor", "sit amet"]} />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
