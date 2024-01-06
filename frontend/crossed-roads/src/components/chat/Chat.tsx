import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatBox from '../chatbox/ChatBox'
import './Chat.css'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface ChatSummary {
    chat_id: number;
    participant1_id: number;
    participant2_id: number;
    latest_message_content: string;
    latest_message_sender_id: number;
    latest_message_time: string;
    friend_online: boolean;
}

export default function Chat() {
    const [chatSummaries, setChatSummaries] = useState<ChatSummary[]>([]);
    const userID = localStorage.getItem("userID");
    let stompClient: Stomp.Client;

    useEffect(() => {
        fetchChatSummaries();
        setupWebSocketConnection();
        return () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        }
    }, []);

    const setupWebSocketConnection = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe(`/user/${userID}/chat-summary`, (messageOutput) => {
                if (messageOutput.body) {
                    const updatedChatSummaries: ChatSummary[] = JSON.parse(messageOutput.body);
                    setChatSummaries(updatedChatSummaries);
                }
            });
            stompClient.subscribe(`/user/${userID}/friend-online-status`, (messageOutput) => {
                if (messageOutput.body) {
                    const statusMessage = JSON.parse(messageOutput.body);
                    console.log(`Friend online status: ${statusMessage.status}`);
                    setChatSummaries((currentChatSummaries) => {
                        return currentChatSummaries.map((chat) => {
                            const friendID = chat.participant1_id === Number(userID) ? chat.participant2_id : chat.participant1_id;
                            if (friendID === statusMessage.friend_id) {
                                return { ...chat, friend_online: Number(statusMessage.status) === 1 };
                            } else {
                                return chat;
                            }
                        });
                    });
                }
            });
        });
    };

    const fetchChatSummaries = () => {
        axios.get(`http://localhost:8080/api/chats/users/${userID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        })
            .then(response => {
                const sortedChats = response.data.sort((a: ChatSummary, b: ChatSummary) => {
                    const dateA = new Date(a.latest_message_time);
                    const dateB = new Date(b.latest_message_time);
                    return dateB.getTime() - dateA.getTime();
                });
                setChatSummaries(sortedChats);
            })
            .catch(error => {
                console.error('Error getting chats:', error);
            });
    };

    return (
        <div className="chat-body">
            <div className='chat-grid'>
                {chatSummaries.map((chatSummary, index) => {
                    const friendID = chatSummary.participant1_id === Number(userID) ? chatSummary.participant2_id : chatSummary.participant1_id;
                    return (
                        <ChatBox
                            key={index}
                            is_online={chatSummary.friend_online}
                            friend_id={friendID}
                            sender_id={chatSummary.latest_message_sender_id}
                            content={chatSummary.latest_message_content}
                        />
                    );
                })}
            </div>
        </div>
    );
}
