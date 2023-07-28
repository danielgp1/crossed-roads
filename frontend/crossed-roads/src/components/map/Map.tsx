import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

const mapApiKey = 'AIzaSyCJVeqgVHhDHkvuaOOCiwj9YzMM1_Zk7sc';

export default function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: mapApiKey,
    });

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <GoogleMap
                id="example-map"
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
                options={options}
            />
        </div>
    );
}
