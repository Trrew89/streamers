import React, { useEffect, useState } from 'react';
import { fetchOneStreamer, voteForStreamer } from '../../http/streamersAPI';
import staticImage from '../../static/staticImage.png'
import './StreamerPage.css'
const StreamerPage = () => {
    const [id, setId] = useState(window.location.pathname.replace('/', ''))
    const [streamer, setStreamer] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
         const fetchData = () => {
            fetchOneStreamer(id)
            .then(data => setStreamer(data))
            .catch(error => console.log(error));
         }

         fetchData();
        const intervalId = setInterval(fetchData, 2000);
        return () => {
            clearInterval(intervalId);
          };
    }, [id])

    useEffect(() => {
        setId(window.location.pathname.replace('/', ''))
    })

    return (
        <div className="streamer-card">
            <img src={staticImage} alt={streamer.name} className="streamer-avatar"/>
            <h2 className="streamer-name">{streamer.name}</h2>
            <p className="streamer-platform">Platform: {streamer.platform}</p>
            <p className="streamer-description">{streamer.description}</p>
            <p className="streamer-votes">Votes: {streamer.votes}</p>
            <button className ="vote-btn" onClick={() =>  voteForStreamer(streamer._id, token, 'upvote') }>Upvote</button>
            <button className ="vote-btn" onClick={() => voteForStreamer(streamer._id, token, 'downvote')} >Downvote</button>
        </div>
    );
};

export default StreamerPage;