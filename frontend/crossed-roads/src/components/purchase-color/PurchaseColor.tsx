import { useUserContext } from "../../contexts/UserContext";
import Car from "../car/Car"
import "./PurchaseColor.css"
import def from '../assets/default_pic.png'
import { useAvailableColorsContext } from "../../contexts/AvailableColorsContext";
import { useNavigate } from "react-router-dom";
import Stripe from "../stripe/Stripe";
import { useState } from "react";

interface PurchaseColorProps {
  selectedColor: string;
}

export default function PurchaseColor({ selectedColor }: PurchaseColorProps) {
  const { user } = useUserContext();
  const { addColor, availableColors } = useAvailableColorsContext();
  const [showStripe, setShowStripe] = useState(false);
  const navigate = useNavigate();

  const handlePurchaseColor = async () => {
    try {
      if (user) {
        const isColorAvailable = availableColors.some(
          (color) => color.user_id.toString() === user.id.toString() && color.color_hash === selectedColor
        );

        if (isColorAvailable) {
          alert("You already have this color!");
        } else {
          setShowStripe(true);
        }
      }
    } catch (error) {
      console.error('Error purchasing color:', error);
    }
  };

  return (
    <div className="purchase-color-grid">
      <div className="car-preview-grid">
        <label className="preview-lbl">Looking Good!</label>
        <Car color={selectedColor} direction={"#f9d71c"} name={user?.first_name || ''} pfp={user?.profile_pic_url || def} />
      </div>
      <button className='purchase-button' onClick={handlePurchaseColor}>Pay 5.00 BGN</button>
      {showStripe &&  <Stripe selectedColor={selectedColor}/>}
    </div>
  )
}