import React, { useState, useEffect } from 'react';

const LocationSpeedTracker = () => {
    const [location, setLocation] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [watchId, setWatchId] = useState(null);

    function errorCallback(error) { }

    var options = {
        enableHighAccuracy: true,
        timeout: 500,
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
            {/* {location && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )} */}


            <h1> {speed == null ? 0 : <p> {Math.round(speed * 3.6)} km/hr</p>}</h1>


        </div>
    );
};

export default LocationSpeedTracker;
