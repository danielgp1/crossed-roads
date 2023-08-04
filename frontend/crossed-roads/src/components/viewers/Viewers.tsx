import { useEffect, useState } from 'react';
import ViewerObject from '../viewer-object/ViewerObject'
import './Viewers.css'
import axios from 'axios';

interface Visitor {
    id: number;
    first_name: string;
    last_name: string;
    profile_name: string;
    current_color: string;
    profile_pic_url: string;
    visited_at: string;
}

export default function Viewers() {
    const [visitors, setVisitors] = useState<Visitor[] | null>(null);
    const [friendships, setFriendships] = useState<{ [userId: number]: boolean }>({});

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID) {
            axios
                .get(`http://10.16.6.25:8080/api/users/${userID}/visitors`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    },
                })
                .then((response) => {
                    const sortedVisitors = response.data.sort((a: Visitor, b: Visitor) => {
                        const dateA = new Date(a.visited_at);
                        const dateB = new Date(b.visited_at);
                        return dateB.getTime() - dateA.getTime();
                    });
                    setVisitors(sortedVisitors);
                    const authToken = localStorage.getItem('userToken');
                    const friendshipPromises = sortedVisitors.map((visitor: Visitor) =>
                        axios.get(`http://10.16.6.25:8080/api/friendships/users/${userID}/friends/${visitor.id}`, {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        })
                    );

                    Promise.all(friendshipPromises)
                        .then((responses) => {
                            const newFriendships: { [userId: number]: boolean } = {};
                            responses.forEach((response, index) => {
                                const visitorId = sortedVisitors[index].id;
                                newFriendships[visitorId] = response.data;
                            });
                            setFriendships(newFriendships);
                        })
                        .catch((error) => console.error('Error checking friendship status:', error));
                })
                .catch((error) => console.error('Error fetching friends:', error));
        }
    }, []);

    return (
        <div className='viewers-grid'>
            <div className='viewers-header'>Travellers Who Stopped By</div>
            {
                visitors === null ? <div className='viewers-no-viewers'></div> : (visitors as Visitor[]).length === 0 ? (
                    <div className='viewers-no-viewers'>There Is No One :(</div>
                ) : (
                    <div className='viewers-container'>
                        {(visitors as Visitor[]).map((visitor) => (
                            <ViewerObject
                                key={visitor.id}
                                id={visitor.id}
                                first_name={visitor.first_name}
                                last_name={visitor.last_name}
                                profile_name={visitor.profile_name}
                                profile_pic_url={visitor.profile_pic_url}
                                visited_at={visitor.visited_at}
                                is_friend={friendships[visitor.id] ?? false}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    )

}
