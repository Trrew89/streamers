import axios from 'axios'

export const registration = async (email, password) => {
    const {data} = await axios.post('http://localhost:5000/user/registration', {email, password})
    alert(data)
    localStorage.setItem('token', data.message)
    return data.message;

}

export const login = async (email, password) => {
    try {
        const {data} = await axios.post('http://localhost:5000/user/login', {email, password},)
        localStorage.setItem('token', data.message)
        return data.message;
    } catch (error) {
        console.log(error);
    }
}