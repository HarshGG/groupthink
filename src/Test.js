import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from 'react-youtube';
import './Test.css'

function Test() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const opts = {
        height: '400',
        width: '600',
        playerVars: {
            autoplay: 0, // Change to 1 if you want the video to autoplay
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getTopicData", { params: { prompt: "Numpy Tutorial" }, });
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
                        {data.Youtube.map((videoId, index) => (
                            <div key={index}>
                                <h5>{data.YoutubeNames[index]}</h5>
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

export default Test;
