import { useEffect, useRef, useState } from 'react';
import Car from '../car/Car'
import './Profile.css'
import default_pic from '../assets/default_pic.png'
import ChangePassword from '../change-password/ChangePassword';
import axios from 'axios';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChangePassword = () => {
        setIsChangePasswordOpen(!isChangePasswordOpen);
    };

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        const authToken = localStorage.getItem('userToken');
        if (userID) {
            axios.get(`http://localhost:8080/api/users/${userID}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then((response) => setUserData(response.data))
                .catch((error) => console.error('Error fetching user data:', error));
        }
    }, [setUserData]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { first_name, last_name, profile_name, email, date_of_birth } = userData;

    const handleProfilePicClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleImageChange = () => {
        const imageInput = document.querySelector("#image-input") as HTMLInputElement;
        const file = imageInput?.files?.[0];
        if(file) {
            console.log(file);
        }
    }

    return (
        <div className="profile-grid">
            <div className='profile-data'>
                <div className='profile-pic-container'>
                    <img className='profile-pic' alt='profile pic' src={default_pic} onClick={handleProfilePicClick} />
                    <input
                        id='image-input'
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                </div>
                <div className='profile-info'>
                    <span className='names'>{first_name} {last_name}</span>
                    <div className='info-car'>
                        <div className='other-info'>
                            <div className="profile-field">
                                <label className='field-label'>Username:</label>
                                <span className='field-span'>{profile_name}</span>
                            </div>
                            <div className="profile-field">
                                <label className='field-label'>Email:</label>
                                <span className='field-span'>{email}</span>
                            </div>
                            <div className="profile-field">
                                <label className='field-label'>Birthday:</label>
                                <span className='field-span'>{date_of_birth}</span>
                            </div>
                        </div>
                        <div className='car-container'>
                            <Car color={"blue"} direction={"#f9d71c"} name={first_name} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-buttons'>
                <button className='profile-button'>Edit Profile Data</button>
                <button className='profile-button' onClick={handleChangePassword}>Change Password</button>
                <button className='profile-button'>Create a Post</button>
                <button className='profile-button'>Manage Posts</button>
            </div>
            {isChangePasswordOpen && <ChangePassword setIsChangePasswordOpen={setIsChangePasswordOpen} />}
        </div>
    )
}