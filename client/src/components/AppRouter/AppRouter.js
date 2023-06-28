import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../../routes';
import { useState } from 'react';
import { STREAMERS_ROUTE } from '../../utils/consts';

const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));
   

    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component()} exact/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component()} exact/>
            )}
            <Route path="*" element={isAuth ? <Navigate to={STREAMERS_ROUTE} replace/> : <Navigate to='/login' replace/>}/>
        </Routes>
    );
};

export default AppRouter;