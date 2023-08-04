import './ChangePassword.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faEye } from '@fortawesome/free-solid-svg-icons';
import { handleTogglePasswordVisibility } from '../welcome-page/WelcomeFunctions';
import { useState } from 'react';

interface ChangePasswordProps {
    setIsChangePasswordOpen: (isChangePasswordOpen: boolean) => void;
}

export default function ChangePassword({ setIsChangePasswordOpen }: ChangePasswordProps) {

    const [currentPwdEyeClass, setCurrentPwdEyeClass] = useState<IconDefinition>(faEye);
    const [newPwdEyeClass, setNewPwdEyeClass] = useState<IconDefinition>(faEye);
    const [confirmNewPwdEyeClass, setConfirmNewPwdEyeClass] = useState<IconDefinition>(faEye);

    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmNewPwd, setConfirmNewPwd] = useState('');


    const handleCloseChangePassword = () => {
        setIsChangePasswordOpen(false);
    };

    const changePass = (event: React.FormEvent) => {
        event.preventDefault();
        handleCloseChangePassword();
    }


    return (
        <div className="change-password-form-overlay">
            <form className="change-password-form-container" onSubmit={changePass}>
                <button
                    className="close-button"
                    onClick={handleCloseChangePassword}
                >
                    Close
                </button>
                <label className="pass-lbl">Change Password</label>
                <div className='change-password-container'>
                    <input
                        className='change-input'
                        type="password"
                        id="current-password"
                        name="current-password"
                        placeholder='Current Password'
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        value={currentPwd}
                        required
                    />
                    <FontAwesomeIcon
                        className='icon'
                        icon={currentPwdEyeClass}
                        onClick={() => handleTogglePasswordVisibility('current-password', setCurrentPwdEyeClass)}
                    />
                </div>
                <div className='change-password-container'>
                    <input
                        className='change-input'
                        type="password"
                        id="new-password"
                        name="new-password"
                        placeholder='New Password'
                        pattern='[A-Za-z0-9@#$%^&+=_]{8,}'
                        title='Password must be at least 8 characters long'
                        onChange={(e) => setNewPwd(e.target.value)}
                        value={newPwd}
                        required
                    />
                    <FontAwesomeIcon
                        className='icon'
                        icon={newPwdEyeClass}
                        onClick={() => handleTogglePasswordVisibility('new-password', setNewPwdEyeClass)}
                    />
                </div>
                <div className='change-password-container'>
                    <input
                        className='change-input'
                        type="password"
                        id="confirm-new-password"
                        name="confirm-new-password"
                        placeholder='Confirm New Password'
                        pattern={newPwd}
                        title="Passwords don't match"
                        onChange={(e) => setConfirmNewPwd(e.target.value)}
                        value={confirmNewPwd}
                        required
                    />
                    <FontAwesomeIcon
                        className='icon'
                        icon={confirmNewPwdEyeClass}
                        onClick={() => handleTogglePasswordVisibility('confirm-new-password', setConfirmNewPwdEyeClass)}
                    />
                </div>

                <button
                    className='change-button'
                    type="submit"
                >
                    Change Password
                </button>
            </form>
        </div>
    )
}