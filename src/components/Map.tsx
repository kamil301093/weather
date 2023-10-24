import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props: { mapCoords: any }) => {

    const coordsSplit = props.mapCoords.split(','); console.log(coordsSplit);

    return (
        <div className="map">
            {
                coordsSplit.length > 0 &&
                <MapContainer center={[coordsSplit[0], coordsSplit[1]]} zoom={8} scrollWheelZoom={false}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[coordsSplit[0], coordsSplit[1]]}>
                        <Popup>{[coordsSplit[0] + ", " + coordsSplit[1]]}</Popup>
                    </Marker>
                </MapContainer>
            }
        </div>
    )
}

export default Map;