import React from 'react';
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    PolylineF,
} from '@react-google-maps/api';

function MapComponent() {
    //사이즈는 부모 컴포넌트에 사이즈에 의존하게 만들었습니다.
    //e.g. <MapComponent /> 가 가로 1000px, 세로 600xp인 div 안에서 렌더링된다면 그 사이즈가 됩니다
    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const center = {
        //서울 위도경도
        lat: 37.5649867,
        lng: 126.985575,
    };

    const OPTIONS = {
        maxZoom: 10,
        minZoom: 2,
    };
    const someCoords = [
        {
            lat: 37.5649867,
            lng: 126.985575,
        },
        { lat: 25.774, lng: -80.19 }, //마이애미 위도 경도
    ];
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={OPTIONS}
        >
            <Marker position={center}></Marker>
            <Marker position={{ lat: 25.774, lng: -80.19 }}></Marker>
            <PolylineF
                path={someCoords}
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
