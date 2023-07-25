import './GarageMain.css'
import GarageObject from '../../garage-object/GarageObject'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Friend {
    id: number;
    first_name: string;
    last_name: string;
    current_color: string;
    profile_pic_url: string;
}

export default function GarageMain() {
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID) {
            axios
                .get(`http://localhost:8080/api/friendships/users/${userID}/friends`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    },
                })
                .then((response) => {
                    setFriends(response.data);
                })
                .catch((error) => console.error('Error fetching friends:', error));
        }
    }, []);


    return (
        <div className='garage-main-grid'>
            {friends.map((friend) => (
                <GarageObject
                    key={friend.id}
                    first_name={friend.first_name}
                    last_name={friend.last_name}
                    current_color={friend.current_color}
                    profile_pic_url={friend.profile_pic_url}
                />
            ))}
        </div>
    )
}