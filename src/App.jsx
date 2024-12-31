import React, { useState } from 'react';
  import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
  import './App.css';
  import Calculator from './Calculator';
  import About from './About';
  import AddFood from './AddFood';
  import FoodList from './FoodList';
  import SearchFood from './SearchFood';
  import ImportFood from './ImportFood';
  import MealPlanner from './MealPlanner';

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
                <Link to="/food-list" onClick={() => setMenuOpen(false)}>Liste des aliments</Link>
              </li>
              <li>
                <Link to="/search-food" onClick={() => setMenuOpen(false)}>Rechercher un aliment</Link>
              </li>
               <li>
                <Link to="/meal-planner" onClick={() => setMenuOpen(false)}>Gestionnaire de repas</Link>
              </li>
              <li>
                <Link to="/import-food" onClick={() => setMenuOpen(false)}>Importer un fichier</Link>
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
              <Route path="/food-list" element={<FoodList />} />
              <Route path="/search-food" element={<SearchFood />} />
              <Route path="/import-food" element={<ImportFood />} />
              <Route path="/meal-planner" element={<MealPlanner />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }

  export default App;
