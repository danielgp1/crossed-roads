import { useEffect, useRef, useState } from 'react'
import './UserChatMain.css'
import axios from 'axios';
import { useUserContext } from '../../../contexts/UserContext';
import def from '../../assets/default_pic.png'

interface UserChatMainProps {
    friendid: number,
}

interface Friend {
    id: number,
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
    const { user } = useUserContext();
    const [friend, setFriend] = useState<Friend>();
    const [chatMessage, setChatMessage] = useState<string>();
    const [messages, setMessages] = useState<Message[]>([]);
    const authToken = localStorage.getItem('userToken')
    const userID = localStorage.getItem("userID");
    const messagesEndRef = useRef<null | HTMLDivElement>(null);


    const fetchMessages = async () => {
        if (userID) {
            await axios
                .get(`http://10.16.6.25:8080/api/messages/users/${userID}/${friendid}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((response) => {
                    const sortedMessages = response.data.sort((a: Message, b: Message) => {
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    });
                    setMessages(sortedMessages);
                })
                .catch((error) => console.error('Error fetching messages:', error));
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); 

    useEffect(() => {
        const fetchFriend = async () => {
            await axios
                .get(`http://10.16.6.25:8080/api/users/${friendid}`, {
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
        fetchMessages();
    }, []);

    const handleSendMessage = () => {
        if (chatMessage?.trim() && chatMessage?.trim() !== '') {
            const messageData = {
                receiver_id: friend?.id,
                sender_id: userID,
                content: chatMessage
            };
            axios
                .post(`http://10.16.6.25:8080/api/messages`, messageData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then(() => {
                    setChatMessage('');
                    fetchMessages();
                })
                .catch((error) => console.error('Error sending message:', error));
        }
    }

    return (
        <div className='user-chat-main'>
            <div className='user-chat-container'>
                <div className='user-chat-header '>{friend?.first_name} {friend?.last_name}</div>
                <div className='user-chat-messages'>
                    <div ref={messagesEndRef}></div>
                    {messages.map((message, index) =>
                        <div key={index} className={`user-chat-message ${message.sender_id === Number(userID) ? 'left' : 'right'}`}>
                            {message.sender_id === Number(userID) && <img className='user-chat-img left' src={user?.profile_pic_url ?? def} alt='you'></img>}
                            <div className={`user-chat-message-content ${message.sender_id === Number(userID) ? 'left' : 'right'}`}>
                                {message.content}
                            </div>
                            {message.sender_id !== Number(userID) && <img className='user-chat-img right' src={friend?.profile_pic_url ?? def} alt='friend'></img>}
                        </div>
                    )}
                </div>
                <div className='user-chat-footer'>
                    <input
                        className='user-chat-input'
                        type='text'
                        placeholder='Enter a message...'
                        value={chatMessage || ''}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevents the addition of a new line in the input when Enter is pressed
                                handleSendMessage();
                            }
                        }}
                    />
                    <button onClick={handleSendMessage} className='user-chat-btn' type='button'>send</button>
                </div>
            </div>
        </div>
    )
}