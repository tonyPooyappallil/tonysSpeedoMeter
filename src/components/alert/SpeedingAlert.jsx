import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import useSound from 'use-sound';
import Modal from 'react-modal';

const SpeedLimitCircle = ({ speedLimit, currentSpeed }) => {
    const [alert, setAlert] = useState(false);
    const [play] = useSound('/MD-80_Overspeed.mp3');
    const [modalOpen, setModalOpen] = useState(true);



    // Check the speed limit and trigger an alert
    useEffect(() => {
        if (currentSpeed > speedLimit) {
            setAlert(true);
            play();
        } else {
            setAlert(false);
        }
    }, [speedLimit, currentSpeed, play]);


    const handleModalResponse = (response) => {
        setModalOpen(false);
    };




    return (<div>
        {speedLimit && (<div
            style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: alert ? 'red' : 'green',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // cursor: 'pointer',
            }}
        >
            <p style={{ fontSize: '24px', color: 'white' }}>{speedLimit}</p>
        </div>)}

        {/* Audio alert when speeding */}
        {alert && (
            <ReactPlayer
                url="/MD-80_Overspeed.mp3" // Replace with the actual path to your audio file
                playing={true}
                volume={1}


            />
        )}
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
