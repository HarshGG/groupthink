import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Import the CSS file

const Carousel = ({ data }) => {
    const [qaPairs, setQAPairs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Extract questions and answers from the data prop
    useEffect(() => {
        if (data && Array.isArray(data)) {
            const pairs = data.map(item => ({
                question: item.Q,
                answer: item.A
            }));
            setQAPairs(pairs);
        }
    }, [data]);
    console.log(qaPairs)
    const handleLeftClick = () => {
        setIsFlipped(false);
        setCurrentIndex(prevIndex => prevIndex === 0 ? qaPairs.length - 1 : prevIndex - 1);
    };

    const handleRightClick = () => {
        setIsFlipped(false);
        setCurrentIndex(prevIndex => prevIndex === qaPairs.length - 1 ? 0 : prevIndex + 1);
    };

    const handleFlipClick = () => {
        setIsFlipped(!isFlipped);
    };

    if (qaPairs.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="carousel-container">
                <div className="carousel-body" onClick={handleFlipClick}>
                    <p>{isFlipped ? qaPairs[currentIndex].answer : qaPairs[currentIndex].question}</p>
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
