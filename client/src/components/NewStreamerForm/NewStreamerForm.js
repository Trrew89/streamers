import React, { useState } from 'react';
import './NewStreamerForm.css'
import MyInput from '../UI/input/MyInput';
import MyButton from '../UI/button/MyButton';
import { createStreamer } from '../../http/streamersAPI';

const NewStreamerForm = ({showForm}) => {
    const [streamer, setStreamer] = useState({name: '', description: '', platform: 'Twitch'})
    const platforms = ['Twitch', 'Youtube', 'Kick', 'TikTok', 'Rumble']
    const addStreamer = (e) => {
        console.log(streamer.platform)
        e.preventDefault()
        const newStreamer = {...streamer};
        createStreamer(newStreamer);
        setStreamer({name:'', description: '', platform: ''})
        
    }
    

    return (
        <form className='streamer-form'>
            <MyInput
                value={streamer.name}
                onChange={e => setStreamer({...streamer, name: e.target.value})}
                type='text'
                placeholder='Streamers`s nickname'
            />
            <MyInput
                value={streamer.description}
                onChange={e => setStreamer({...streamer, description: e.target.value})}
                type='text'
                placeholder='Streamers`s description'
            />

            {/*Custom select doesn't work right. Nothing changes with "onChange"*/}
            {/* <MySelect options={platforms} name='Platforms' onChange={e =>  setStreamer({...streamer, platform: e.target.value})}/> */}
            <div className='custom-select'>
                <select onChange={e =>  setStreamer({...streamer, platform: e.target.value})}>
                    {platforms.map(e => 
                        <option key={e} value={e}>{e}</option>)}
                </select>
            </div>
            <MyButton onClick={e => {addStreamer(); showForm();}}>Add Streamer</MyButton>
        </form>
        );
};

export default NewStreamerForm;