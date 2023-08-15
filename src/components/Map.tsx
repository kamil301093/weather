import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from "react";

const Map = (props: { mapCoords: any }) => {

    const [mapDiv, setMapDiv] = useState<any>("");
    const [mapCoords, setMapCoords] = useState<Array<any>>();

    setMapCoords(props.mapCoords);

    useEffect(() => {

        if (props.mapCoords != null || props.mapCoords != undefined) {
            const coordsSplit = props.mapCoords.split(',');
            setMapDiv(
                <MapContainer center={[coordsSplit[0], coordsSplit[1]]} zoom={13} >
                    < TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[coordsSplit[0], coordsSplit[1]]}>
                        <Popup>
                            I am a pop-up!
                        </Popup>
                    </Marker>
                </MapContainer >
            )
        } else {
            setMapDiv("");
        }
    }, [mapCoords])

    return (
        <div className="map">
            {mapDiv}
        </div >
    )
}

export default Map;