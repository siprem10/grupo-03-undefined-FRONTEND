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
        <Route path="/" element={<Home />} />
        <Route path="/register" element={isSession ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={isSession ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/admin-panel"
          element={isSessionAdmin ? <PanelAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/create-user"
          element={isSession ? <Navigate to="/" /> : <UserForm {...createUserFields} />}
        />
        <Route
          path="/categories/create"
          element={isSession ? <CreateCategories /> : <Navigate to="/login" />}
        />
        <Route
          path="/categories/edit"
          element={isSession ? <EditCategories /> : <Navigate to="/login" />}
        />
        <Route
          path="/transactions/create"
          element={isSession ? <CreateTransactions /> : <Navigate to="/login" />}
        />
        <Route
          path="/transactions/edit"
          element={isSession ? <EditTransactions /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
