import { useParams } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import "./UserProfile.css"
import UserProfileMain from "./main/UserProfileMain"


export default function UserProfile() {
    const { username } = useParams();
    return (
        <div className="user-profile-body">
            <Navbar />
            <UserProfileMain username={username!} />
        </div>
    )
}