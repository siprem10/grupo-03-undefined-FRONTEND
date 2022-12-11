import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import PanelAdmin from './Pages/PanelAdmin/PanelAdmin';
import { CreateCategories, CreateTransactions, EditCategories, EditTransactions } from './Pages';
import { UserForm, createUserFields } from './Components/Forms/UserForms';
import { isLogged, isLoggedAdmin } from './Hooks/isSession';

function App() {

    const isSession = isLogged();
    const isSessionAdmin = isLoggedAdmin();

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={isSession ? <Home /> : <Navigate to="/login" />} />
                <Route exact path='/register' element={isSession ? <Navigate to="/" /> : <Register />} />
                <Route exact path='/login' element={isSession ? <Navigate to="/" /> : <Login />} />
                <Route path="/panel-admin" element={isSessionAdmin ? <PanelAdmin /> : <Navigate to="/" />} />
                <Route
                    path='/create-user'
                    element={isSession ? <Navigate to="/" /> : <UserForm {...createUserFields} />}
                />
                <Route exact path='/categories/create' element={isSession ? <CreateCategories /> : <Navigate to="/login" />} />
                <Route exact path='/categories/edit' element={isSession ? <EditCategories /> : <Navigate to="/login" />} />
                <Route exact path='/transactions/create' element={isSession ? <CreateTransactions /> : <Navigate to="/login" />} />
                <Route exact path='/transactions/edit' element={isSession ? <EditTransactions /> : <Navigate to="/login" /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;