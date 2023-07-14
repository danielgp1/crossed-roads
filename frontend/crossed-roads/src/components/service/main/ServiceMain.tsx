import Profile from '../../profile/Profile'
import PurchaseCar from '../../purchase-car/PurchaseCar'
import './ServiceMain.css'

export default function ServiceMain() {
    return (
        <div className='service-main-grid'>
            <Profile />
            <PurchaseCar />
            <div>Profile</div>
            <div>Choose Color</div>
        </div>
    )
}