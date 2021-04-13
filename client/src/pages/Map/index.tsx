import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import MapTemplate from '../../templates/Map';

export default function Map(): JSX.Element {
    return (
        <MapTemplate
            header={'Maps'}
            content={
                <MapContainer className="w-3/4 h-screen-90" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            }
        />
        // <section className="flex flex-col items-center justify-center">
        //     <header className="text-lg">Maps</header>

        //     <footer>Timeline</footer>
        // </section>
    )
}
