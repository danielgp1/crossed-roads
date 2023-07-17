import { useState } from 'react';


import Car from '../car/Car'
import './Profile.css'
import pic from './assets/john.jpeg'

export default function Profile() {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const handleOpenChangePassword = () => {
        setIsChangePasswordOpen(true);
    };

    const handleCloseChangePassword = () => {
        setIsChangePasswordOpen(false);
    };

    return (
        <div className="profile-grid">
            <div className='profile-data'>
                <div className='profile-pic-container'>
                    <img className='profile-pic' alt='profile pic' src={pic} ></img>
                </div>
                <div className='profile-info'>
                    <span className='names'>John Cena</span> 
                    <div className='info-car'>
                        <div className='other-info'>
                            <div className="profile-field">
                                <label className='field-label'>Username:</label>
                                <span className='field-span'>johncena#1234</span>
                            </div>
                            <div className="profile-field">
                                <label className='field-label'>Email:</label>
                                <span className='field-span'>john@mail.com</span>
                            </div>
                            <div className="profile-field">
                                <label className='field-label'>Birthday:</label>
                                <span className='field-span'>1969-01-20</span>
                            </div>
                        </div>
                        <div className='car-container'>
                            <Car color={"blue"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-buttons'>
                <button className='profile-button'>Edit Profile Data</button>
                <button className='profile-button' onClick={handleOpenChangePassword}>Change Password</button>
                <button className='profile-button'>Create a Post</button>
                <button className='profile-button'>Manage Posts</button>
            </div>
            {isChangePasswordOpen && (
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
            )}
        </div>
    )
}