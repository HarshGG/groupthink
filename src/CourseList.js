import React from 'react';
import './CourseList.css';
import { useNavigate } from 'react-router-dom';
import CourseThumbnail from './CourseThumbnail';

function CourseList({ pageTitle }) {
  let navigate = useNavigate();
  let content = JSON.parse(localStorage.getItem('content'))['Content'];
  if (!content) {
    content = {};
  }

  let handleClick = (index) => {
    localStorage.setItem("selectedTopic", (index+1).toString());
    console.log(localStorage.getItem("selectedTopic"))
    setTimeout(() => {
      navigate('/course');
    }, 500);
  };

  return (
    <div className="CourseList">
      <header className="CourseList-header">
        <h1>{pageTitle}</h1>
      </header>
      <div className="courses">
        {Object.keys(content).map((subtopic, i) => (
          <div onClick={() => handleClick(i)}>
            <CourseThumbnail courseName={content[subtopic]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
