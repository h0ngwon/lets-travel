import React, { useEffect, useRef, useState } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    useMapsLibrary,
    useMap,
} from '@vis.gl/react-google-maps';
import styled from 'styled-components';
// import planeImg from '../assets/img/airplane.png';

function Maps() {
    const position = { lat: 37.56, lng: 126.94 };
    const destPosition = { lat: 35.45, lng: 140.23 };
    const scndPosition = { lat: 34.6, lng: 135.5 };
    return (
        <APIProvider apiKey={process.env.REACT_APP_MAPS_KEY}>
            <StDiv>
                <Map zoom={4} center={position} mapId='d8884fe987662437'>
                    <AdvancedMarker position={destPosition}></AdvancedMarker>
                    <AdvancedMarker position={scndPosition}></AdvancedMarker>
                    {/* <Polyline /> */}
                </Map>
            </StDiv>
        </APIProvider>
    );
}

const StDiv = styled.div`
    height: 100%;
    width: 100%;
`;

// function polyineComp(){
//     const mapsLib=useMapsLibrary("maps")
//     const[polyline,setPolyline]=useState(null)
//     useEffect(() => {
//       if(!mapsLib) return;
//       setPolyline(new mapsLib.Polyline)
//     },[mapsLib])
//     return
// }

export default Maps;
