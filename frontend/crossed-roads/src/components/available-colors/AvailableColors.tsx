import { useUserContext } from '../../contexts/UserContext';
import Car from '../car/Car'
import './AvailableColors.css'
import def from '../assets/default_pic.png'

export default function AvailableColors() {
    const { user } = useUserContext();
    return (
        <div className="available-colors-grid">
            <div className='available-colors-header-wrapper'>
                <div className='available-colors-header'>Available Paintjobs</div>
            </div>
            <div className='available-colors-container-grid'>
                <div className='available-color-container'>
                    <Car color='green' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def}/>
                </div>
                <div className='available-color-container'>
                    <Car color='blue' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='red' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='yellow' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='cyan' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='maroon' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='black' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='darkblue' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='white' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='purple' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='green' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='blue' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='red' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='yellow' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='cyan' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='maroon' direction='#f9d71c' name={user?.first_name || ''} pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='black' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='darkblue' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='white' direction='#f9d71c' name={user?.first_name || ''}  pfp={user?.profile_pic_url || def} />
                </div>
                <div className='available-color-container'>
                    <Car color='purple' direction='#f9d71c' name={user?.first_name || ''} pfp={user?.profile_pic_url || def} />
                </div>
            </div>
        </div>
    )
}