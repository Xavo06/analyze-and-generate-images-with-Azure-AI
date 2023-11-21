import axios from 'axios';

const subscriptionKey = 'ca453792405540b9a2a233306a601e24'; // Reemplaza con tu clave de suscripción de Visión de Azure
const endpoint = 'https://vision-computer.cognitiveservices.azure.com/'; // Reemplaza con tu punto de conexión de Visión de Azure

export const analyzeImage = async (imageUrl) => {
  try {
    const response = await axios.post(
      `${endpoint}/vision/v3.0/analyze?visualFeatures=Description,Tags,Faces&language=es`,
      { url: imageUrl },
      {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al analizar la imagen:', error);
    throw error;
  }
};
