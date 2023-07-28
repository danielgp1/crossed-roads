import React from 'react';
import { handleLoginVisibility, handleTogglePasswordVisibility } from './WelcomeFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

export function RegisterForm(
    {formState}: { formState: any}
) {
    const { handleUserRegistration } = useUserContext(); // Use the handleUserLogin function from the context
    const navigate = useNavigate();

    const registration = async (event: React.FormEvent) => {
        event.preventDefault();
        const registrationData = {
            first_name: formState.firstName,
            last_name: formState.lastName,
            email: formState.email,
            password: formState.password,
            date_of_birth: formState.birthdate,
        };

        await handleUserRegistration(navigate, registrationData);
    };

    return (
        <form className="register" onSubmit={registration}>
            <label
                className="welcome-label"
                htmlFor="chk"
                aria-hidden="true"
                onClick={() => handleLoginVisibility(formState.setLoginVisibility, formState.isLoginVisible)}
            >
                Register
            </label>
            <div className={`register-box ${formState.isLoginVisible ? '' : 'show'}`}>
                <input
                    className="welcome-input"
                    type="text"
                    placeholder="First Name"
                    required
                    title="Please enter your first name"
                    onChange={(e) => formState.setFirstName(e.target.value)}
                    value={formState.firstName}
                />
                <input
                    className="welcome-input"
                    type="text"
                    placeholder="Last Name"
                    required
                    title="Please enter your last name"
                    onChange={(e) => formState.setLastName(e.target.value)}
                    value={formState.lastName}
                />
                <input
                    className="welcome-input"
                    type="email"
                    placeholder="Email"
                    required
                    pattern="([a-z0-9]+\.)*[a-z0-9]+@([a-z0-9]+\.)+[a-z0-9]+"
                    title="Enter a valid e-mail address"
                    onChange={(e) => formState.setEmail(e.target.value)}
                    value={formState.email}
                />
                <input
                    className='welcome-input'
                    type="date"
                    placeholder="Birthdate"
                    required
                    title='Enter your birthdate'
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => formState.setBirthdate(e.target.value)}
                    value={formState.birthdate}
                />
                <div className="password-container">
                    <input
                        className='welcome-input'
                        type="password"
                        id="reg_password"
                        placeholder="Password"
                        required
                        pattern='[A-Za-z0-9@#$%^&+=_]{8,}'
                        title='Password must be at least 8 characters long'
                        onChange={(e) => formState.setPassword(e.target.value)}
                        value={formState.password}
                    />
                    <FontAwesomeIcon
                        icon={formState.regPwdEyeClass}
                        onClick={() => handleTogglePasswordVisibility('reg_password', formState.setRegPwdEyeClass)}
                    />
                </div>
                <div className="password-container">
                    <input
                        className='welcome-input'
                        type="password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        required
                        title="Passwords don't match"
                        pattern={formState.password}
                        onChange={(e) => formState.setConfirmPassword(e.target.value)}
                        value={formState.confirmPassword}
                    />
                    <FontAwesomeIcon
                        icon={formState.confirmPwdEyeClass}
                        onClick={() => handleTogglePasswordVisibility('confirm_password', formState.setConfirmPwdEyeClass)}
                    />
                </div>
                <button
                    type="submit"
                    className='welcome-button'
                >
                    Register
                </button>
            </div>
        </form>
    );
}
