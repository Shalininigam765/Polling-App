import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({navigateTo}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__logo">⛩ MYTHOS</div>
      <ul className="navbar__links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#polls">Active Polls</a></li>
        <li><a href="#features">Community</a></li>
      </ul>
      <button className="navbar__cta" onClick={() => navigateTo('login')}>Login</button>
    </nav>
  );
}
