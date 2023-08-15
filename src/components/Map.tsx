import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'

const Map = (props: {mapCords:string }) => {
    return (
        <MapContainer center={[props.mapCords]} zoom={13} >
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[40.505, -100.09]}>
                <Popup>
                    I am a pop-up!
                 </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;