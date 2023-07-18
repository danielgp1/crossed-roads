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

            </div>
        </div>
    )
}