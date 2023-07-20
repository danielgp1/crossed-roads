import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Car from "../car/Car";
import { faMessage, faRoute, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import './GarageObject.css'
import MapsNavigation from "../navigation/MapsNavigation";

export default function GarageObject() {

    const [isNavigationOpen, setIsNavigationOpen] = useState(false);

    const handleNavigation = () => {
        setIsNavigationOpen(!isNavigationOpen);
      };

    return (
        <div className='garage-object'>
            <div className='garage-header'>
                John Cena
            </div>
            <div className='garage-car-container'>
                <Car color='blue' direction='yellow' name=''/>
            </div>
            <div className='garage-object-buttons-container'>
                <button className='garage-object-button'><FontAwesomeIcon icon={faUser} size='2x' color='#333333' /></button>
                <button className='garage-object-button'><FontAwesomeIcon icon={faMessage} size='2x' color='#333333' /></button>
                <button className='garage-object-button' onClick={handleNavigation}><FontAwesomeIcon icon={faRoute} size='2x' color='#333333' /></button>
                <button className='garage-object-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
            </div>
            {isNavigationOpen && <MapsNavigation setIsNavigationOpen={setIsNavigationOpen}/>}
        </div>
    )
}