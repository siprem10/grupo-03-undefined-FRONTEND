import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { UserForm, createUserFields } from './Components/Forms/UserForms';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route
                    path='/create-user'
                    element={<UserForm {...createUserFields} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
