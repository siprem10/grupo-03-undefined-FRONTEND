import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { CreateCategories, CreateTransactions, EditCategories, EditTransactions } from './Pages';
import { UserForm, createUserFields } from './Components/Forms/UserForms';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route
                    path='/create-user'
                    element={<UserForm {...createUserFields} />}
                />
                <Route exact path='/categories/create' element={<CreateCategories />} />
                <Route exact path='/categories/edit' element={<EditCategories />} />
                <Route exact path='/transactions/create' element={<CreateTransactions />} />
                <Route exact path='/transactions/edit' element={<EditTransactions />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;