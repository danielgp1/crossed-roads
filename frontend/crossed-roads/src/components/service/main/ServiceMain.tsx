import AvailableColors from '../../available-colors/AvailableColors'
import Friends from '../../friends/Friends'
import Profile from '../../profile/Profile'
import PurchaseCar from '../../purchase-car/PurchaseCar'
import './ServiceMain.css'

export default function ServiceMain() {
    return (
        <div className='service-main-grid'>
            <Profile />
            <div className='line-separator-2'></div>
            <PurchaseCar />
            <div className='line-separator-2'></div>
            <div className='line-separator-2'></div>
            <div className='line-separator-2'></div>
            <Friends />
            <div className='line-separator-2'></div>
            <AvailableColors />
        </div>
    )
}