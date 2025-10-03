'use client';

import React, { useEffect, useState } from 'react';
import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import NavBar from '@/components/NavBar';
import RouteLoading from './loading';
import DrawingTools from '@/components/map/DrawingTools'; // Correct Path

type AppConfig = {
  googleMapsApiKey: string;
  apiUrl: string;
  mapId: string;
};


export default function Map2Page(): React.ReactElement {
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
          defaultZoom={10}
          gestureHandling="greedy"
          mapId={config.mapId}
          colorScheme={darkMode ? "DARK": "LIGHT"}
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