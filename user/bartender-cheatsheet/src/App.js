import { useState } from 'react';
import { HashRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/header';
import './styles.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Details from './pages/details';
import Footer from './components/footer';
import Login from './pages/Authentication/login';
import Signup from './pages/Authentication/signup';

export default function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/')
  }

  return (
    <Router>
      <div className="w-full pb-2 min-h-screen flex flex-col">
        {isAuthenticated ? (
          <>
            <Header />
            <Navbar logout={handleLogout}/>
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path='/' element={<Home username={username}/>} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/cocktail-details/:id' element={<Details />} />
              </Routes>
            </div>
            <Footer />
          </>
        ) : (
          <>
            <Header />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path='/login' element={<Login onLogin={handleLogin} />} />
                <Route path='/signup' element={<Signup onSignup={handleLogin}/>} />
                <Route path='/' element={<Login onLogin={handleLogin} />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}