import Car from "../car/Car"
import "./PurchaseColor.css"

interface PurchaseColorProps {
    selectedColor: string;
}

export default function PurchaseColor({ selectedColor }: PurchaseColorProps) {
    return (
        <div className="purchase-color-grid">
            <div className="car-preview-grid">
                <label className="preview-lbl">Looking Good!</label>
                <Car color={selectedColor} />
            </div>
            <button className='purchase-button'>Pay 2.00 leva</button>
        </div>
    )
}