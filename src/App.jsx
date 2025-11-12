import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './assets/components/Navbar'
import Home from './pages/home/Home'

function App() {

  return (
    <Router>
      <Navbar/>
      <div className='pt-16'>
        <Routes>
         <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
