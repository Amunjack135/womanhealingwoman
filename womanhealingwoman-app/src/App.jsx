import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import EventsPage from './pages/EventsPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <ScrollToTop/>
      <Navbar />
      <div className='pt-10'>
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
