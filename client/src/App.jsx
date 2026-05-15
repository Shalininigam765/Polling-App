import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import PollCarousel from './components/PollCarousel';
import Security from './components/Security';
import Login from './sign-up/Login.jsx';
import Register from './sign-up/Register.jsx';
import { useState } from 'react';

export default function App() {

  const [currentPage, setCurrentPage] = useState('home');

  const [user, setUser] = useState(null);

  //function to change the page
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };
  return (
  
    <div>
      {/* Conditional Rendering: Only show the component that matches the state */}
      {currentPage === 'home' && (
      <>
        <Hero navigateTo={navigateTo} />
        <Navbar navigateTo={navigateTo} user={user} setUser={setUser}  />
        <Features />
        <PollCarousel />
        <Security />
      </>)
      }
      {currentPage === 'login' && <Login navigateTo={navigateTo} user={user} setUser={setUser} />}
      {currentPage === 'signup' && <Register navigateTo={navigateTo} />}
      
    </div>
  
  );
}
