import { useUserContext } from '../../contexts/UserContext';
import Car from '../car/Car'
import './AvailableColors.css'
import def from '../assets/default_pic.png'
import { useAvailableColorsContext } from '../../contexts/AvailableColorsContext';

export default function AvailableColors() {
    const { user, updateCurrentColor } = useUserContext();
    const { availableColors } = useAvailableColorsContext();


    const handleColorChange = async (color: string) => {
        // Call the updateCurrentColor function from the UserContext
        if (user) {
            await updateCurrentColor(color);
            console.log(availableColors[0].user_id);
        }
    };

    return (
        <div className="available-colors-grid">
            <div className='available-colors-header-wrapper'>
                <div className='available-colors-header'>Available Paintjobs</div>
            </div>
            <div className='available-colors-container-grid'>
                {availableColors.map((color) => (
                    <div className='available-color-container' key={`${color.user_id}-${color.color_hash}`}>
                        <Car
                            color={color.color_hash}
                            direction='#f9d71c'
                            name={user?.first_name || ''}
                            pfp={user?.profile_pic_url || def}
                            onClick={() => handleColorChange(color.color_hash)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}