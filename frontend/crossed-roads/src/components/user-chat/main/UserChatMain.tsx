import { useEffect, useRef, useState } from 'react'
import './UserChatMain.css'
import axios from 'axios';
import { useUserContext } from '../../../contexts/UserContext';
import def from '../../assets/default_pic.png'
import SockJS from "sockjs-client";
import Stomp from "stompjs";

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
    sender_id:number,
    receiver_id: number,
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
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);


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
        let subscription: Stomp.Subscription | null = null;
    
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
    
        if (socket) {
            socket.close();
          }
        
          if (stompClient) {
            stompClient.disconnect(() => {
              console.log('Disconnected');
            });
          }
        
          const socketInstance: WebSocket = new SockJS('http://10.16.6.25:8080/ws')
          const stompInstance: Stomp.Client = Stomp.over(socketInstance)
        
          stompInstance.connect(
            {},
            (frame) => {
              subscription = stompInstance.subscribe(`/user/${userID}/private`, (message) => {
                const newMessage: Message = JSON.parse(message.body)
                if (newMessage.sender_id === friendid || newMessage.receiver_id === friendid) {
                    setMessages((prevMessages) => [newMessage,...prevMessages ]);
                }
              })
              setStompClient(stompInstance);
            },
            (error) => console.error('Stomp error:', error)
          )
        
          setSocket(socketInstance);
    
    
        fetchFriend();
        fetchMessages();
        return () => {
            if (stompClient) {
              stompClient.disconnect(() => {
                console.log('Disconnected');
              });
            }
        
            if (subscription) {
              subscription.unsubscribe();
              console.log('Unsubscribed');
            }
        
            if (socket) {
              socket.close();
            }
          };
    
    }, []);
    


    const handleSendMessage = () => {
        if (chatMessage?.trim() && chatMessage?.trim() !== '' && stompClient) {
            const messageData = {
                sender_id: parseInt(userID!),
                receiver_id: friend?.id,
                content: chatMessage
            }
    
            stompClient.send(
                '/app/private-message',
                {},
                JSON.stringify(messageData)
            )
            
            setChatMessage('')
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
                                e.preventDefault();
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