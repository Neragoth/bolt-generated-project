import React, { useState } from 'react';
  import * as XLSX from 'xlsx';
  import localforage from 'localforage';

  function ImportFood() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleImport = async () => {
      if (!file) {
        setError('Veuillez sélectionner un fichier.');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (jsonData.length > 0) {
            const headers = jsonData[0];
            const foodData = jsonData.slice(1).map(row => {
              const foodItem = {};
              headers.forEach((header, index) => {
                foodItem[header] = row[index];
              });
              return foodItem;
            });

            const formattedFoodData = foodData.map(item => ({
              name: item['alim_nom_fr'],
              protein: item['Protéines, N x facteur de Jones (g/100 g)'],
              fat: item['Lipides (g/100 g)'],
              carbs: item['Glucides (g/100 g)'],
              calories: item['Energie, Règlement UE N° 1169/2011 (kcal/100 g)'],
            }));

            let existingFoodList = await localforage.getItem('foodList') || [];
            const updatedFoodList = [...existingFoodList, ...formattedFoodData];
            await localforage.setItem('foodList', updatedFoodList);
            setError(null);
            alert('Les aliments ont été importés avec succès.');
          } else {
            setError('Le fichier ne contient pas de données.');
          }
        } catch (err) {
          setError('Erreur lors de la lecture du fichier.');
          console.error('Error reading file:', err);
        }
      };
      reader.readAsArrayBuffer(file);
    };

    return (
      <div className="container">
        <h1>Importer un fichier .xls</h1>
        <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
        <button onClick={handleImport}>Importer</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  export default ImportFood;
