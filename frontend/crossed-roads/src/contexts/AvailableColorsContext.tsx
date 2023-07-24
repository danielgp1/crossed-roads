import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

// Define the shape of the available color data
interface AvailableColorData {
  user_id: number;
  color_hash: string;
}

// Define the shape of the context
interface AvailableColorsContextData {
  availableColors: AvailableColorData[];
  setAvailableColors: React.Dispatch<React.SetStateAction<AvailableColorData[]>>;
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

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    const authToken = localStorage.getItem('userToken');

    if (userID && authToken) {
      axios
        .get(`http://localhost:8080/api/available-colors/users/${userID}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setAvailableColors(response.data);
        })
        .catch((error) => console.error('Error fetching available colors:', error));
    }
  }, []);

  return (
    <AvailableColorsContext.Provider value={{ availableColors, setAvailableColors }}>
      {children}
    </AvailableColorsContext.Provider>
  );
};

export default AvailableColorsProvider;
