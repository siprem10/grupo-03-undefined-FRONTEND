import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Transactions from './Components/Transactions/Transactions'
import CreateTransaction from './Components/Transactions/CreateTransaction/CreateTransaction'
import Profile from './Components/Profile/Profile';
import NotFound from './Components/NotFound/NotFound';
import { isLogged, isLoggedAdmin } from './Hooks/isSession';

function App() {
    const isSession = isLogged();
    const isSessionAdmin = isLoggedAdmin();

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/home' element={isSession ? <Home /> : <Navigate to='/' />} />
                <Route path='/register' element={isSession ? <Navigate to='/home' /> : <Register />} />
                <Route path='/login' element={isSession ? <Navigate to='/home' /> : <Login />} />
                <Route path='/admin-panel' element={isSessionAdmin ? <AdminPanel /> : <Navigate to='/' />} />
                <Route path='/transactions' element={isSession ? <Transactions /> : <Navigate to='/login' />} />
                <Route path='/transactions/create' element={isSession ? <CreateTransaction /> : <Navigate to='/login' />} />
                <Route path='/profile' element={!isSession ? <Navigate to='/' /> : <Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
