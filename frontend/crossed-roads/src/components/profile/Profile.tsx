import { useEffect, useRef, useState } from 'react';
import Car from '../car/Car'
import './Profile.css'
import default_pic from '../assets/default_pic.png'
import ChangePassword from '../change-password/ChangePassword';
import axios from 'axios';
import { s3 } from '../aws/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);

    const handleChangePassword = () => {
        setIsChangePasswordOpen(!isChangePasswordOpen);
    };

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        const authToken = localStorage.getItem('userToken');
        if (userID && authToken) {
            axios.get(`http://localhost:8080/api/users/${userID}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then((response) => {
                    setUserData(response.data);
                    setImageURL(response.data.profile_pic_url);
                })
                .catch((error) => console.error('Error fetching user data:', error));
        }
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { first_name, last_name, profile_name, email, date_of_birth } = userData;

    const handleProfilePicClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async () => {
        const imageInput = document.querySelector("#image-input") as HTMLInputElement;
        const file = imageInput?.files?.[0];
        if (file) {
            const imageUrl = await uploadImageToS3(file);
            if (imageUrl) {
                updateUserProfilePicUrl(imageUrl);
            }
        }
    }

    const uploadImageToS3 = async (file: File) => {
        try {
            const bucketName = process.env.REACT_APP_BUCKET_NAME;
            const key = `images/${file.name}`;

            const params = {
                Bucket: bucketName,
                Key: key,
                Body: file,
            };

            const data = await s3.send(new PutObjectCommand(params));
            console.log("Image uploaded successfully:", data);

            const imageUrl = `https://${process.env.REACT_APP_BUCKET_NAME}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/${key}`;
            setImageURL(imageUrl);
            return imageUrl;

        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const updateUserProfilePicUrl = async (imageUrl: string | null) => {
        if (imageUrl) {
            const authToken = localStorage.getItem('userToken');
            const userID = localStorage.getItem('userID');
            if (authToken && userID) {
                try {
                    await axios.put(
                        `http://localhost:8080/api/users/${userID}`,
                        { profile_pic_url: imageUrl },
                        {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        }
                    );
                    console.log("Profile picture URL updated successfully");
                } catch (error) {
                    console.error("Error updating profile picture URL:", error);
                }
            }
        }
    };


    return (
        <div className="profile-grid">
            <div className='profile-data'>
                <div className='profile-pic-container'>
                    <img
                        className='profile-pic'
                        alt='profile pic'
                        src={imageURL ? imageURL : default_pic}
                        onClick={handleProfilePicClick} />
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