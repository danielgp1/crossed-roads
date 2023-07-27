import { useUserContext } from "../../../contexts/UserContext";
import Car from "../../car/Car"
import './Road.css'
import def from '../../assets/default_pic.png'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FriendSuggestion {
    first_name: string,
    profile_name: string,
    current_color: string,
    profile_pic_url: string,
}

export default function Road() {
    const { user } = useUserContext();

    const [friendsOfFriendsNotFriends, setFriendsOfFriendsNotFriends] = useState<FriendSuggestion[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriendsNotFriends = async () => {
            const authToken = localStorage.getItem('userToken');
            const userID = localStorage.getItem("userID");

            await axios
                .get(`http://localhost:8080/api/users/${userID}/friends-friends-not-friends`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then(async (response) => {
                    setFriendsOfFriendsNotFriends(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching freinds of friends:', error);
                });
        }
        fetchFriendsNotFriends();
    }, []);

    const handleOpenProfile = (profile_name:string) => {
        navigate(`/users/${profile_name}`);
    };

    return (
        <div className="road">
            <div className="grid-item">
                <div className="your-car">
                    <Car color={user?.current_color!} direction="#f9d71c" name={user?.first_name!} pfp={user?.profile_pic_url ?? def}/>
                </div>
            </div>
            <div className="grid-item">
                <div className="line-separator"></div>
            </div>
            <div className="grid-item">
                <div className="oncoming-traffic">
                {friendsOfFriendsNotFriends.map((friendSuggestion, index) => (
                        <div className="person" onClick={() => handleOpenProfile(friendSuggestion.profile_name)} key={index}>
                            <Car color={friendSuggestion.current_color} direction="red" name={friendSuggestion.first_name} pfp={friendSuggestion.profile_pic_url ?? def} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}