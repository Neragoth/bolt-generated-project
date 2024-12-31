import React, { useState } from 'react';

  function Calculator() {
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('kg');
    const [goal, setGoal] = useState('maintain');
    const [activity, setActivity] = useState('sedentary');
    const [gender, setGender] = useState('male');
    const [results, setResults] = useState({});

    const calculateNeeds = () => {
      let bmr;
      let tdee;
      let weightKg = unit === 'lbs' ? weight * 0.453592 : weight;

      // Formule de Mifflin-St Jeor pour le BMR
      if (gender === 'male') {
        bmr = 10 * weightKg + 6.25 * 170 - 5 * 40 + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * 170 - 5 * 40 - 161;
      }

      tdee = bmr * (activity === 'sedentary' ? 1.2 : activity === 'moderate' ? 1.55 : 1.725);

      let protein, fat, carbs;
      if (goal === 'lose') {
        protein = 1.6 * weightKg;
        fat = 0.2 * tdee / 9;
        carbs = (tdee - protein * 4 - fat * 9) / 4;
      } else if (goal === 'gain') {
        protein = 2.2 * weightKg;
        fat = 0.3 * tdee / 9;
        carbs = (tdee - protein * 4 - fat * 9) / 4;
      } else { // maintain
        protein = 1.8 * weightKg;
        fat = 0.25 * tdee / 9;
        carbs = (tdee - protein * 4 - fat * 9) / 4;
      }

      setResults({
        tdee: Math.round(tdee),
        protein: Math.round(protein),
        fat: Math.round(fat),
        carbs: Math.round(carbs)
      });
    };

    return (
      <div className="container">
        <h1>Calculateur de Rations</h1>
        <div>
          <label>Poids :</label>
          <input type="number" value={weight} onChange={e => setWeight(parseFloat(e.target.value))} />
          <select value={unit} onChange={e => setUnit(e.target.value)}>
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
        <div>
          <label>Sexe :</label>
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </div>
        <div>
          <label>Objectif :</label>
          <select value={goal} onChange={e => setGoal(e.target.value)}>
            <option value="lose">Perte de poids</option>
            <option value="maintain">Maintien</option>
            <option value="gain">Prise de masse</option>
          </select>
        </div>
        <div>
          <label>Activité :</label>
          <select value={activity} onChange={e => setActivity(e.target.value)}>
            <option value="sedentary">Sédentaire</option>
            <option value="moderate">Modéré</option>
            <option value="active">Actif</option>
          </select>
        </div>
        <button onClick={calculateNeeds}>Calculer</button>
        {results.tdee && (
          <div className="results">
            <h2>Résultats :</h2>
            <p>Besoins caloriques : {results.tdee} kcal</p>
            <p>Protéines : {results.protein} g</p>
            <p>Lipides : {results.fat} g</p>
            <p>Glucides : {results.carbs} g</p>
          </div>
        )}
      </div>
    );
  }

  export default Calculator;
