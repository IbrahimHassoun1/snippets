import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Login from './pages/Login/Login.jsx'
function App() {
 
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
