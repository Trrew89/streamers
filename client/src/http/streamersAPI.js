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
    return data
}


{/* Working with SSE instead of setInterval in React*/}
// export const fetchAllStreamers = (callback) => {
//     const eventSource = new EventSource('http://localhost:5000/streamers');
  
//     eventSource.onmessage = (event) => {
//         console.log(event)
//     const data = JSON.parse(event.data);
//     console.log(data)
//     callback(data);
//     };
  
//     eventSource.onerror = (error) => {
//       console.error('SSE error:', error);
//     };
  
//     return () => {
//       eventSource.close();
//     };
//   };

export const fetchOneStreamer = async (streamerId) => {
    const {data} = await axios.get(`http://localhost:5000/streamers/${streamerId}`)
    return data
}


export const voteForStreamer = async (streamerId, userId, vote) => {
    try {
        const {data} = await axios.put(`http://localhost:5000/streamers/${streamerId}/vote`, {userId, vote, streamerId})
        alert(data.message)
    } catch (error) {
        console.log(error)
    }
}

