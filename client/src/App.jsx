
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddNew from './pages/AddNew'

function App() {
  
  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/register' element={<Register />}  />
        <Route path='/login' element={<Login />}  />
        <Route path='/' element={<Dashboard />}  />
        <Route path='/add-new' element={<AddNew />}  />
      </Routes>
    </>
  )
}

export default App
