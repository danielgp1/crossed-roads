import { useEffect, useState } from "react";
import "./UserProfileMain.css"
import axios from "axios";
import PageNotFound from "../../page-not-found/PageNotFound";
import ServiceMain from "../../service/main/ServiceMain";
import Car from "../../car/Car";
import default_pic from '../../assets/default_pic.png'

interface UserProfileMainProps {
    username: string;
}

interface User {
    id: number,
    first_name: string,
    last_name: string,
    profile_name: string,
    current_color: string,
    date_of_birth: string,
    profile_pic_url: string,
}

export default function UserProfileMain({ username }: UserProfileMainProps) {
    const [searchResults, setSearchResults] = useState<User[]>([]);
    useEffect(() => {
        const authToken = localStorage.getItem('userToken');
        axios
            .get(`http://localhost:8080/api/users/search?username=${username}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.error('Error performing search:', error);
            });
    }, [username]);


    const firstUser = searchResults.length === 1 ? searchResults[0] : null;
    if (!firstUser) {
        return (
            <PageNotFound />
        )
    }
    if (firstUser.id === Number(localStorage.getItem("userID"))) {
        return (
            <ServiceMain />
        )
    }

    const handleAddFriend = () => {
        alert("Friend added")
    };

    return (
        <div className="user-profile-main">
            <div className="profile-main-info-container">
                <div className='profile-data-2'>
                    <div className='profile-pic-container-2'>
                        <img
                            className='profile-pic-2'
                            alt='profile pic'
                            src={firstUser.profile_pic_url ?? default_pic}
                        />
                    </div>
                    <div className='profile-info'>
                        <span className='names'>{firstUser.first_name} {firstUser.last_name}</span>
                        <div className='info-car'>
                            <div className='other-info'>
                                <div className="profile-field">
                                    <label className='field-label'>Username:</label>
                                    <span className='field-span'>{firstUser.profile_name}</span>
                                </div>
                                <div className="profile-field">
                                    <label className='field-label'>Birthday:</label>
                                    <span className='field-span'>{firstUser.date_of_birth}</span>
                                </div>
                                <button className="add-friend-btn">Cross Roads</button>
                            </div>
                            <div className='car-container'>
                                <Car color={firstUser.current_color} direction={"#f9d71c"} name={firstUser.first_name} pfp={firstUser.profile_pic_url ?? default_pic} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}