import axios from "axios";
import "./App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { LatLng } from "leaflet";
import { useEffect, useState } from "react";

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click: (location) => {
      setPosition(location.latlng);
      map.flyTo(location.latlng, map.getZoom());
    },
  });
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function MapComponent() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default function MyApp() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching data from backend: ",
          error
        );
      });
  }, []);

  return (
    <>
      <div>
        <h1>{message}</h1>
      </div>
      <div id="map">
        <MapComponent />
      </div>
    </>
  );
}
