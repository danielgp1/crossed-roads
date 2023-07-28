import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Car from "../car/Car";
import { faMessage, faRoute, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import './GarageObject.css'
import MapsNavigation from "../navigation/MapsNavigation";
import default_pic from "../assets/default_pic.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";


interface GarageObjectProps {
    id: number;
    first_name: string;
    last_name: string;
    profile_name: string;
    current_color: string;
    profile_pic_url: string;
    longitude: number;
    latitude: number;
}


const GarageObject: React.FC<GarageObjectProps> = ({ id, first_name, last_name, profile_name, current_color, profile_pic_url, longitude, latitude }: GarageObjectProps) => {

    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const [areFriends, setAreFriends] = useState(true);
    const navigate = useNavigate();

    const handleNavigation = () => {
        setIsNavigationOpen(!isNavigationOpen);
    };

    const handleOpenProfilePage = () => {
        navigate(`/users/${profile_name}`);
    };

    const handleUnfriend = () => {
        const authToken = localStorage.getItem('userToken');
        const userID = localStorage.getItem("userID");

        axios.delete(
            `http://localhost:8080/api/friendships/users/${userID}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
            .then(() => {
                setAreFriends(false);
            })
            .catch((error) => {
                console.error('Error unfriending:', error);
            });
    };

    return areFriends ? (
        <div className='garage-object'>
            <div className='garage-header'>
                {first_name} {last_name}
            </div>
            <div className='garage-car-container'>
                <Car color={current_color} direction='#f9d71c' name={first_name} pfp={profile_pic_url ?? default_pic} />
            </div>
            <div className='garage-object-buttons-container'>
                <button className='garage-object-button' onClick={handleOpenProfilePage}><FontAwesomeIcon icon={faUser} size='2x' color='#333333' /></button>
                <button className='garage-object-button'><FontAwesomeIcon icon={faMessage} size='2x' color='#333333' /></button>
                <button className='garage-object-button' onClick={handleNavigation}><FontAwesomeIcon icon={faRoute} size='2x' color='#333333' /></button>
                <button className='garage-object-button' onClick={handleUnfriend}><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
            </div>
            {isNavigationOpen && <MapsNavigation setIsNavigationOpen={setIsNavigationOpen} first_name={first_name} last_name={last_name} longitude={longitude} latitude={latitude}/>}
        </div>
    ) : null;
}

export default GarageObject