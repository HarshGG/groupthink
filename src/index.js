import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Preferences from "./pages/Preferences"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Room from "./Room";
import Test from './Test';
import Navbar from './Navbar';
import Lemonade from "./pages/Lemonade"

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
      <Route path="/room" element={<Room />} />
      <Route path="/test" element={<Test />} />
      <Route path="/lemonade" element={<Lemonade />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
