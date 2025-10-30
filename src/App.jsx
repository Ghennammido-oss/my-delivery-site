import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// أيقونة تحديد الموقع
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

function App() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("حدث خطأ في تحديد الموقع:", err);
          alert("الرجاء السماح بالوصول إلى موقعك الجغرافي.");
        }
      );
    } else {
      alert("المتصفح لا يدعم GPS");
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h2 style={{ textAlign: "center", marginTop: "10px" }}>📍 موقع التوصيل الخاص بك</h2>
      {position ? (
        <MapContainer center={position} zoom={15} style={{ height: "90vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={markerIcon}>
            <Popup>هذا موقعك الحالي 📍</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p style={{ textAlign: "center" }}>جاري تحديد موقعك...</p>
      )}
    </div>
  );
}

export default App;

