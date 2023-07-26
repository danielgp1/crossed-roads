import { useRef, useState } from 'react';
import Car from '../car/Car'
import './Profile.css'
import default_pic from '../assets/default_pic.png'
import ChangePassword from '../change-password/ChangePassword';
import { s3 } from '../aws/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, updateProfilePic } = useUserContext();
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleChangePassword = () => {
        setIsChangePasswordOpen(!isChangePasswordOpen);
    };

    const { first_name, last_name, profile_name, email, date_of_birth, profile_pic_url, current_color } = user || {};

    const handleProfilePicClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async () => {
        const imageInput = document.querySelector("#image-input") as HTMLInputElement;
        const file = imageInput?.files?.[0];
        if (file) {
            const imageUrl = await uploadImageToS3(file);
            if (imageUrl) {
                await updateProfilePic(imageUrl);
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
            return imageUrl;

        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleOpenPosts = () => {
        navigate("/posts")
    }

    // const updateUserProfilePicUrl = async (imageUrl: string | null) => {
    //     if (imageUrl) {
    //         setImageURL(imageUrl);
    //         const authToken = localStorage.getItem('userToken');
    //         const userID = localStorage.getItem('userID');
    //         if (authToken && userID) {
    //             try {
    //                 await axios.put(
    //                     `http://localhost:8080/api/users/${userID}`,
    //                     { profile_pic_url: imageUrl },
    //                     {
    //                         headers: {
    //                             Authorization: `Bearer ${authToken}`,
    //                         },
    //                     }
    //                 );
    //                 console.log("Profile picture URL updated successfully");
    //             } catch (error) {
    //                 console.error("Error updating profile picture URL:", error);
    //             }
    //         }
    //     }
    // };


    return (
        <div className="profile-grid">
            <div className='profile-data'>
                <div className='profile-pic-container'>
                    <img
                        className='profile-pic'
                        alt='profile pic'
                        src={profile_pic_url ? profile_pic_url : default_pic}
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
                                <span className='field-span'>{date_of_birth ? new Date(date_of_birth).toLocaleDateString() : ''}</span>
                            </div>
                        </div>
                        <div className='car-container'>
                            <Car color={current_color!} direction={"#f9d71c"} name={first_name!} pfp={profile_pic_url ?? default_pic}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-buttons'>
                <button className='profile-button'>Edit Profile Data</button>
                <button className='profile-button' onClick={handleChangePassword}>Change Password</button>
                <button className='profile-button'>Create a Post</button>
                <button className='profile-button' onClick={handleOpenPosts}>Manage Posts</button>
            </div>
            {isChangePasswordOpen && <ChangePassword setIsChangePasswordOpen={setIsChangePasswordOpen} />}
        </div>
    )
}