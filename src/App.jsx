import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import PanelAdmin from './Pages/PanelAdmin/PanelAdmin';
import {
    CreateCategories,
    CreateTransactions,
    EditCategories,
    EditTransactions,
} from './Pages';
import { UserForm, createUserFields } from './Components/Forms/UserForms';
import Profile from './Pages/Profile';
import { isLogged, isLoggedAdmin } from './Hooks/isSession';

function App() {
    const isSession = isLogged();
    const isSessionAdmin = isLoggedAdmin();

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/home' element={isSession ? <Home /> : <Navigate to='/' />} />
                <Route
                    path='/register'
                    element={isSession ? <Navigate to='/home' /> : <Register />}
                />
                <Route
                    path='/login'
                    element={isSession ? <Navigate to='/home' /> : <Login />}
                />
                <Route
                    path='/admin-panel'
                    element={
                        isSessionAdmin ? <PanelAdmin /> : <Navigate to='/' />
                    }
                />
                <Route
                    path='/create-user'
                    element={<UserForm {...createUserFields} />}
                />
                <Route
                    path='/categories/create'
                    element={
                        isSession ? (
                            <CreateCategories />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />
                <Route
                    path='/categories/edit'
                    element={
                        isSession ? (
                            <EditCategories />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />
                <Route
                    path='/transactions/create'
                    element={
                        isSession ? (
                            <CreateTransactions />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />
                <Route
                    path='/transactions/edit'
                    element={
                        isSession ? (
                            <EditTransactions />
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />
                <Route
                    path='/user-info'
                    element={!isSession ? <Navigate to='/' /> : <Profile />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
