import './ChangePassword.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { handleTogglePasswordVisibility } from '../welcome-page/WelcomeFunctions';
import { useState } from 'react';

interface ChangePasswordProps {
    setIsChangePasswordOpen: (isChangePasswordOpen: boolean) => void;
}

export default function ChangePassword({ setIsChangePasswordOpen }: ChangePasswordProps) {

    const [currentPwdEyeClass, setCurrentPwdEyeClass] = useState<IconDefinition>(faEye);
    const [newPwdEyeClass, setNewPwdEyeClass] = useState<IconDefinition>(faEye);
    const [confirmNewPwdEyeClass, setConfirmNewPwdEyeClass] = useState<IconDefinition>(faEye);

    const handleCloseChangePassword = () => {
        setIsChangePasswordOpen(false);
    };

    return (
        <div className="change-password-form-overlay">
            <form className="change-password-form-container">
                <button
                    className="close-button"
                    onClick={handleCloseChangePassword}
                >
                    Close
                </button>
                <label className="pass-lbl">Change Password</label>
                <div className='password-container'>
                    <input
                        className='change-input'
                        type="password"
                        id="current-password"
                        name="current-password"
                        placeholder='Current Password'
                    />
                    <FontAwesomeIcon
                        className='icon'
                        icon={currentPwdEyeClass}
                        onClick={() => handleTogglePasswordVisibility('current-password', setCurrentPwdEyeClass)}
                    />
                </div>
                <div className='password-container'>

                    <input
                        className='change-input'
                        type="password"
                        id="new-password"
                        name="new-password"
                        placeholder='New Password'
                    />
                    <FontAwesomeIcon
                        className='icon'
                        icon={newPwdEyeClass}
                        onClick={() => handleTogglePasswordVisibility('new-password', setNewPwdEyeClass)}
                    />
                </div>
                <div className='password-container'>
                    <input
                        className='change-input'
                        type="password"
                        id="confirm-new-password"
                        name="confirm-new-password"
                        placeholder='Confirm New Password'
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