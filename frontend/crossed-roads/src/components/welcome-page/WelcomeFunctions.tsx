import { SetStateAction, useState } from 'react';
import axios from 'axios';
import { IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NavigateFunction } from 'react-router';

export function useFormState() {
  const [regPwdEyeClass, setRegPwdEyeClass] = useState<IconDefinition>(faEye);
  const [confirmPwdEyeClass, setConfirmPwdEyeClass] = useState<IconDefinition>(faEye);
  const [loginPwdEyeClass, setLoginPwdEyeClass] = useState<IconDefinition>(faEye);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [isLoginVisible, setLoginVisibility] = useState(false);

  return {
    regPwdEyeClass,
    setRegPwdEyeClass,
    confirmPwdEyeClass,
    setConfirmPwdEyeClass,
    loginPwdEyeClass,
    setLoginPwdEyeClass,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    birthdate,
    setBirthdate,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    isLoginVisible,
    setLoginVisibility
  };
}

export async function handleRegistration(navigate: NavigateFunction, registrationData: {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  password: string;
}) {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/register', registrationData);
    alert('Welcome to Crossed Roads!');
    const token = response.data.token;
    const id = response.data.id;
    localStorage.setItem("userToken", token);
    localStorage.setItem("userID", id);
    navigate('/');
  } catch (error: any) {
    alert(error.response.data.message);
  }
}

export async function handleLogin(navigate: NavigateFunction, loginData: { email: string; password: string; }) {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/authenticate', loginData);
    const token = response.data.token;
    const id = response.data.id;
    localStorage.setItem("userToken", token);
    localStorage.setItem("userID", id);
    navigate('/');
  } catch (error: any) {
    alert(error.response.data.message);
  }
}

export function handleTogglePasswordVisibility(inputId: string, setEyeClass: (value: SetStateAction<IconDefinition>) => void) {
  setEyeClass((prevClass) =>
    prevClass === faEye ? faEyeSlash : faEye
  );
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (input) {
    const inputType = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', inputType);
  }
}

export function handleLoginVisibility(setLoginVisibility: (value: SetStateAction<boolean>) => void, isLoginVisible: boolean) {
  setLoginVisibility(!isLoginVisible);
}
