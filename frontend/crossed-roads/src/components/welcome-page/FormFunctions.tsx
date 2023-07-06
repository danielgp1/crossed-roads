import { SetStateAction, useState } from 'react';
import axios from 'axios';
import { IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NavigateFunction } from 'react-router';

export function useFormState() {
  const [regPwdEyeClass, setRegPwdEyeClass] = useState(faEye);
  const [confirmPwdEyeClass, setConfirmPwdEyeClass] = useState(faEye);
  const [loginPwdEyeClass, setLoginPwdEyeClass] = useState(faEye);

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

export function handleRegistration(navigate: NavigateFunction, registrationData: { first_name: string; last_name: string; email: string; date_of_birth: string; password: string}) {
  axios
    .post('http://localhost:8080/api/auth/register', registrationData)
    .then((response) => {
      alert('Welcome to Crossed Roads!');
      
      const token = response.data.token;
      sessionStorage.setItem("userToken", token);
      navigate('/dashboard');
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

export function handleLogin(navigate: NavigateFunction, loginData: { email: string; password: string; }) {
  axios
    .post('http://localhost:8080/api/auth/authenticate', loginData)
    .then((response) => {
      alert(`Welcome back ${loginData.email}!`);

      const token = response.data.token;
      sessionStorage.setItem("userToken", token);
      navigate('/dashboard');
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

export function handleTogglePasswordVisibility(inputId: string, setEyeClass: { (value: SetStateAction<IconDefinition>): void; (value: SetStateAction<IconDefinition>): void; (value: SetStateAction<IconDefinition>): void; (arg0: { (prevClass: any): IconDefinition; (prevClass: any): IconDefinition; (prevClass: any): IconDefinition; }): void; }) {
  if (inputId === 'reg_password') {
    setEyeClass((prevClass) =>
      prevClass === faEye ? faEyeSlash : faEye
    );
  } else if (inputId === 'confirm_password') {
    setEyeClass((prevClass) =>
      prevClass === faEye ? faEyeSlash : faEye
    );
  } else if (inputId === 'login_password') {
    setEyeClass((prevClass) =>
      prevClass === faEye ? faEyeSlash : faEye
    );
  }

  const input = document.getElementById(inputId);
  if(input) {
    const inputType = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', inputType);
  }
 
}

export function handleLoginVisibility(setLoginVisibility: { (value: SetStateAction<boolean>): void; (value: SetStateAction<boolean>): void; (arg0: boolean): void; }, isLoginVisible: boolean) {
  setLoginVisibility(!isLoginVisible);
}