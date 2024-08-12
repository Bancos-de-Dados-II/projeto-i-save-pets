import L from 'leaflet';

const Marker = new L.Icon({
    iconUrl: require('./marker.svg'),
    iconRetinaUrl: require('./marker.svg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { Marker };