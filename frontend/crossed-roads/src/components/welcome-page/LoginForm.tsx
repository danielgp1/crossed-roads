import logo from './assets/logo.png';
import { useFormState, handleLogin, handleLoginVisibility, handleTogglePasswordVisibility } from './FormFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
    const formState = useFormState();
    const navigate = useNavigate();

    const login = async (event: React.FormEvent) => {
        event.preventDefault();
        const loginData = {
            email: formState.loginEmail,
            password: formState.loginPassword,
        };

        await handleLogin(navigate, loginData);
    };

    return (
        <form className="login" onSubmit={login}>
            <label
                className="welcome-label"
                htmlFor="chk"
                aria-hidden="true"
                onClick={() => handleLoginVisibility(formState.setLoginVisibility, formState.isLoginVisible)}
            >
                Login
            </label>
            <div className={`login-box ${formState.isLoginVisible ? 'show' : ''}`}>
                <input
                    className="welcome-input"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => formState.setLoginEmail(e.target.value)}
                    value={formState.loginEmail}
                />
                <div className="password-container">
                    <input
                        className="welcome-input"
                        type="password"
                        id="login_password"
                        placeholder="Password"
                        required
                        onChange={(e) => formState.setLoginPassword(e.target.value)}
                        value={formState.loginPassword}
                    />
                    <FontAwesomeIcon
                        icon={formState.loginPwdEyeClass}
                        onClick={() => handleTogglePasswordVisibility('login_password', formState.setLoginPwdEyeClass)}
                    />
                </div>
                <button type="submit" className="welcome-button">
                    Login
                </button>
                <img src={logo} alt="Logo" />
            </div>
        </form>
    );
}
