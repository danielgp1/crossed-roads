import './ChangePassword.css'

interface ChangePasswordProps {
    setIsChangePasswordOpen: (isChangePasswordOpen: boolean) => void;
}

export default function ChangePassword({ setIsChangePasswordOpen }: ChangePasswordProps) {

    const handleCloseChangePassword = () => {
        setIsChangePasswordOpen(false);
    };

    return (
        <div className="change-password-form-overlay">
            <div className="change-password-form-container">
                <button className="close-button" onClick={handleCloseChangePassword}>
                    X
                </button>
                <form className="change-password-form">
                    <div className="form-field">
                        <label htmlFor="current-password">Current Password:</label>
                        <input type="password" id="current-password" name="current-password" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="new-password">New Password:</label>
                        <input type="password" id="new-password" name="new-password" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="confirm-new-password">Confirm New Password:</label>
                        <input type="password" id="confirm-new-password" name="confirm-new-password" />
                    </div>
                    <button type="submit">Change Password</button>
                </form>
            </div>
        </div>
    )
}