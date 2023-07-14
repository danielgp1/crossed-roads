import { useEffect, useState } from 'react';
import './ColorPicker.css';
import Car from '../car/Car';

export default function ColorPicker() {
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');

    function setHashSymbol() {
        const colorInput = document.querySelector<HTMLInputElement>('#color-input');
        if(colorInput)
        if (colorInput.value.length === 0) {
            colorInput.value = "#";
        }
       
    }

    useEffect(() => {
        const colorList = [
            'FF0000',
            'FF3300',
            'FF6600',
            'FF8000',
            'FF9933',
            'FFB84D',
            'FFCC66',
            'FFDF80',

            'FFFF00',
            'FFFF33',
            'FFFF66',
            'FFFF80',
            'FFFF99',
            'FFFFB2',
            'FFFFCC',
            'FFFFE5',

            '008000',
            '00A600',
            '00C319',
            '00E634',
            '1AFF4D',
            '3BFF66',
            '5CFF80',
            '7DFF99',

            '0000FF',
            '0033CC',
            '0055B3',
            '007799',
            '009980',
            '00B3B3',
            '00CCCC',
            '00E6E6',

            '800080',
            '993399',
            'AD5CA0',
            'C561C5',
            'D46FD4',
            'E57EE5',
            'F595F5',
            'FFA8FF',

            '8B4513',
            '8B5A2B',
            '9E6F44',
            'A0522D',
            'D2691E',
            'CD853F',
            'B28C51',
            'C2A768',

            '808080',
            'A9A9A9',
            'C0C0C0',
            'D3D3D3',
            'E8E8E8',
            'F5F5F5',
            'FAFAFA',
            'FFFFFF',

            '000000',
            '111111',
            '222222',
            '333333',
            '444444',
            '555555',
            '666666',
            '777777',
        ];

        const palette = document.querySelector<HTMLDivElement>('#color-palette');
        const colorInput = document.querySelector<HTMLInputElement>('#color-input');

        if (palette && colorInput) {
            palette.innerHTML = '';
            colorList.forEach((color) => {
                const li = document.createElement('li');
                li.className = 'color-item';
                li.dataset.hex = `#${color}`;
                li.style.backgroundColor = `#${color}`;
                palette.appendChild(li);
            });

            const colorItems = palette.querySelectorAll<HTMLElement>('li');
            colorItems.forEach((item) => {
                item.addEventListener('click', () => {
                    const codeHex = item.dataset.hex;
                    if (codeHex) {
                        setSelectedColor(codeHex);
                        colorInput.value = codeHex;
                    }
                });
            });

            colorInput.addEventListener('input', (event) => {
                const codeHex = (event.target as HTMLInputElement).value;
                setSelectedColor(codeHex);
            });
        }
    }, []);

    return (
        <div className="color-grid">
            <div className='colors-container'>
                <div className='colors-header'>
                    <label className='color-label'>Paint Shop: Choose your color</label>
                    <input
                        type="text"
                        name="custom_color"
                        placeholder="#FFFFFF"
                        id="color-input"
                        className="color-input"
                        maxLength={7}
                        onChange={setHashSymbol}
                        onClick={setHashSymbol}
                    />
                </div>
                <div className="color-palette" id="color-palette"></div>
            </div>
            <div className='car-preview-container'>
                <Car color={selectedColor} />
            </div>
        </div>
    );
}
