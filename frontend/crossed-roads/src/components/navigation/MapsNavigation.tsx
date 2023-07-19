import './MapsNavigation.css'

interface MapsNavigationProps {
    setIsNavigationOpen: (isNavigationOpen: boolean) => void;
}

export default function MapsNavigation({ setIsNavigationOpen }: MapsNavigationProps) {
    
    const handleCloseNavaigation = () => {
        setIsNavigationOpen(false);
    };

    return (
        <div className="maps-overlay">
            <div className="maps-container">
                <button className='maps-close' onClick={handleCloseNavaigation}>Cancel Navigation</button>
                <div className='maps-header'>
                    <span className='maps-title'>On Your Way To</span>
                    <span className='maps-to'>John Cena</span>
                </div>
                <div className='maps-google-map'>
                        
                </div>
            </div>
        </div>
    )
}