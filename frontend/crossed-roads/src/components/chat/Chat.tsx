import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatBox from '../chatbox/ChatBox'
import './Chat.css'

interface ChatSummary {
    chat_id: number;
    participant1_id: number;
    participant2_id: number;
    latest_message_content: string;
    latest_message_sender_id: number;
    latest_message_time: string;
  }

export default function Chat() {
    const [chatSummaries, setChatSummaries] = useState<ChatSummary[]>([]);
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        fetchChatSummaries();
    }, []);

    const fetchChatSummaries = () => {
        axios.get(`http://10.16.6.25:8080/api/chats/users/${userID}`, {
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
                {chatSummaries.map((chatSummary, index) => 
                    <ChatBox key={index} friend_id={chatSummary.participant1_id === Number(userID) ? chatSummary.participant2_id : chatSummary.participant1_id} sender_id={chatSummary.latest_message_sender_id} content={chatSummary.latest_message_content}/>
                )}
            </div>
        </div>
    );
}
