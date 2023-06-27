import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../../routes';
import { useEffect, useState } from 'react';

const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));

    useEffect(() => {
        setIsAuth(localStorage.getItem('token'))
    })
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component()} exact/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component()} exact/>
            )}
            <Route path="*" element={isAuth ? <Navigate to='/' replace/> : <Navigate to='/login' replace/>}/>
        </Routes>
    );
};

export default AppRouter;