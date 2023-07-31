import { useEffect, useState } from 'react'
import './UserChatMain.css'
import axios from 'axios';

interface UserChatMainProps {
    friendid: number,
}

interface Friend {
    first_name: string,
    last_name: string,
    profile_pic_url: string
}

interface Message {
    id: number;
    sender_id: number;
    content: string;
    created_at: string;
}


export default function UserChatMain({ friendid }: UserChatMainProps) {
    const [friend, setFriend] = useState<Friend>();
    const [messages, setMessages] = useState<Message[]>([]);
    const authToken = localStorage.getItem('userToken')
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        const fetchFriend = async () => {
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
        const fetchMessages = async () => {
            if (userID) {
                await axios
                    .get(`http://localhost:8080/api/messages/users/${userID}/${friendid}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    })
                    .then((response) => {
                        const sortedMessages = response.data.sort((a: Message, b: Message) => {
                            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                        });
                        setMessages(sortedMessages);
                    })
                    .catch((error) => console.error('Error fetching messages:', error));
            }
        }
        fetchFriend();
        fetchMessages();
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
                    {messages.map((message, index) =>
                        <div key={index} className={`user-chat-message ${message.sender_id === Number(userID) ? 'left' : 'right'}`}>{message.content}</div>
                    )}
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