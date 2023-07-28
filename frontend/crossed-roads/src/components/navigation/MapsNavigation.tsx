import './MapsNavigation.css'

interface MapsNavigationProps {
    first_name:string;
    last_name:string;
    longitude:number;
    latitude:number;
    setIsNavigationOpen: (isNavigationOpen: boolean) => void;
}

export default function MapsNavigation({ first_name, last_name, longitude, latitude, setIsNavigationOpen }: MapsNavigationProps) {
    
    const handleCloseNavaigation = () => {
        setIsNavigationOpen(false);
    };

    console.log(latitude);
    console.log(longitude);

    return (
        <div className="maps-overlay">
            <div className="maps-container">
                <button className='maps-close' onClick={handleCloseNavaigation}>Cancel Navigation</button>
                <div className='maps-header'>
                    <span className='maps-title'>On Your Way To</span>
                    <span className='maps-to'>{first_name} {last_name}</span>
                </div>
                <div className='maps-google-map'>
                        
                </div>
            </div>
        </div>
    )
}