import React from 'react';
import staticImage from '../../static/staticImage.png'
import { useNavigate } from 'react-router-dom';
import { STREAMERS_ROUTE } from '../../utils/consts';
import { voteForStreamer } from '../../http/streamersAPI';

const StreamerItem = ({streamer}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    return (
        <div  className="streamer" >
            <div  className="streamer-item" onClick={() => navigate(STREAMERS_ROUTE + streamer._id)}>
                <img src={staticImage} alt={streamer.name} className="streamer-avatar"/>
                <div className="streamer-details" >
                    <h2 className="streamer-name"> {streamer.name} from {streamer.platform}</h2>

                    <p className="streamer-description"> {streamer.description}</p>
                    <div>Rating: {streamer.votes}</div>
                </div>
            </div>
            <div className='vote'>
                <button onClick={() =>  voteForStreamer(streamer._id,token, 'upvote') }>Upvote</button>
                <button onClick={() => voteForStreamer(streamer._id, token, 'downvote')} >Downvote</button>
            </div>
        </div>
    );
};

export default StreamerItem;