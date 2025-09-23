"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ConflictData } from "@/lib/mockData";

// Custom icon setup without modifying prototypes
const createDefaultIcon = (): L.Icon => {
  return new L.Icon({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Set default icon globally
L.Marker.prototype.options.icon = createDefaultIcon();

// Type definitions
interface CountryCoordinates {
  [key: string]: {
    latitude: number;
    longitude: number;
  };
}

// Define valid region types
type Region = "Middle East" | "Europe" | "Asia Pacific" | "Africa" | "Americas";

interface ConflictMapProps {
  conflicts: ConflictData[];
  selectedCountry?: string | null;
  region?: Region;
}

// Custom icons for different intensity levels
const createCustomIcon = (color: string, size: number): L.Icon => {
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
      </svg>
    `)}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Map controller component for programmatic control
interface MapControllerProps {
  selectedCountry: string | null;
  countryCoordinates: CountryCoordinates;
  center: [number, number];
  zoom: number;
}

function MapController({
  selectedCountry,
  countryCoordinates,
  center,
  zoom,
}: MapControllerProps) {
  const map = useMap();

  // Set initial view based on region center/zoom
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  // Zoom to selected country if provided
  useEffect(() => {
    if (selectedCountry && countryCoordinates[selectedCountry]) {
      const coords = countryCoordinates[selectedCountry];
      map.setView([coords.latitude, coords.longitude], 6);
    }
  }, [selectedCountry, countryCoordinates, map]);

  return null;
}

export default function ConflictMap({
  conflicts,
  selectedCountry = null,
  region = "Middle East",
}: ConflictMapProps) {
  // Region-based center coordinates and zoom levels
  const regionSettings = {
    "Middle East": {
      center: [25.0, 43.0] as [number, number],
      zoom: 5,
    },
    Europe: {
      center: [54.526, 15.2551] as [number, number],
      zoom: 4,
    },
    "Asia Pacific": {
      center: [25.0, 110.0] as [number, number],
      zoom: 3,
    },
    Africa: {
      center: [8.7832, 34.5085] as [number, number],
      zoom: 3,
    },
    Americas: {
      center: [19.8968, -77.6045] as [number, number],
      zoom: 3,
    },
  };

  // Type-safe access to region settings
  const settings = regionSettings[region];
  const center = settings.center;
  const zoom = settings.zoom;

  // Coordinates for all countries
  const countryCoordinates: CountryCoordinates = {
    // Middle East countries
    "Israel/Palestine": { latitude: 31.5, longitude: 34.75 },
    Yemen: { latitude: 15.5, longitude: 47.5 },
    Syria: { latitude: 35.0, longitude: 38.0 },
    Iraq: { latitude: 33.0, longitude: 43.0 },
    Iran: { latitude: 32.0, longitude: 53.0 },
    "Saudi Arabia": { latitude: 24.0, longitude: 45.0 },
    Egypt: { latitude: 26.0, longitude: 30.0 },
    Lebanon: { latitude: 33.8, longitude: 35.8 },
    Jordan: { latitude: 31.2, longitude: 36.8 },

    // European countries
    Ukraine: { latitude: 48.3794, longitude: 31.1656 },
    Russia: { latitude: 61.524, longitude: 105.3188 },
    Germany: { latitude: 51.1657, longitude: 10.4515 },
    France: { latitude: 46.6034, longitude: 1.8883 },
    "United Kingdom": { latitude: 55.3781, longitude: -3.436 },
    Italy: { latitude: 41.8719, longitude: 12.5674 },
    Spain: { latitude: 40.4637, longitude: -3.7492 },
    Poland: { latitude: 51.9194, longitude: 19.1451 },
    Belarus: { latitude: 53.7098, longitude: 27.9534 },
    Moldova: { latitude: 47.4116, longitude: 28.3699 },

    // Asia Pacific countries
    Myanmar: { latitude: 21.9162, longitude: 95.956 },
    China: { latitude: 35.8617, longitude: 104.1954 },
    India: { latitude: 20.5937, longitude: 78.9629 },
    Pakistan: { latitude: 30.3753, longitude: 69.3451 },
    Afghanistan: { latitude: 33.9391, longitude: 67.71 },
    "North Korea": { latitude: 40.3399, longitude: 127.5101 },
    "South Korea": { latitude: 35.9078, longitude: 127.7669 },
    Japan: { latitude: 36.2048, longitude: 138.2529 },
    Philippines: { latitude: 12.8797, longitude: 121.774 },
    Vietnam: { latitude: 14.0583, longitude: 108.2772 },
    Thailand: { latitude: 15.87, longitude: 100.9925 },
    Indonesia: { latitude: -0.7893, longitude: 113.9213 },
    Malaysia: { latitude: 4.2105, longitude: 101.9758 },
    Australia: { latitude: -25.2744, longitude: 133.7751 },
    "New Zealand": { latitude: -40.9006, longitude: 174.886 },
    Taiwan: { latitude: 23.6978, longitude: 120.9605 },
    Bangladesh: { latitude: 23.685, longitude: 90.3563 },
    "Sri Lanka": { latitude: 7.8731, longitude: 80.7718 },
    Nepal: { latitude: 28.3949, longitude: 84.124 },

    // Africa countries (for future use)
    Sudan: { latitude: 12.8628, longitude: 30.2176 },
    Ethiopia: { latitude: 9.145, longitude: 40.4897 },

    // Americas countries (for future use)
    Haiti: { latitude: 18.9712, longitude: -72.2852 },
  };

  // Get icon based on intensity
  const getIcon = (intensity: ConflictData["intensity"]): L.Icon => {
    const size =
      intensity === "Critical"
        ? 20
        : intensity === "High"
          ? 16
          : intensity === "Medium"
            ? 12
            : 8;

    const color =
      intensity === "Critical"
        ? "#8B0000"
        : intensity === "High"
          ? "#FF0000"
          : intensity === "Medium"
            ? "#FFA500"
            : "#FFFF00";

    return createCustomIcon(color, size);
  };

  return (
    <div className="h-96 w-full overflow-hidden rounded-lg shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          selectedCountry={selectedCountry}
          countryCoordinates={countryCoordinates}
          center={center}
          zoom={zoom}
        />

        {conflicts.map((conflict) => {
          const coords = countryCoordinates[conflict.country];
          if (!coords) {
            console.warn(
              `Coordinates not found for country: ${conflict.country}`,
            );
            return null;
          }

          return (
            <Marker
              key={conflict.id}
              position={[coords.latitude, coords.longitude]}
              icon={getIcon(conflict.intensity)}
            >
              <Popup>
                <div className="min-w-[200px] p-2">
                  <h3 className="mb-1 text-lg font-bold">{conflict.country}</h3>
                  <p className="mb-2 text-sm text-gray-600">
                    {conflict.conflictType}
                  </p>
                  <div className="mb-2 flex items-center">
                    <span
                      className={`mr-2 inline-block h-3 w-3 rounded-full ${
                        conflict.intensity === "High" ||
                        conflict.intensity === "Critical"
                          ? "bg-red-500"
                          : conflict.intensity === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <span className="text-sm">
                      {conflict.intensity} Intensity
                    </span>
                  </div>
                  {conflict.casualties && (
                    <p className="mb-2 text-sm">
                      <strong>Casualties:</strong>{" "}
                      {conflict.casualties.toLocaleString()}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    <strong>Started:</strong>{" "}
                    {new Date(conflict.startDate).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-sm">{conflict.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
