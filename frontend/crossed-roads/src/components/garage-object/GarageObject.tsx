import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Car from "../car/Car";
import { faMessage, faRoute, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import './GarageObject.css'
import MapsNavigation from "../navigation/MapsNavigation";
import default_pic from "../assets/default_pic.png"
import { useNavigate } from "react-router-dom";


interface GarageObjectProps {
    first_name: string;
    last_name: string;
    profile_name: string;
    current_color: string;
    profile_pic_url: string;
}


const GarageObject: React.FC<GarageObjectProps> = ({ first_name, last_name, profile_name, current_color, profile_pic_url }:GarageObjectProps) => {

    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = () => {
        setIsNavigationOpen(!isNavigationOpen);
      };

      const handleOpenProfilePage = () => {
        navigate(`/users/${profile_name}`);
      };

    return (
        <div className='garage-object'>
            <div className='garage-header'>
                {first_name} {last_name}
            </div>
            <div className='garage-car-container'>
                <Car color={current_color} direction='#f9d71c' name={first_name} pfp={profile_pic_url ?? default_pic}/>
            </div>
            <div className='garage-object-buttons-container'>
                <button className='garage-object-button' onClick={handleOpenProfilePage}><FontAwesomeIcon icon={faUser} size='2x' color='#333333'/></button>
                <button className='garage-object-button'><FontAwesomeIcon icon={faMessage} size='2x' color='#333333' /></button>
                <button className='garage-object-button' onClick={handleNavigation}><FontAwesomeIcon icon={faRoute} size='2x' color='#333333' /></button>
                <button className='garage-object-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
            </div>
            {isNavigationOpen && <MapsNavigation setIsNavigationOpen={setIsNavigationOpen}/>}
        </div>
    )
}

export default GarageObject