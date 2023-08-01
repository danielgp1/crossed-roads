import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';

interface AvailableColorData {
  user_id: number;
  color_hash: string;
}

interface AvailableColorsContextData {
  availableColors: AvailableColorData[];
  setAvailableColors: React.Dispatch<React.SetStateAction<AvailableColorData[]>>;
  addColor: (newColor: string) => Promise<void>;
}

const AvailableColorsContext = createContext<AvailableColorsContextData | undefined>(undefined);

export const useAvailableColorsContext = () => {
  const context = useContext(AvailableColorsContext);
  if (!context) {
    throw new Error('useAvailableColorsContext must be used within an AvailableColorsProvider');
  }
  return context;
};

const AvailableColorsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [availableColors, setAvailableColors] = useState<AvailableColorData[]>([]);
  const { user } = useUserContext();

  const fetchAvailableColors = useCallback(() => {
    const authToken = localStorage.getItem('userToken');

    if (user) {
      axios
        .get(`http://10.16.6.25:8080/api/available-colors/users/${user.id}`, {
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
        const availableColor = {
          user_id: user.id,
          color_hash: newColor,
        };

        await axios.post('http://10.16.6.25:8080/api/available-colors', availableColor, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        fetchAvailableColors();
      } catch (error) {
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
