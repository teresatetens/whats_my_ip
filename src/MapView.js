import React from 'react';
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';


const MapView = ({userData}) => {

    const position = [userData.location.lat, userData.location.lng]
    const city = userData.location.city;

    return(
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Here in {city} <br /> where you live.
                </Popup>
            </Marker>
        </MapContainer>

    )
}

export default MapView;