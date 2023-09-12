import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Signup from './pages/Signup';
import Home from "./pages/Home";
import Login from "./pages/Login"
import ProtectedRoute from './components/ProtectedRoute';
import './custom.css';
import Footer from './components/Footer';
import Stream from './pages/Stream';

function App() {
  const location = useLocation();
  const [isStreamPage, setIsStreamPage] = useState(false);

  useEffect(() => {
    setIsStreamPage(location.pathname === '/stream');
  }, [location]);

  return (
    <>
      <div className={`scrollbar-hide ${isStreamPage ? 'stream-page' : ''}`}>
        <AuthContextProvider>
          <Navbar isStreamPage={isStreamPage} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/stream' element={<Stream />} />
            <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;