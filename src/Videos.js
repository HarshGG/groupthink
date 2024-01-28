import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from 'react-youtube';
import './Videos.css'

function Videos({prompt}) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    let vidIds = JSON.parse(localStorage.getItem('content'))['Youtube']
    let vidNames = JSON.parse(localStorage.getItem('content'))['YoutubeNames']
    
    var opts = {
        height: '200',
        width: '300',
        playerVars: {
            autoplay: 0, // Change to 1 if you want the video to autoplay
        },
    };

    const responsiveOpts = {
        height: '200', // Adjust as needed
        width: '300',  // Adjust as needed
    };

    opts = window.innerWidth < 768 ? responsiveOpts : opts;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:3001/api/getTopicData", { params: { topic: "", background: "", question1: "", answer1: "", question2: "", answer2: "", prompt: prompt}, });
                setData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <p>{data.Youtube ?
                <div className="VideosContainer">
                    <div className="Videos">
                        {/* {data.Youtube.map((videoId, index) => (
                            <div className="YouTubeContainer" key={index}>
                                <h5>{data.YoutubeNames[index]}</h5>
                                <YouTube videoId={videoId} opts={opts} />
                            </div>
                        ))} */}
                        {vidIds.map((videoId, index) => (
                            <div className="YoutubeContainer" key={index}>
                                <h5>{vidNames[index]}</h5>
                                <YouTube videoId={videoId} opts={opts} />
                            </div>
                        ))}
                    </div>
                </div>
                : <div>
                </div>}</p>
        </div>
    );
}

export default Videos;
