import Navbar from "../navbar/Navbar";
import './Service.css'
import ServiceMain from "./main/ServiceMain";

export default function Service() {
    return (
        <div className="service-body">
            <Navbar />
            <ServiceMain />
        </div>
    )
}