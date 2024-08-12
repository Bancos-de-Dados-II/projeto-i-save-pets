import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';

function App() {
  const foodIcon = new Icon({
    iconUrl: 'https://img.icons8.com/doodle/48/apple.png',
    iconSize: [35, 35], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  })

  return (
    <MapContainer
      style={{ width: "100%", height: "100vh" }}
      center={[51.505, -0.09]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {[1, 2, 3].map((_, i) => (
        <Marker position={[51.505+i+10, -0.09]} icon={foodIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>

  );
}

export default App;
