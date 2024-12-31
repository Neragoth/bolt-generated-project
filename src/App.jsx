import React, { useState } from 'react';
  import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
  import './App.css';
  import Calculator from './Calculator';
  import About from './About';
  import AddFood from './AddFood';

  function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    return (
      <Router>
        <div className="app-container">
          <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
            <div className="menu-toggle" onClick={toggleMenu}>
              ☰
            </div>
            <ul className="menu-items">
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>Calculateur</Link>
              </li>
              <li>
                <Link to="/add-food" onClick={() => setMenuOpen(false)}>Ajouter un aliment</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
              </li>
            </ul>
          </nav>
          <main className="content">
            <Routes>
              <Route path="/" element={<Calculator />} />
              <Route path="/about" element={<About />} />
              <Route path="/add-food" element={<AddFood />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }

  export default App;
