import './GarageMain.css'
import GarageObject from '../../garage-object/GarageObject'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Friend {
    id: number;
    first_name: string;
    last_name: string;
    profile_name: string;
    current_color: string;
    profile_pic_url: string;
}

export default function GarageMain() {
    const [friends, setFriends] = useState<Friend[] | null>(null);

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
                    const sortedFriends = response.data.sort((a: Friend, b: Friend) => a.first_name.localeCompare(b.first_name));
                    setFriends(sortedFriends);
                })
                .catch((error) => console.error('Error fetching friends:', error));
        }
    }, []);


    return (
        <>
            {
                friends === null ? <div className='garage-no-friends'></div> : (friends as Friend[]).length === 0 ? (
                    <div className='garage-no-friends'>Go Find Some Friends :(</div>
                ) : (
                    <div className='garage-main-grid'>
                        {(friends as Friend[]).map((friend) => (
                            <GarageObject
                                key={friend.id}
                                id={friend.id}
                                first_name={friend.first_name}
                                last_name={friend.last_name}
                                profile_name={friend.profile_name}
                                current_color={friend.current_color}
                                profile_pic_url={friend.profile_pic_url}
                            />
                        ))}
                    </div>
                )}
        </>
    )
}