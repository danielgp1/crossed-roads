import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import './MapsNavigation.css';
import { useUserContext } from '../../contexts/UserContext';
import axios from 'axios';
import def from '../assets/default_pic.png'

interface MapsNavigationProps {
    id: number;
    first_name: string;
    last_name: string;
    profile_pic_url: string;
    longitude: number;
    latitude: number;
    setIsNavigationOpen: (isNavigationOpen: boolean) => void;
}

export default function MapsNavigation({ id, first_name, last_name, profile_pic_url, longitude, latitude, setIsNavigationOpen }: MapsNavigationProps) {
    const [watchId, setWatchId] = useState<number | undefined>(undefined);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [toFriendLocation, setToFriendLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [directions, setDirections] = useState<any>(null);
    const toLocation = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);
    const { user } = useUserContext();
    const pfp: string = user!.profile_pic_url;

    const mapContainerStyle = {
        width: '100%',
        height: '100%',
    };

    const center = {
        lat: 42.6977,
        lng: 23.3219,
    };

    const options = {
        zoomControl: true,
        minZoom: 4
    };

    const mapApiKey = process.env.REACT_APP_MAPS_KEY!;

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: mapApiKey,
    });

    useEffect(() => {
        if (latitude && longitude) {
            setToFriendLocation({ lat: latitude, lng: longitude });
        }
    }, [latitude, longitude]);

    useEffect(() => {
        if (!isLoaded) return;

        let watchId: number | undefined;
        if (navigator.geolocation) {
            const directionsService = new window.google.maps.DirectionsService();
            const userID = localStorage.getItem("userID");
            const authToken = localStorage.getItem('userToken')
            const updateUserLocation = async (lat: number, lng: number) => {
                try {
                    await axios.put(`http://localhost:8080/api/users/${userID}`, {
                        latitude: lat,
                        longitude: lng,
                    }, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });
                } catch (error) {
                    console.error(`There has been a problem with your fetch operation:`, error);
                }
            }

            const localWatchId = navigator.geolocation.watchPosition(position => {
                const newUserLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                setUserLocation(newUserLocation);
                updateUserLocation(newUserLocation.lat, newUserLocation.lng);
                if (newUserLocation && toFriendLocation) {
                    directionsService.route(
                        {
                            origin: newUserLocation,
                            destination: toFriendLocation,
                            travelMode: window.google.maps.TravelMode.DRIVING,
                        },
                        (result: any, status: any) => {
                            if (status === window.google.maps.DirectionsStatus.OK) {
                                setDirections(result);
                            } else {
                                console.error(`error fetching directions ${result}`);
                            }
                        }
                    );
                } else {
                    console.error('newUserLocation or toFriendLocation is null');
                }

            }, error => {
                console.log(error);
            });
            setWatchId(localWatchId);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        }
    }, [isLoaded, toLocation, user?.id]);

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const handleCloseNavaigation = () => {
        if (watchId) navigator.geolocation.clearWatch(watchId);
        setIsNavigationOpen(false);
    };

    return (
        <div className="maps-overlay">
            <div className="maps-container">
                <button className='maps-close' onClick={handleCloseNavaigation}>Cancel Navigation</button>
                <div className='maps-header'>
                    <span className='maps-title'>On Your Way To</span>
                    <span className='maps-to'>{first_name} {last_name}</span>
                </div>
                <div className='maps-google-map'>
                    <GoogleMap
                        id="example-map"
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={12}
                        options={options}
                    >
                        {userLocation && <Marker position={userLocation} icon={{
                            url: pfp || def,
                            scaledSize: new window.google.maps.Size(30, 30)
                        }} />}
                        {toLocation && <Marker position={toLocation} icon={{
                            url: profile_pic_url || def,
                            scaledSize: new window.google.maps.Size(30, 30)
                        }} />}
                        {directions && <DirectionsRenderer directions={directions} />}
                    </GoogleMap>
                </div>
                <a className='to-google-maps'
                    href={userLocation
                        ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${latitude},${longitude}&travelmode=driving`
                        : ''}
                    target="_blank"
                    rel="noopener noreferrer">
                    Open in Google Maps
                </a>
            </div>
        </div>
    )
}
