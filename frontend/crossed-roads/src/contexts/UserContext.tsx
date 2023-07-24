// UserContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { handleLogin, handleRegistration } from '../components/welcome-page/WelcomeFunctions'; 
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Define the shape of the user data
interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  profile_name: string;
  date_of_birth: Date;
  email: string;
  profile_pic_url: string;
  current_color: string
}

// Define the shape of the context
interface UserContextData {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  updateProfilePic: (newProfilePic: string) => Promise<void>;
  updateCurrentColor: (newColor: string) => Promise<void>;
  handleUserLogin: (navigate:NavigateFunction, loginData: { email: string; password: string }) => Promise<void>; // Add handleUserLogin function
  handleUserRegistration: (navigate:NavigateFunction, registerData: { first_name: string; last_name: string; email: string; date_of_birth: string; password: string,}) => Promise<void>;
}

// Create the context
const UserContext = createContext<UserContextData | undefined>(undefined);

// Create a custom hook to use the context easily
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Create the UserProvider component
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    const authToken = localStorage.getItem('userToken');
    if (userID && authToken) {
      axios
        .get(`http://localhost:8080/api/users/${userID}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);


  const handleUserLogin = async (navigate:NavigateFunction, loginData: { email: string; password: string }) => {
    try {
      await handleLogin(navigate, loginData); // Pass navigate as a parameter to handleLogin
      const userID = localStorage.getItem('userID');
      const authToken = localStorage.getItem('userToken');
      const response = await axios
        .get(`http://localhost:8080/api/users/${userID}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
      setUser(response.data); // Update user context with the received user data
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleUserRegistration = async (navigate:NavigateFunction, registerData: { first_name: string; last_name: string; email: string; date_of_birth: string; password: string,}) => {
    try {
      await handleRegistration(navigate, registerData); // Pass navigate as a parameter to handleLogin
      const userID = localStorage.getItem('userID');
      const authToken = localStorage.getItem('userToken');
      const response = await axios
        .get(`http://localhost:8080/api/users/${userID}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
      setUser(response.data); // Update user context with the received user data
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const updateProfilePic = async (newProfilePic: string) => {
    try {
      const authToken = localStorage.getItem('userToken');

      if (user && authToken) {
        const updatedUserData = { ...user, profile_pic_url: newProfilePic };

        await axios.put(`http://localhost:8080/api/users/${user.id}`, updatedUserData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setUser(updatedUserData);
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const updateCurrentColor = async (newColor: string) => {
    try {
      const authToken = localStorage.getItem('userToken');

      if (user && authToken) {
        const updatedUserData = { ...user, current_color: newColor };

        await axios.put(`http://localhost:8080/api/users/${user.id}`, updatedUserData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setUser(updatedUserData);
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateProfilePic, updateCurrentColor,  handleUserLogin, handleUserRegistration }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
