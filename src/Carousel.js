// Carousel.jsx
import React, { useState } from 'react';
import './Carousel.css'; // Import the CSS file

const Carousel = () => {
    const questions = ["What is numpy", "Question 2", "Question 3"];
    const answers = ["some random python library", "Answer 2", "Answer 3"];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleLeftClick = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? questions.length - 1 : prevIndex - 1));
    };

    const handleRightClick = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex === questions.length - 1 ? 0 : prevIndex + 1));
    };

    const handleFlipClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div>
            <div className="carousel-container">
                <div className="carousel-body" onClick={handleFlipClick}>
                    <p>{isFlipped ? answers[currentIndex] : questions[currentIndex]}</p>
                </div>
                <div className="carousel-buttons">
                    <button className="carousel-button" onClick={handleLeftClick}>Left</button>
                    <button className="carousel-button" onClick={handleRightClick}>Right</button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
