import React, { useState, useEffect } from 'react';

const LocationSpeedTracker = () => {
    const [location, setLocation] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [watchId, setWatchId] = useState(null);

    function errorCallback(error) { }

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }



    function successCallback(position) {

        const { accuracy, latitude, longitude, altitude, heading, speed } = position.coords;

        // Show a map centered at Latitude / Longitude.

        setSpeed(speed)
        setLocation({ latitude, longitude })

    }


    useEffect(() => {
        const watchid = navigator.geolocation.watchPosition(successCallback, errorCallback, options);
        setWatchId(watchid)

    }, []);


    console.log(speed);
    return (
        <div>
            {location && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
            {speed !== null && <p>Speed: {speed} m/s</p>}

            {speed !== null && <p>Speed: {speed * 3.6} km/hr</p>}

        </div>
    );
};

export default LocationSpeedTracker;
