import React, { useState, useEffect } from 'react';
  import localforage from 'localforage';

  function SearchFood() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
      loadFoodList();
    }, []);

    const loadFoodList = async () => {
      try {
        const storedFoodList = await localforage.getItem('foodList');
        if (storedFoodList) {
          setFoodList(storedFoodList);
        }
      } catch (error) {
        console.error('Error loading food list:', error);
      }
    };


    const handleSearch = () => {
      setError(null);
      if (!query) {
        setResults(foodList);
        return;
      }
      const filteredResults = foodList.filter(food =>
        food.name && food.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    };

    return (
      <div className="container">
        <h1>Rechercher un aliment</h1>
        <div>
          <input
            type="text"
            placeholder="Rechercher un aliment..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Rechercher</button>
        </div>
         {error && <p style={{ color: 'red' }}>{error}</p>}
        {results.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Protéines (g)</th>
                <th>Lipides (g)</th>
                <th>Glucides (g)</th>
                <th>Calories (pour 100g)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((food, index) => (
                <tr key={index}>
                  <td>{food.name}</td>
                  <td>{food.protein}</td>
                  <td>{food.fat}</td>
                  <td>{food.carbs}</td>
                   <td>{food.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  export default SearchFood;
