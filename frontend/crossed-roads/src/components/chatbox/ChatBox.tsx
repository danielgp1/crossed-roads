import './ChatBox.css'
import default_pic from '../assets/default_pic.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface ChatBoxProps {
    friend_id: number;
    sender_id: number,
    content: string;
    is_online: boolean;
}

interface UserData {
    first_name: string;
    last_name: string;
    profile_pic_url: string;
}

export default function ChatBox({ friend_id, sender_id, content, is_online }: ChatBoxProps) {
    const [friend, setFriend] = useState<UserData | null>(null);
    const userID = localStorage.getItem("userID");
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('userToken');
        if (friend_id && authToken) {
            axios
                .get(`http://10.16.6.25:8080/api/users/${friend_id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((response) => {
                    setFriend(response.data);
                })
                .catch((error) => console.error('Error fetching user data:', error));
        }
    }, [content]);

    const handleOpenChat = () => {
        navigate(`/chats/${friend_id}`);
    }

    return (
        <div className='chatbox-grid' onClick={handleOpenChat}>
            <div className='chatbox-status-container'>
                <div className={`chatbox-status ${is_online ? "green" : "red"}`}></div>
            </div>
            <div className='chatbox-pic-container'>
                <img className='chatbox-pic' src={friend?.profile_pic_url ?? default_pic} alt='pic'></img>
            </div>
            <div className='chatbox-content-wrapper'>
                <div className='chatbox-content'>
                    <span className='chatbox-names'>{friend?.first_name} {friend?.last_name}</span>
                    <span className='chatbox-last-msg'>{Number(sender_id) === friend_id ? "them: " : "you: "} {content}</span>
                </div>
            </div>
        </div>
    )
}