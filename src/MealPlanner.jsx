import React, { useState, useEffect } from 'react';
  import localforage from 'localforage';

  function MealPlanner() {
    const [mealItems, setMealItems] = useState([]);
    const [foodList, setFoodList] = useState([]);
    const [selectedFood, setSelectedFood] = useState('');
    const [quantity, setQuantity] = useState(100);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFoodList, setFilteredFoodList] = useState([]);

    useEffect(() => {
      loadFoodList();
    }, []);

    useEffect(() => {
      filterFoodList();
    }, [searchQuery, foodList]);

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

    const filterFoodList = () => {
      if (!searchQuery) {
        setFilteredFoodList(foodList);
        return;
      }
      const filtered = foodList.filter(food =>
        food.name && food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFoodList(filtered);
    };

    const handleAddMealItem = () => {
      if (!selectedFood) return;
      const food = foodList.find(f => f.name === selectedFood);
      if (food) {
        const newItem = {
          name: food.name,
          protein: parseFloat(food.protein) * (quantity / 100),
          fat: parseFloat(food.fat) * (quantity / 100),
          carbs: parseFloat(food.carbs) * (quantity / 100),
          calories: parseFloat(food.calories) * (quantity / 100),
          quantity: quantity
        };
        setMealItems([...mealItems, newItem]);
      }
    };

    const handleAddRow = () => {
      setMealItems([...mealItems, { name: '', protein: 0, fat: 0, carbs: 0, calories: 0, quantity: 100 }]);
    };

     const handleDeleteRow = (index) => {
      const newMealItems = [...mealItems];
      newMealItems.splice(index, 1);
      setMealItems(newMealItems);
    };

    const calculateTotal = (nutrient) => {
      return mealItems.reduce((sum, item) => sum + (item[nutrient] || 0), 0).toFixed(2);
    };

    return (
      <div className="container">
        <h1>Gestionnaire de repas</h1>
        <div>
          <input
            type="text"
            placeholder="Rechercher un aliment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={selectedFood} onChange={(e) => setSelectedFood(e.target.value)}>
            <option value="">Sélectionner un aliment</option>
            {filteredFoodList.map((food, index) => (
              <option key={index} value={food.name}>{food.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            placeholder="Quantité (g)"
          />
          <button onClick={handleAddMealItem}>Ajouter</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Protéines (g)</th>
              <th>Lipides (g)</th>
              <th>Glucides (g)</th>
              <th>Calories</th>
              <th>Quantité (g)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mealItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.protein.toFixed(2)}</td>
                <td>{item.fat.toFixed(2)}</td>
                <td>{item.carbs.toFixed(2)}</td>
                <td>{item.calories.toFixed(2)}</td>
                <td>{item.quantity}</td>
                 <td>
                  <button onClick={() => handleDeleteRow(index)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td><b>Total</b></td>
              <td><b>{calculateTotal('protein')}</b></td>
              <td><b>{calculateTotal('fat')}</b></td>
              <td><b>{calculateTotal('carbs')}</b></td>
              <td><b>{calculateTotal('calories')}</b></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <button onClick={handleAddRow}>Ajouter un aliment</button>
      </div>
    );
  }

  export default MealPlanner;
