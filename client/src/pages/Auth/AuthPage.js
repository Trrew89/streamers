import React, {useState } from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, STREAMERS_ROUTE } from '../../utils/consts';
import {login, registration} from "../../http/userApi.js";
import './Auth.css'

const Auth = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLogin = location.pathname === LOGIN_ROUTE


  const click = async (e) => {
    e.preventDefault();

    try {
        let data;
        if (isLogin) {
            data = await login(email, password);
            console.log(data !== undefined)
            if(data !== undefined){
                navigate(STREAMERS_ROUTE)
                localStorage.setItem('token', data); 
            }
        } else {
            console.log(1)
            data = await registration(email, password);
            setEmail('');
            setPassword('')
            navigate(LOGIN_ROUTE)
            window.location.reload(false);
        }
        
    } catch (e) {
        alert(e.response.data.message)
    }

}

  return (
    <form onSubmit={click}>
        {isLogin ? <h3>Login Here</h3> : <h3>Registration Here</h3>}

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={e => setEmail(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" onChange={e => setPassword(e.target.value)}/>

        <button onClick={(e) => {click(e)} }>{isLogin ? 'Log In' : 'Sign up'}</button>
        {isLogin ?
            <div>
                No account? <NavLink to={REGISTRATION_ROUTE}>Registrate!</NavLink>
            </div>
            :
            <div>
                Already have an account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
            </div>
        }
    </form>
    )
};
export default Auth;


