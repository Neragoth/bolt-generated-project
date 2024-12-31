import React, { useState, useEffect } from 'react';
  import localforage from 'localforage';

  function AddFood() {
    const [name, setName] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [calories, setCalories] = useState('');
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

    const saveFoodList = async (updatedFoodList) => {
      try {
        await localforage.setItem('foodList', updatedFoodList);
      } catch (error) {
        console.error('Error saving food list:', error);
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const newFood = { name, protein, fat, carbs, calories };
      const updatedFoodList = [...foodList, newFood];
      setFoodList(updatedFoodList);
      await saveFoodList(updatedFoodList);
      // Réinitialiser le formulaire
      setName('');
      setProtein('');
      setFat('');
      setCarbs('');
      setCalories('');
    };

    const calculateCalories = () => {
      const proteinCalories = parseFloat(protein) * 4 || 0;
      const fatCalories = parseFloat(fat) * 9 || 0;
      const carbCalories = parseFloat(carbs) * 4 || 0;
      const totalCalories = proteinCalories + fatCalories + carbCalories;
      setCalories(totalCalories.toFixed(0));
    };

    return (
      <div className="container">
        <h1>Ajouter un aliment</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom de l'aliment :</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Protéines (g) :</label>
            <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} required onBlur={calculateCalories}/>
          </div>
          <div>
            <label>Lipides (g) :</label>
            <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} required onBlur={calculateCalories}/>
          </div>
          <div>
            <label>Glucides (g) :</label>
            <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} required onBlur={calculateCalories}/>
          </div>
          <div>
            <label>Calories (pour 100g) :</label>
            <input type="text" value={calories} readOnly />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    );
  }

  export default AddFood;
