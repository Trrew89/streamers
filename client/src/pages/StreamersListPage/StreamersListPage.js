import React, { useEffect, useState } from 'react';
import { fetchAllStreamers } from '../../http/streamersAPI';
import StreamersList from '../../components/StreamersList/StreamersList';
import NewStreamerForm from '../../components/NewStreamerForm/NewStreamerForm';
import MyButton from '../../components/UI/button/MyButton';
import './StreamersListPage.css'
const StreamersListPage = () => {
    const [streamers, setStreamers] = useState([]);
    const [usingForm, setUsingForm] = useState(false)
    useEffect(() => {
        const interval = setInterval(() => {
            let data = fetchAllStreamers().then(e => setStreamers(e));
        }, 2000);
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        fetchAllStreamers().then(e => setStreamers(e))
    }, [])

    // useEffect(() => {
    //     const unsubscribe = fetchAllStreamers((data) => {
    //         console.log(data)
    //       setStreamers([...streamers], data);
    //       console.log(streamers)
    //     });
    
    //     return () => {
    //       unsubscribe();
    //     };
    //   });

    const showForm = (e) => {
        e.preventDefault()
        setUsingForm(!usingForm);
    }

    return (
            <div >
                <MyButton onClick={showForm}>Add Streamer</MyButton>
                <StreamersList streamers={streamers} usingForm={usingForm}/>
                {usingForm ? <NewStreamerForm showForm={showForm}/> : null}
                
            </div>
    );
};

export default StreamersListPage;

