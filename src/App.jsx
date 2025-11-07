import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './user/pages/Login';
import Register from './user/pages/Register';
import AdminPanel from './admin/pages/AdminPanel';

function App() {

  const role = 'user'

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
