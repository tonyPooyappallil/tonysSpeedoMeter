import React, { useEffect, useState } from 'react';
import SpeedLimitCircle from './alert/SpeedingAlert';

const SpeedLimitComponent = ({lat,long,speed}) => {
  const [speedLimit, setSpeedLimit] = useState(null);
console.log("aasssssss",lat,long);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=[out:json];way(around:8,${lat},${long})[%22highway%22];out body;>;out skel qt;`
        );
        


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("data",data);

        // Extract and set speed limit
        if (data.elements[0]?.tags?.maxspeed) {
            setSpeedLimit(data.elements[0]?.tags?.maxspeed);
            console.log("res spppdddd",data.elements[0]?.tags?.maxspeed );
        } else {
            const roadType = data.elements[0]?.tags?.highway;
            setSpeedLimit(inferSpeedLimit(roadType));
        }
       
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [lat,long]);

  // Function to infer speed limit based on road type
  const inferSpeedLimit = (roadType) => {
    switch (roadType) {
      case 'motorway':
        return 120; // km/h
      case 'primary':
        return 80; // km/h
      case "residential":
        return 50;
      // Add more cases as needed
      default:
        return null; // Unknown speed limit
    }
  };

  return (
    <div  style={{
        
        height: '80px',
        width: "20%",
        margin: "auto",
      
       
    }}>
        <div>   {speedLimit && <SpeedLimitCircle speedLimit={speedLimit} currentSpeed={speed}></SpeedLimitCircle>}
 </div>
    <div> <p> {speedLimit && ` Speed Limit: ${speedLimit} km/h`}</p> </div> 
    </div>
  );
};

export default SpeedLimitComponent;
