import AvailableColors from '../../available-colors/AvailableColors'
import Viewers from '../../viewers/Viewers'
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
            <Viewers />
            <div className='line-separator-2'></div>
            <AvailableColors />
        </div>
    )
}