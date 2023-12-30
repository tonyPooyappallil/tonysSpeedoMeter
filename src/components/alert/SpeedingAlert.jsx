import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import ReactPlayer from 'react-player';

const SpeedLimitCircle = ({ speedLimit, currentSpeed }) => {
    const [alert, setAlert] = useState(false);

    // Define the animation spring for scaling
    const { scale } = useSpring({
        scale: alert ? 1.2 : 1,
        config: { tension: 200, friction: 20 },
    });

    // Check the speed limit and trigger an alert
    useEffect(() => {
        if (currentSpeed > speedLimit) {
            setAlert(true);
        } else {
            setAlert(false);
        }
    }, [speedLimit, currentSpeed]);

    // Set up gesture handling for user interaction
    const bind = useGesture({
        onPointerUp: () => setAlert(false),
    });

    return (
        <div>
            <animated.div
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: alert ? 'red' : 'lightblue',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transform: scale.interpolate((s) => `scale(${s})`),
                }}
                {...bind()}
            >
                <p style={{ fontSize: '24px', color: 'white' }}>{speedLimit}</p>
            </animated.div>

            {/* Audio alert when speeding */}
            {alert && (
                <ReactPlayer
                    url="/MD-80_Overspeed.mp3" // Replace with the actual path to your audio file
                    playing={true}
                    volume={1.0}
                    onEnded={() => setAlert(false)}
                />
            )}
        </div>
    );
};

export default SpeedLimitCircle;
