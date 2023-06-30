import React, { useEffect, useState } from 'react';
import { fetchAllStreamers } from '../../http/streamersAPI';
import StreamersList from '../../components/StreamersList/StreamersList';
import NewStreamerForm from '../../components/NewStreamerForm/NewStreamerForm';
import MyButton from '../../components/UI/button/MyButton';
import './StreamersListPage.css'
const StreamersListPage = () => {
    const [streamers, setStreamers] = useState([]);
    const [usingForm, setUsingForm] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchAllStreamers();
            setStreamers(data);
          } catch (error) {
            if (error.response && error.response.status === 400) {
              setError('No streamers yet, add One');
            } else {
              setError('An error occurred while fetching streamers');
            }
          }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 2000);
        return () => {
            clearInterval(intervalId);
          };
      }, []);

    const showForm = (e) => {
        e.preventDefault()
        setUsingForm(!usingForm);
    }
    return (
            <div >
                <MyButton onClick={showForm}>Add Streamer</MyButton>
                {error ? <div className='no-streamers'>{error}</div>: <StreamersList streamers={streamers} usingForm={usingForm}/>}
                {usingForm ? <NewStreamerForm showForm={showForm}/> : null}
                
            </div>
    );
};

export default StreamersListPage;

