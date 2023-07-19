import Car from '../car/Car'
import './AvailableColors.css'

export default function AvailableColors() {
    return (
        <div className="available-colors-grid">
            <div className='available-colors-header-wrapper'>
                <div className='available-colors-header'>Available Paintjobs</div>
            </div>
            <div className='available-colors-container-grid'>
                <Car color='green' direction='yellow' />
                <Car color='blue' direction='yellow' />
                <Car color='black' direction='yellow' />
                <Car color='red' direction='yellow' />
                <Car color='maroon' direction='yellow' />
                <Car color='white' direction='yellow' />
                <Car color='purple' direction='yellow' />
                <Car color='cyan' direction='yellow' />
                <Car color='darkblue' direction='yellow' />
                <Car color='yellow' direction='yellow' />
                <Car color='green' direction='yellow' />
                <Car color='blue' direction='yellow' />
                <Car color='black' direction='yellow' />
                <Car color='red' direction='yellow' />
                <Car color='maroon' direction='yellow' />
                <Car color='white' direction='yellow' />
                <Car color='purple' direction='yellow' />
                <Car color='cyan' direction='yellow' />
                <Car color='darkblue' direction='yellow' />
                <Car color='yellow' direction='yellow' />
            </div>
        </div>
    )
}