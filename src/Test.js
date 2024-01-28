import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from 'react-youtube';

function Test() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const opts = {
        height: '315',
        width: '560',
        playerVars: {
            autoplay: 0, // Change to 1 if you want the video to autoplay
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/getTopicData", { params: { prompt: "Numpy Tutorial" }, });
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
                <div>
                    <p>{data.Youtube[0]}</p>
                    <div>
                        {data.Youtube.map((videoId, index) => (
                            <YouTube key={index} videoId={videoId} opts={opts} />
                        ))}
                    </div>
                </div>
                : <div>
                </div>}</p>
        </div>
    );
}

export default Test;
