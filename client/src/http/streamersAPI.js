import axios from "axios"

export const createStreamer = async (streamer) => {
    try {
        const data = await axios.post('http://localhost:5000/streamers', {...streamer})
        if(data.data.message === undefined){
            alert(data.data)
        } else {
            alert(data.data.message)
        }
    } catch (error) {
        alert(error.response.data.message)
    }
}

export const fetchAllStreamers = async () => {
    const {data} = await axios.get('http://localhost:5000/streamers')
    return data;

}

export const fetchOneStreamer = async (streamerId) => {
    const {data} = await axios.get(`http://localhost:5000/streamers/${streamerId}`, {streamerId})
    console.log(data)
}


export const voteForStreamer = async (streamerId, userId, vote) => {
    try {
        const {data} = await axios.put(`http://localhost:5000/streamers/${streamerId}/vote`, {userId, vote, streamerId})
        alert(data.message)
    } catch (error) {
        console.log(error)
    }
}

