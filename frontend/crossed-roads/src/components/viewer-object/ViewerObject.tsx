import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ViewerObject.css'
import default_pic from '../assets/default_pic.png'
import { faUser, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


interface ViewerObjectProps {
    id: number;
    first_name: string;
    last_name: string;
    profile_name: string;
    profile_pic_url: string;
    visited_at: string;
    is_friend: boolean;
}

const ViewerObject: React.FC<ViewerObjectProps> = ({ id, first_name, last_name, profile_name, profile_pic_url, visited_at, is_friend }: ViewerObjectProps) => {
    const [friendshipStatus, setFriendshipStatus] = useState<boolean>(is_friend);
    const navigate = useNavigate();

    const handleOpenProfilePage = () => {
        navigate(`/users/${profile_name}`);
    };

    useEffect(() => {
        setFriendshipStatus(is_friend)
    }, [is_friend])


    const handleAddFriend = () => {
        const authToken = localStorage.getItem('userToken');
        const userID = localStorage.getItem("userID");

        axios.post(
            "http://10.16.6.25:8080/api/friendships",
            {
                user1_id: userID,
                user2_id: id,
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
            .then(() => {
                setFriendshipStatus(true);
            })
            .catch((error) => {
                console.error('Error adding friendship:', error);
            });
    };

    const handleUnfriend = () => {
        const authToken = localStorage.getItem('userToken');
        const userID = localStorage.getItem("userID");

        axios.delete(
            `http://10.16.6.25:8080/api/friendships/users/${userID}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
            .then(() => {
                setFriendshipStatus(false);
            })
            .catch((error) => {
                console.error('Error unfriending:', error);
            });
    };

    const formatDateTime = (dateTimeStr: string) => {
        const date = new Date(dateTimeStr);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + (date.getHours() + 3)).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${day}.${month}.${year} at ${hours}:${minutes}`;
    };

    return (
        <div className='viewer-object'>
            <div className='viewer-header-grid'>
                <div className='viewer-names'>{first_name} {last_name}</div>
                <div className='viewer-time'>{formatDateTime(visited_at)}</div>
            </div>
            <div className='viewer-pic-container'>
                <img className='viewer-profile-pic' src={profile_pic_url ?? default_pic} alt='pfp'></img>
            </div>
            <div className='viewer-object-buttons-container'>
                <button className='viewer-object-button' onClick={handleOpenProfilePage}><FontAwesomeIcon icon={faUser} size='2x' color='#333333' /></button>
                {friendshipStatus ? (
                    <button className='viewer-object-button' onClick={handleUnfriend}>
                        <FontAwesomeIcon icon={faUserMinus} size='2x' color='#333333' />
                    </button>
                ) : (
                    <button className='viewer-object-button' onClick={handleAddFriend}>
                        <FontAwesomeIcon icon={faUserPlus} size='2x' color='#333333' />
                    </button>
                )}
            </div>
        </div>
    )
}

export default ViewerObject;