import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [videoIds, setVideoIds] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/youtubelinks", { params: { prompt: "Numpy Tutorial" }, });
                setData(response.data);
                setVideoIds(response.data.map(item => 'https://www.youtube.com/watch?v=' + item.id.videoId));
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);


    
    return (
        <div>
            <p>{videoIds[0]}</p>
        </div>
    );
}

export default Test;
