import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { UserForm, createUserFields } from './Components/Forms/UserForms';
import PanelAdmin from './Pages/PanelAdmin/PanelAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/panel-admin" element={<PanelAdmin />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/create-user" element={<UserForm {...createUserFields} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
