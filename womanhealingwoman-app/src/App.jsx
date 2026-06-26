import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import EventsPage from './pages/EventsPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
