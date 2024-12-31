import React, { useState, useEffect } from 'react';
  import localforage from 'localforage';

  function FoodList() {
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

    return (
      <div className="container">
        <h1>Liste des aliments</h1>
        {foodList.length === 0 ? (
          <p>Aucun aliment ajouté pour le moment.</p>
        ) : (
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
              {foodList.map((food, index) => (
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

  export default FoodList;
