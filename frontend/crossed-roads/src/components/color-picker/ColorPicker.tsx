import React, { useEffect, useState } from 'react';
import './ColorPicker.css';

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  useEffect(() => {
    const colorList = [
      '000000',
      '993300',
      '333300',
      '003300',
      '003366',
      '000066',
      '333399',
      '333333',
      '660000',
      'FF6633',
      '666633',
      '336633',
      '336666',
      '0066FF',
      '666699',
      '666666',
      'CC3333',
      'FF9933',
      '99CC33',
      '669966',
      '66CCCC',
      '3366FF',
      '663366',
      '999999',
      'CC66FF',
      'FFCC33',
      'FFFF66',
      '99FF66',
      '99CCCC',
      '66CCFF',
      '993366',
      'CCCCCC',
      'FF99CC',
      'FFCC99',
      'FFFF99',
      'CCffCC',
      'CCFFff',
      '99CCFF',
      'CC99FF',
      'FFFFFF',
    ];

    const picker = document.querySelector<HTMLDivElement>('#color-picker');
    const callPickerInput = document.querySelector<HTMLInputElement>('#pickcolor');

    if (picker && callPickerInput) {
      picker.innerHTML = '';
      colorList.forEach((color) => {
        const li = document.createElement('li');
        li.className = 'color-item';
        li.dataset.hex = `#${color}`;
        li.style.backgroundColor = `#${color}`;
        picker.appendChild(li);
      });

      const colorItems = picker.querySelectorAll<HTMLElement>('li');
      colorItems.forEach((item) => {
        item.addEventListener('click', () => {
          const codeHex = item.dataset.hex;
          if (codeHex) {
            setSelectedColor(codeHex);
            callPickerInput.value = codeHex;
          }
        });
      });

      callPickerInput.addEventListener('input', (event) => {
        const codeHex = (event.target as HTMLInputElement).value;
        setSelectedColor(codeHex);
      });
    }
  }, []);

  return (
    <div className="color-wrapper">
      <p>Choose color (# hex)</p>
      <input
        type="text"
        name="custom_color"
        placeholder="#FFFFFF"
        id="pickcolor"
        className="call-picker"
        maxLength={7}
      />
      <div
        className="color-holder call-picker"
        style={{ backgroundColor: selectedColor }}
      ></div>
      <div className="color-picker" id="color-picker"></div>
    </div>
  );
}
