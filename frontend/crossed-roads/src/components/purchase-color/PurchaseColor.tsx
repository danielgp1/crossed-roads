import { useUserContext } from "../../contexts/UserContext";
import Car from "../car/Car"
import "./PurchaseColor.css"
import def from '../assets/default_pic.png'

interface PurchaseColorProps {
    selectedColor: string;
}

export default function PurchaseColor({ selectedColor }: PurchaseColorProps) {
    const { user } = useUserContext();
    return (
        <div className="purchase-color-grid">
            <div className="car-preview-grid">
                <label className="preview-lbl">Looking Good!</label>
                <Car color={selectedColor} direction={"#f9d71c"} name={user?.first_name || ''} pfp={user?.profile_pic_url || def}/>
            </div>
            <button className='purchase-button'>Pay 2.00 leva</button>
        </div>
    )
}