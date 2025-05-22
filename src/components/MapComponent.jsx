import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const MapComponent = () => {
  const position = [-1.4772889522549837, -48.45399135672737]

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap
        </a> contributors'
      />

      <TileLayer
        url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
        attribution='Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
      />

      <Marker position={position}>
        <Popup>Marcador no mapa</Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapComponent
