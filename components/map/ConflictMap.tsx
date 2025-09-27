'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ConflictData } from '@/lib/mockData';

// Custom icon setup
const createDefaultIcon = (): L.Icon => {
  return new L.Icon({
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

interface CountryCoordinates {
  [key: string]: {
    latitude: number;
    longitude: number;
  };
}

type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia Pacific'
  | 'Australia'
  | 'Europe'
  | 'Middle East';

interface ConflictMapProps {
  conflicts: ConflictData[];
  selectedCountry?: string | null;
  region?: Region;
}

const createCustomIcon = (color: string, size: number): L.DivIcon => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          background-color: white;
          width: ${size / 3}px;
          height: ${size / 3}px;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

interface MapControllerProps {
  selectedCountry: string | null;
  countryCoordinates: CountryCoordinates;
  center: L.LatLngTuple;
  zoom: number;
}

function MapController({
  selectedCountry,
  countryCoordinates,
  center,
  zoom,
}: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  useEffect(() => {
    if (selectedCountry && countryCoordinates[selectedCountry]) {
      const coords = countryCoordinates[selectedCountry];
      map.setView([coords.latitude, coords.longitude] as L.LatLngTuple, 6);
    }
  }, [selectedCountry, countryCoordinates, map]);

  return null;
}

export default function ConflictMap({
  conflicts,
  selectedCountry = null,
  region = 'Middle East',
}: ConflictMapProps) {
  useEffect(() => {
    L.Marker.prototype.options.icon = createDefaultIcon();
  }, []);

  const regionSettings: Record<
    Region,
    { center: L.LatLngTuple; zoom: number }
  > = {
    Africa: { center: [8.7832, 34.5085], zoom: 3 },
    Americas: { center: [19.8968, -77.6045], zoom: 3 },
    'Asia Pacific': { center: [25.0, 110.0], zoom: 3 },
    Australia: { center: [-25.2744, 133.7751], zoom: 4 },
    Europe: { center: [54.526, 15.2551], zoom: 4 },
    'Middle East': { center: [25.0, 43.0], zoom: 5 },
  };

  const settings = regionSettings[region] || regionSettings['Middle East'];
  const center: L.LatLngTuple = settings.center;
  const zoom = settings.zoom;

  const countryCoordinates: CountryCoordinates = {
    // ... same as before ...
  };

  const getIcon = (intensity: ConflictData['intensity']): L.DivIcon => {
    const size =
      intensity === 'Critical'
        ? 20
        : intensity === 'High'
          ? 16
          : intensity === 'Medium'
            ? 12
            : 8;

    const color =
      intensity === 'Critical'
        ? '#8B0000'
        : intensity === 'High'
          ? '#FF0000'
          : intensity === 'Medium'
            ? '#FFA500'
            : '#FFFF00';

    return createCustomIcon(color, size);
  };

  return (
    <div className='h-96 w-full overflow-hidden rounded-lg shadow-lg'>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <MapController
          selectedCountry={selectedCountry}
          countryCoordinates={countryCoordinates}
          center={center}
          zoom={zoom}
        />

        {conflicts.map(conflict => {
          const coords = countryCoordinates[conflict.country];
          if (!coords) {
            console.warn(
              `Coordinates not found for country: ${conflict.country}`
            );
            return null;
          }

          return (
            <Marker
              key={conflict.id}
              position={[coords.latitude, coords.longitude] as L.LatLngTuple}
              icon={getIcon(conflict.intensity)}
            >
              <Popup>
                <div className='min-w-[200px] p-2'>
                  <h3 className='mb-1 text-lg font-bold'>{conflict.country}</h3>
                  <p className='mb-2 text-sm text-gray-600'>
                    {conflict.conflictType}
                  </p>
                  <div className='mb-2 flex items-center'>
                    <span
                      className={`mr-2 inline-block h-3 w-3 rounded-full ${
                        conflict.intensity === 'High' ||
                        conflict.intensity === 'Critical'
                          ? 'bg-red-500'
                          : conflict.intensity === 'Medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                    />
                    <span className='text-sm'>
                      {conflict.intensity} Intensity
                    </span>
                  </div>
                  {conflict.casualties && (
                    <p className='mb-2 text-sm'>
                      <strong>Casualties:</strong>{' '}
                      {conflict.casualties.toLocaleString()}
                    </p>
                  )}
                  <p className='text-xs text-gray-500'>
                    <strong>Started:</strong>{' '}
                    {new Date(conflict.startDate).toLocaleDateString()}
                  </p>
                  <p className='mt-2 text-sm'>{conflict.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
