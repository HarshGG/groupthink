// src/CourseThumbnail.js
import './CourseThumbnail.css'; // This file is for your styles

function CourseThumbnail({courseName}) {

  return (
    <div className="CourseThumbnail">
        <h4 className="courseName">{courseName}</h4>
    </div>
  );
}

export default CourseThumbnail;