import React from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import locationIcon from '../app-images/icon-location.svg'
import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: locationIcon,
    iconRetinaUrl: locationIcon,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(45, 55),
    className: 'leaflet-div-icon'
});

function LocationMarker({currentCoordinates}) {

    const map = useMap();
    map.flyTo(currentCoordinates, 16, {duration: 3})
  
    return (
      <Marker position={currentCoordinates} icon={iconPerson}>
        <Popup>You are here</Popup>
      </Marker>
    )
}

export { LocationMarker }