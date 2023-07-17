import './PurchaseCar.css'

import { useState } from 'react';
import './PurchaseCar.css';
import Car from '../car/Car';
import ColorPicker from '../color-picker/ColorPicker';

export default function PurchaseCar() {
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    return (
        <div className="color-grid">
            <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            <Car color={selectedColor} />
        </div>
    );
}
