import { useEffect, useState } from 'react'
import './UserChatMain.css'
import axios from 'axios';

interface UserChatMainProps {
    friendid: number,
}

interface Friend {
    first_name:string,
    last_name:string,
    profile_pic_url:string
}

export default function UserChatMain({ friendid }: UserChatMainProps) {
    const [friend, setFriend] = useState<Friend>();
    const authToken = localStorage.getItem('userToken')
    const userID = localStorage.getItem("userID");
   
    useEffect(() => {
        const fetchFriend = async() => {
            await axios
                .get(`http://localhost:8080/api/users/${friendid}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((response) => {
                    setFriend(response.data);
                })
                .catch((error) => console.error('Error fetching friend:', error));
        }
        fetchFriend();
    }, []);

    const handleSendMessage = () => {
        axios
        .post(`http://localhost:8080/api/users/${friendid}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(() => {
        })
        .catch((error) => console.error('Error fetching friend:', error));
    }

    return (
        <div className='user-chat-main'>
            <div className='user-chat-container'>
                <div className='user-chat-header '>{friend?.first_name} {friend?.last_name}</div>
                <div className='user-chat-messages'>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                    <div className='user-chat-message left'>left left left left left left left left left left left left left left left left left left </div>
                    <div className='user-chat-message right'>right right right right right right right right right right right right right right right </div>
                </div>
                <div className='user-chat-footer'>
                    <input 
                        className='user-chat-input' 
                        type='text'
                        placeholder='Enter a message...'
                    />
                    <button onClick={handleSendMessage} className='user-chat-btn' type='button'>send</button>
                </div>
            </div>
        </div>
    )
}