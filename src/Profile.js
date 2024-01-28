// Profile.js
import React from 'react';
import './Profile.css'; // Import the corresponding CSS file

const Profile = () => {
    // Sample data (replace with actual user data)
    const userData = {
        username: 'JohnDoe',
        coursesTaken: 10,
        dateJoined: 'January 1, 2022',
        communities: 3,
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        currentlyLearning: [
            { course: 'Advanced JavaScript', progress: 75 },
            { course: 'React Hooks', progress: 50 },
            { course: 'Node.js Basics', progress: 30 },
        ],
    };

    return (
        <div className="profile-container">
            <h1>{userData.username}'s Profile</h1>
            <div className="statistics">
                <div className="statistic-item">
                    <span>{userData.coursesTaken}</span>
                    <p>Courses Taken</p>
                </div>
                <div className="statistic-item">
                    <span>{userData.dateJoined}</span>
                    <p>Date Joined</p>
                </div>
            </div>

            <div className="learning-section">
                <h2>Currently Learning</h2>
                <div className="learning-list">
                    {userData.currentlyLearning.map((course, index) => (
                        <div className="course-item" key={index}>
                            <p className=''>{course.course}</p>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="skills-section">
                <h2>Skills</h2>
                <div className="skills-list">
                    {userData.skills.map((skill, index) => (
                        <p key={index} className={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right'}>
                            {skill}
                        </p>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Profile;
