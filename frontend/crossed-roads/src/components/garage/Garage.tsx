import Navbar from "../navbar/Navbar";
import './Garage.css'
import GarageMain from "./main/GarageMain";

export default function Garage() {
    return (
        <div className="garage-body">
            <Navbar />
            <GarageMain />
        </div>
    )
}