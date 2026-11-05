import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { Translations } from '../locales/translations';

interface MapPickerProps {
  lat: number;
  lon: number;
  regionName?: string;
  onLocationChange: (lat: number, lon: number, name?: string) => void;
  t: Translations;
}

const BENCHMARKS = [
  { name: "Maharashtra, India", lat: 19.84, lon: 75.88, tag: "Monsoon Drought-Prone" },
  { name: "Machakos, Kenya", lat: -1.51, lon: 37.26, tag: "East Africa Semi-Arid" },
  { name: "Fresno, California", lat: 36.74, lon: -119.78, tag: "Groundwater Stress" },
  { name: "Tillabéri, Niger (Sahel)", lat: 14.21, lon: 1.45, tag: "Extreme Arid" },
  { name: "Iowa Corn Belt, USA", lat: 42.03, lon: -93.63, tag: "High Rain Humid" },
];

export const MapPicker: React.FC<MapPickerProps> = ({
  lat,
  lon,
  regionName,
  onLocationChange,
  t
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Fix default Leaflet icon paths
      const customIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const map = L.map(mapContainerRef.current, {
        center: [lat, lon],
        zoom: 7,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      const marker = L.marker([lat, lon], { icon: customIcon, draggable: true }).addTo(map);
      marker.bindPopup(`<b>Farm Field</b><br/>Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`).openPopup();

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        onLocationChange(pos.lat, pos.lng, `Custom Field (${pos.lat.toFixed(2)}, ${pos.lng.toFixed(2)})`);
      });

      map.on('click', (e: L.LeafletMouseEvent) => {
        marker.setLatLng(e.latlng);
        marker.bindPopup(`<b>Farm Field</b><br/>Lat: ${e.latlng.lat.toFixed(4)}, Lon: ${e.latlng.lng.toFixed(4)}`).openPopup();
        onLocationChange(e.latlng.lat, e.latlng.lng, `Custom Field (${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)})`);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    } else {
      mapInstanceRef.current.setView([lat, lon], mapInstanceRef.current.getZoom());
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
        markerRef.current.bindPopup(`<b>${regionName || 'Farm Field'}</b><br/>Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`).openPopup();
      }
    }

    return () => {
      // Map cleanup on unmount if needed
    };
  }, [lat, lon, regionName]);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onLocationChange(pos.coords.latitude, pos.coords.longitude, "Your Current Location");
        },
        () => {
          alert("Unable to retrieve device GPS location. Using map selection.");
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            <span>{t.step1}</span>
          </h2>
          <p className="text-xs text-slate-500">{t.step1Desc}</p>
        </div>

        <button
          onClick={handleUseCurrentLocation}
          className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
        >
          <Navigation className="w-3.5 h-3.5 mr-1.5" />
          Use GPS
        </button>
      </div>

      {/* Quick Benchmark Pilot Region Chips */}
      <div className="mb-3">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
          Or Quick Test Global Pilot Zones:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {BENCHMARKS.map((bm) => {
            const isSelected = Math.abs(bm.lat - lat) < 0.1 && Math.abs(bm.lon - lon) < 0.1;
            return (
              <button
                key={bm.name}
                onClick={() => onLocationChange(bm.lat, bm.lon, bm.name)}
                className={`text-xs px-2.5 py-1 rounded-full border transition flex items-center space-x-1.5 ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="font-medium">{bm.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-slate-700 text-slate-200" : "bg-slate-200 text-slate-600"}`}>
                  {bm.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Leaflet Map Div */}
      <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-200 shadow-inner z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Selected Coordinates Status */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
          <span className="font-semibold text-slate-800 truncate">
            {regionName || "Custom Field Location"}
          </span>
        </div>
        <div className="font-mono text-slate-500 font-medium">
          {lat.toFixed(4)}°N, {lon.toFixed(4)}°E
        </div>
      </div>
    </div>
  );
};
