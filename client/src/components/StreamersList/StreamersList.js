import React from 'react';
import StreamerItem from '../StreamerItem/StreamerItem'
import './StreamersList.css'
const StreamersList = ({ streamers }) => {
    return (
      <div className="streamers-list">
        {streamers.map((streamer) => (
          <StreamerItem key={streamer.id} streamer={streamer} />
        ))}
      </div>
    );
  };
  
  export default StreamersList;