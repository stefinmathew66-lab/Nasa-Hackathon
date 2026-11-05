import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Satellite, MapPin, Navigation, Compass } from 'lucide-react';
import { Translations } from '../locales/translations';

interface MapPickerProps {
  lat: number;
  lon: number;
  regionName?: string;
  onLocationChange: (lat: number, lon: number, name?: string) => void;
  t: Translations;
}

const BENCHMARKS = [
  { name: "Maharashtra (Drought-Prone)", lat: 19.84, lon: 75.88 },
  { name: "Machakos, Kenya (Semi-Arid)", lat: -1.51, lon: 37.26 },
  { name: "Central Valley, CA (Irrigated)", lat: 36.74, lon: -119.78 },
  { name: "Sahel, Niger (Hyper-Arid)", lat: 14.21, lon: 1.45 },
  { name: "Iowa Corn Belt (Rainfed)", lat: 42.03, lon: -93.63 },
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
        zoomControl: false
      });

      // Zoom control in bottom right as per Stitch spec
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map);

      const marker = L.marker([lat, lon], { icon: customIcon, draggable: true }).addTo(map);
      marker.bindPopup(`<b>Target Parcel</b><br/>${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`).openPopup();

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        onLocationChange(pos.lat, pos.lng, `Custom Field (${pos.lat.toFixed(2)}, ${pos.lng.toFixed(2)})`);
      });

      map.on('click', (e: L.LeafletMouseEvent) => {
        marker.setLatLng(e.latlng);
        marker.bindPopup(`<b>Target Parcel</b><br/>${e.latlng.lat.toFixed(4)}°N, ${e.latlng.lng.toFixed(4)}°E`).openPopup();
        onLocationChange(e.latlng.lat, e.latlng.lng, `Custom Field (${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)})`);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    } else {
      mapInstanceRef.current.setView([lat, lon], mapInstanceRef.current.getZoom());
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
        markerRef.current.bindPopup(`<b>${regionName || 'Target Parcel'}</b><br/>${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`).openPopup();
      }
    }
  }, [lat, lon, regionName]);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onLocationChange(pos.coords.latitude, pos.coords.longitude, "Your Current GPS Location");
        },
        () => {
          alert("Unable to retrieve device GPS location. Using map selection.");
        }
      );
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden shadow-sm">
      {/* Metadata Header */}
      <div className="px-4 py-2.5 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Satellite className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono font-semibold text-primary uppercase">
            TARGET FIELD EO UPLINK
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded">
            {lat.toFixed(4)}° N, {lon.toFixed(4)}° E
          </span>
          <button
            onClick={handleUseCurrentLocation}
            className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-secondary/10 text-secondary hover:bg-secondary/20 transition border border-secondary/30 flex items-center gap-1"
          >
            <Navigation className="w-3 h-3" />
            GPS
          </button>
        </div>
      </div>

      {/* Simulated Satellite Raster Canvas / Map HUD */}
      <div className="relative h-60 bg-surface-container overflow-hidden bg-radar-grid">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Map Overlay Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          <div className="bg-inverse-surface/90 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-surface-bright flex items-center gap-1.5 border border-outline/30">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
            <span>NDVI / SMAP 9km → 1km Downscaled</span>
          </div>
          <div className="bg-inverse-surface/90 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-tertiary-fixed-dim border border-outline/30">
            {regionName || "Target Parcel Field"}
          </div>
        </div>
      </div>

      {/* Quick Pilot Preset Buttons */}
      <div className="p-4 border-t border-outline-variant bg-surface-container-lowest">
        <label className="text-[11px] font-mono text-on-surface-variant block mb-2 font-medium uppercase">
          QUICK PILOT REGION PRESETS:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {BENCHMARKS.map((bm) => {
            const isSelected = Math.abs(bm.lat - lat) < 0.1 && Math.abs(bm.lon - lon) < 0.1;
            return (
              <button
                key={bm.name}
                type="button"
                onClick={() => onLocationChange(bm.lat, bm.lon, bm.name)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                  isSelected
                    ? "bg-primary-container text-white font-bold border border-primary shadow-sm"
                    : "bg-surface-container-low text-on-surface border border-outline-variant hover:bg-surface-container"
                }`}
              >
                {bm.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
