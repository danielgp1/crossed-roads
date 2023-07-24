import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';

// Define the shape of the available color data
interface AvailableColorData {
  user_id: number;
  color_hash: string;
}

// Define the shape of the context
interface AvailableColorsContextData {
  availableColors: AvailableColorData[];
  setAvailableColors: React.Dispatch<React.SetStateAction<AvailableColorData[]>>;
  addColor: (newColor: string) => Promise<void>;
}

// Create the context
const AvailableColorsContext = createContext<AvailableColorsContextData | undefined>(undefined);

// Create a custom hook to use the context easily
export const useAvailableColorsContext = () => {
  const context = useContext(AvailableColorsContext);
  if (!context) {
    throw new Error('useAvailableColorsContext must be used within an AvailableColorsProvider');
  }
  return context;
};

// Create the AvailableColorsProvider component
const AvailableColorsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [availableColors, setAvailableColors] = useState<AvailableColorData[]>([]);
  const { user } = useUserContext();

  const fetchAvailableColors = useCallback(() => {
    const authToken = localStorage.getItem('userToken');

    if (user) {
      axios
        .get(`http://localhost:8080/api/available-colors/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setAvailableColors(response.data);
        })
        .catch((error) => console.error('Error fetching available colors:', error));
    }
  }, [user]);

  const addColor = async (newColor: string) => {
    const authToken = localStorage.getItem('userToken');

    if (user) {
      try {
        // Create an AvailableColor object to be sent to the server
        const availableColor = {
          user_id: user.id,
          color_hash: newColor,
        };

        // Send a POST request to add the color to the available colors list
        await axios.post('http://localhost:8080/api/available-colors', availableColor, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Fetch the updated list of available colors after adding the new color
        fetchAvailableColors();
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error purchasing color:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchAvailableColors();
    }
  }, [user, fetchAvailableColors]);

  return (
    <AvailableColorsContext.Provider value={{ availableColors, setAvailableColors, addColor }}>
      {children}
    </AvailableColorsContext.Provider>
  );
};

export default AvailableColorsProvider;
