'use client';

import React, { useEffect, useState } from 'react';
import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import NavBar from '@/components/NavBar';
import RouteLoading from '../map/loading';
import DrawingTools from '@/components/map/DrawingTools'; // Ensure this path is correct

type AppConfig = {
  googleMapsApiKey: string;
  apiUrl: string;
  mapId: string;
};

const mapStyles: { [key: string]: google.maps.MapTypeStyle[] } = {
  dark: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
    { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
    { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
    { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }
  ],
  light: []
};

export default function Map2Page(): React.ReactElement {
  const position = { lat: 32.1036, lng: 76.2711 }; // Kangra
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) throw new Error('Failed to fetch configuration');
        const data: AppConfig = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  if (loading) return <RouteLoading />;
  if (error || !config) return <div>Error: {error || 'Config not available'}</div>;
  if (!config.googleMapsApiKey) return <div>Error: Google Maps API Key is missing.</div>;

  return (
    <APIProvider apiKey={config.googleMapsApiKey} libraries={['drawing', 'geometry', 'marker']}>
      <div style={{ height: "100dvh", width: "100%", position: "relative" }}>
        <NavBar />
        <GoogleMap
          defaultCenter={position}
          defaultZoom={10}
          gestureHandling="greedy"
          mapId={config.mapId}
          styles={darkMode ? mapStyles.dark : mapStyles.light}
          restriction={{ latLngBounds: { north: 85, south: -85, west: -179, east: 179 }, strictBounds: true }}
        >
          <DrawingTools 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode}
            apiUrl={config.apiUrl}
          />
        </GoogleMap>
      </div>
    </APIProvider>
  );
}