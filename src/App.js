import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis'; // Ajusta la ruta según la ubicación real

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarImagen = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('No se pudo cargar la imagen. Verifica la URL.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImage(url);
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      setError('Error al cargar la imagen. Verifica la URL.');
    } finally {
      setLoading(false);
    }
  };

  const analizarImagen = async () => {
    try {
      setLoading(true);
      setError(null);

      await cargarImagen(); // Cargar la imagen antes de analizarla

      const results = await analyzeImage(imageUrl);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error al analizar la imagen:', error);
      setError('Error al analizar la imagen. Verifica la URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Analizador de imagenes</h1>
       
      <label htmlFor="imageUrl">Dirección URL de la imagen:</label>
      <input
        type="text"
        id="imageUrl"
        placeholder="Ingrese la URL de la imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button onClick={analizarImagen} disabled={loading}>
        {loading ? 'Analizando...' : 'Analizar Imagen'}
      </button>

      {image && (
        <div>
          <h2>Imagen:</h2>
          <img src={image} alt="Imagen analizada" style={{ maxWidth: '100%' }} />
        </div>
      )}

      {analysisResults && (
        <div>
          <h2>Resultados:</h2>
          <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
          <p>Imagen procesada: {imageUrl}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
