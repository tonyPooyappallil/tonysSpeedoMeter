import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import Modal from 'react-modal';

const SpeedLimitCircle = ({ speedLimit, currentSpeed }) => {
    const [alert, setAlert] = useState(false);
    const [play, { stop }] = useSound('/Beep.mp3', { interrupt: false });
    const [modalOpen, setModalOpen] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);

    useEffect(() => {
        const handleSpeedLimitBreached = () => {
            setAlert(true);
            // Set a timeout for 2 seconds to play the audio
            setTimeout(() => {
                if (audioEnabled && currentSpeed > (speedLimit)) {
                    play();
                }
            }, 1500);
        };
        const handleSpeedLimitNormal = () => {
            stop()
            setAlert(false);
        };
        if (speedLimit != null && currentSpeed > speedLimit) {
            handleSpeedLimitBreached();
        } else {
            handleSpeedLimitNormal();
        }
    }, [speedLimit, currentSpeed, audioEnabled, play, stop]);

    const handleModalResponse = () => {
        setModalOpen(false);
    };

    const toggleAudio = () => {
        setAudioEnabled(!audioEnabled);
        if (!audioEnabled) {
            stop(); // Stop the audio if it's currently playing
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {speedLimit && (
                <div
                    style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        backgroundColor: alert ? 'red' : 'green',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '20px'
                    }}
                >
                    <p style={{ fontSize: '84px', color: 'white' }}>{speedLimit}</p>
                </div>
            )}

            {/* Toggle audio button */}
            <button onClick={toggleAudio}>
                {audioEnabled ? 'Disable Audio Alert' : 'Enable Audio Alert'}
            </button>

            {/* Modal for user confirmation */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => handleModalResponse('no')}
                contentLabel="Alert Permission Modal"
            >
                <p>Are you okay with playing an audio alert?</p>
                <button onClick={() => handleModalResponse('yes')}>Yes</button>
            </Modal>
        </div>
    );
};

export default SpeedLimitCircle;
