import React, { useState, useEffect } from 'react';
import SpeedLimitComponent from './SpeedLimitComponent';

const LocationSpeedTracker = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    const [speed, setSpeed] = useState(null);

    function errorCallback(error) { }

    var options = {
        enableHighAccuracy: true,
        timeout: 500,
        maximumAge: 0
    }



    function successCallback(position) {

        const { latitude, longitude, speed } = position.coords;

        // Show a map centered at Latitude / Longitude.
        setSpeed(speed)
        setLocation({ latitude, longitude })


    }


    useEffect(() => {
        const watchid = navigator.geolocation.watchPosition(successCallback, errorCallback, options);

    }, []);


    console.log(speed);
    console.log(location);
    return (
        <div>
            {location.latitude && (
                <div>
                    <SpeedLimitComponent lat={location.latitude} long={location.longitude} speed={speed * 3.6} />

                </div>
            )}
            <h1>{speed == null ? 0 : <p>{Math.round(speed * 3.6)} km/hr</p>}</h1>
        </div>
    );

};

export default LocationSpeedTracker;
