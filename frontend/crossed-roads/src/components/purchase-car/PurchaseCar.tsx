import './PurchaseCar.css'

import { useState } from 'react';
import './PurchaseCar.css';
import ColorPicker from '../color-picker/ColorPicker';
import PurchaseColor from '../purchase-color/PurchaseColor';

export default function PurchaseCar() {
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    return (
        <div className="color-grid">
            <ColorPicker setSelectedColor={setSelectedColor} />
            <PurchaseColor selectedColor={selectedColor} />
        </div>
    );
}
