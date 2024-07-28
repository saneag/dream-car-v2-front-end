import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from './Routes';
import Footer from './components/Footer';
import Header from './components/Header';

import { fetchAuthUser, isAuthenticated } from './redux/slices/userAuthSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/App.scss';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthenticated);
    const theme = useSelector((state) => state.changeTheme.theme);

    React.useEffect(() => {
        dispatch(fetchAuthUser());
    }, []);

    const routes = useRoutes(isAuth);

    return (
        <div
            className='App'
            id={theme}>
            <div className='container'>
                <Router>
                    <Header />
                    {routes}
                </Router>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
