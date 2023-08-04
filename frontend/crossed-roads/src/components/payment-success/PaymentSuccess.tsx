import './PaymentSuccess.css'
import { useNavigate } from "react-router-dom"

export default function PaymentSuccess() {
    const navigate = useNavigate();

    const handleBackToService = () => {
        navigate("/service")
    }

    return (
        <div className="payment-success-body">
            <div className='payment-success-container'>
                <span className="success-text">Payment Succesful</span>
                <span className="success-info">The color has been added to your available colors list</span>
                <button onClick={handleBackToService} className="success-btn">Back to Service</button>
            </div>
        </div>
    )
}