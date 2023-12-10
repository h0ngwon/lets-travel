import {
    GoogleMap,
    Marker,
    PolylineF,
    useJsApiLoader,
} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

function MapComponent(props) {
    //props로 목적지의 위도 경도를 받아야 합니다.

    //목적지 초기값은 마이애미
    const [destLatLng, setDestLatLng] = useState({ lat: 25.774, lng: -80.19 });

    //사이즈는 부모 element 사이즈에 의존합니다.
    //e.g. <MapComponent /> 가 가로 1000px, 세로 600xp인 div 안에서 렌더링된다면 그 사이즈가 됩니다
    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    //서울 위도경도
    const departure = {
        lat: 37.5649867,
        lng: 126.985575,
    };

    const averageLatLng = {
        lat: (departure.lat + destLatLng.lat) / 2,
        lng: (departure.lng + destLatLng.lng) / 2,
    };
    if (averageLatLng.lng > -10 && averageLatLng.lng < 40) {
        averageLatLng.lng += 180;
    }

    const OPTIONS = {
        maxZoom: 10,
        minZoom: 2,
    };
    const polyPath = [
        {
            ...departure,
        },
        { ...destLatLng },
    ];
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setDestLatLng(props.destination || { lat: 48.8, lng: 2.35 });
        }, 2000);
    }, [props]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={averageLatLng}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={OPTIONS}
            zoom={3}
        >
            <Marker position={departure}></Marker>
            <Marker position={destLatLng}></Marker>
            <PolylineF
                path={polyPath}
                options={{
                    strokeOpacity: 1,
                    strokeColor: '#ff0000',
                    strokeWeight: 2,
                }}
            />
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MapComponent);
