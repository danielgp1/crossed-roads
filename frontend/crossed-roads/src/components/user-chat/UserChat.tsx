import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar"
import "./UserChat.css"
import UserChatMain from "./main/UserChatMain";

export default function UserChat() {
    const { friendid } = useParams();
    return (
        <div className="user-chat-body">
        <Navbar />
        <UserChatMain friendid={parseInt(friendid!)} />
    </div>
    )
}