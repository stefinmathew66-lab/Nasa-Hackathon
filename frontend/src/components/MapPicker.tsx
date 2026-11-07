import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';
import { Translations } from '../locales/translations';

interface MapPickerProps {
  lat: number;
  lon: number;
  regionName?: string;
  onLocationChange: (lat: number, lon: number, name?: string) => void;
  t: Translations;
}

const BENCHMARKS = [
  { name: "Maharashtra", lat: 19.84, lon: 75.88 },
  { name: "Machakos", lat: -1.51, lon: 37.26 },
  { name: "Central Valley", lat: 36.74, lon: -119.78 },
  { name: "Sahel", lat: 14.21, lon: 1.45 },
  { name: "Iowa Corn Belt", lat: 42.03, lon: -93.63 },
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
      const customIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="background-color: #059669; width: 22px; height: 22px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2.5px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center;"><div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 22],
        popupAnchor: [0, -22]
      });

      const map = L.map(mapContainerRef.current, {
        center: [lat, lon],
        zoom: 7,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18
      }).addTo(map);

      const marker = L.marker([lat, lon], { icon: customIcon, draggable: true }).addTo(map);

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        onLocationChange(pos.lat, pos.lng, `Parcel (${pos.lat.toFixed(2)}, ${pos.lng.toFixed(2)})`);
      });

      map.on('click', (e: L.LeafletMouseEvent) => {
        marker.setLatLng(e.latlng);
        onLocationChange(e.latlng.lat, e.latlng.lng, `Parcel (${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)})`);
      });

      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      mapInstanceRef.current = map;
      markerRef.current = marker;
    } else {
      mapInstanceRef.current.setView([lat, lon], mapInstanceRef.current.getZoom());
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [lat, lon, regionName]);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onLocationChange(pos.coords.latitude, pos.coords.longitude, "GPS Location");
        },
        () => {
          alert("Unable to retrieve GPS coordinates.");
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-zinc-900">
            {t.fieldCoordinates}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-normal">
            {lat.toFixed(4)}° N, {lon.toFixed(4)}° E
          </span>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition flex items-center gap-1 cursor-pointer"
          >
            <Navigation className="w-3 h-3 text-zinc-500" />
            {t.gpsButton}
          </button>
        </div>
      </div>

      {/* Map Surface */}
      <div className="relative w-full h-44 sm:h-48 rounded-lg overflow-hidden border border-zinc-200">
        <div ref={mapContainerRef} className="w-full h-full z-0" />
        
        {/* Subtle Satellite telemetry tag */}
        <div className="absolute top-2 left-2 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/90 backdrop-blur-xs text-zinc-700 border border-zinc-200 shadow-xs">
            {t.smapResolution}
          </span>
        </div>
      </div>

      {/* Benchmark Presets */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1">
        <span className="text-xs text-zinc-400 font-medium mr-1">{t.presets}</span>
        {BENCHMARKS.map((bm) => {
          const isSelected = Math.abs(bm.lat - lat) < 0.1 && Math.abs(bm.lon - lon) < 0.1;
          return (
            <button
              key={bm.name}
              type="button"
              onClick={() => onLocationChange(bm.lat, bm.lon, bm.name)}
              className={`px-2.5 py-1 rounded-full text-xs transition ${
                isSelected
                  ? "bg-zinc-900 text-white font-medium shadow-xs"
                  : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-600"
              }`}
            >
              {bm.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
