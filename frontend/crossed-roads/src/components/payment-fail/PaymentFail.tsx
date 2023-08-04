import { useNavigate } from "react-router-dom"

export default function PaymentFail() {
    const navigate = useNavigate();

    const handleBackToService = () => {
        navigate("/service")
    }

    return (
        <div className="payment-success-body">
            <div className='payment-success-container'>
                <span className="fail-text">Payment Failed</span>
                <span className="success-info">The color wasn't added to your available colors list</span>
                <button onClick={handleBackToService} className="success-btn">Back to Service</button>
            </div>
        </div>
    )
}