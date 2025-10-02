'use client';

import React, { useEffect, useState } from 'react';
import { APIProvider, Map as GoogleMap, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import NavBar from '@/components/NavBar';
import RouteLoading from '../map/loading';

// Config type
type AppConfig = {
  googleMapsApiKey: string;
  apiUrl: string;
  mapId: string;
};

function DrawingTools({ 
  darkMode, 
  onToggleDarkMode,
  apiUrl 
}: { 
  darkMode: boolean; 
  onToggleDarkMode: () => void;
  apiUrl: string;
}) {
  const map = useMap();
  const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);
  const [shapes, setShapes] = useState<google.maps.MVCObject[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<google.maps.MVCObject | null>(null);
  const [shapeCoordinates, setShapeCoordinates] = useState<string>('');
  const [markerClusterer, setMarkerClusterer] = useState<MarkerClusterer | null>(null);
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [markerInfo, setMarkerInfo] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const isPointInShape = (point: google.maps.LatLng, shape: google.maps.MVCObject): boolean => {
    try {
      if (shape instanceof google.maps.Rectangle) {
        const bounds = shape.getBounds();
        return bounds ? bounds.contains(point) : false;
      } else if (shape instanceof google.maps.Circle) {
        const center = shape.getCenter();
        const radius = shape.getRadius();
        if (center && google.maps.geometry?.spherical) {
          const distance = google.maps.geometry.spherical.computeDistanceBetween(point, center);
          return distance <= radius;
        }
      } else if (shape instanceof google.maps.Polygon) {
        if (google.maps.geometry?.poly) {
          return google.maps.geometry.poly.containsLocation(point, shape);
        }
      }
    } catch (error) {
      console.warn('Error checking point in shape:', error);
    }
    return false;
  };

  const generateRandomMarkers = async () => {
    if (!map || shapes.length === 0) {
      alert('Please draw at least one shape first!');
      return;
    }

    // Clear existing markers
    if (markerClusterer) {
      markerClusterer.clearMarkers();
    }
    markers.forEach(m => m.map = null);
    setMarkers([]);

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker',
    )) as google.maps.MarkerLibrary;

    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

    try {
      // Process all shapes
      for (const shape of shapes) {
        let endpoint = "";
        let payload: any = {};

        if (shape instanceof google.maps.Rectangle) {
          const bounds = shape.getBounds();
          if (bounds) {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            payload = { ne: [ne.lat(), ne.lng()], sw: [sw.lat(), sw.lng()] };
            endpoint = "rectangle";
          }
        } else if (shape instanceof google.maps.Circle) {
          const center = shape.getCenter();
          const radius = shape.getRadius();
          if (center) {
            payload = { center: [center.lat(), center.lng()], radius };
            endpoint = "circle";
          }
        } else if (shape instanceof google.maps.Polygon) {
          const path = shape.getPath();
          const points: [number, number][] = [];
          for (let i = 0; i < path.getLength(); i++) {
            const p = path.getAt(i);
            points.push([p.lat(), p.lng()]);
          }
          payload = { points };
          endpoint = "polygon";
        }

        if (!endpoint) continue;

        // Use API_URL from config or fallback to Next.js API routes
        const url = apiUrl 
          ? `${apiUrl}/random-points/${endpoint}`
          : `/api/random-points/${endpoint}?count=100`;
        
        console.log('🌱 Fetching markers from:', url);
        console.log('📦 Payload:', payload);

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('❌ API Error:', res.status, errorText);
          throw new Error(`API returned ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        console.log('✅ Received points:', data.points?.length || 0);

        // Create markers with plant animation
        for (const point of data.points) {
          const [lat, lng] = point;
          
          // Create plant marker container
          const container = document.createElement("div");
          container.style.position = "relative";
          container.style.cursor = "pointer";
          container.style.transition = "transform 0.2s ease";
          
          const img = document.createElement("img");
          img.src = "/plant-animation/1.png";
          img.width = 48;
          img.height = 48;
          img.style.display = "block";
          img.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.3))";
          
          container.appendChild(img);

          const marker = new AdvancedMarkerElement({
            position: { lat, lng },
            content: container,
            title: `Plant at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          });

          // Hover effect
          container.addEventListener('mouseenter', () => {
            container.style.transform = "scale(1.15)";
          });
          container.addEventListener('mouseleave', () => {
            if (marker !== selectedMarker) {
              container.style.transform = "scale(1)";
            }
          });

          // Click handler
          marker.addListener("click", () => {
            // Deselect previous marker
            if (selectedMarker && selectedMarker !== marker) {
              const prevContent = selectedMarker.content as HTMLElement;
              prevContent.style.border = "";
              prevContent.style.transform = "scale(1)";
            }
            
            // Select new marker
            container.style.border = "3px solid #60a5fa";
            container.style.borderRadius = "50%";
            container.style.transform = "scale(1.2)";
            setSelectedMarker(marker);
            setMarkerInfo(`🌱 Plant Location\nLat: ${lat.toFixed(6)}\nLng: ${lng.toFixed(6)}`);
          });

          newMarkers.push(marker);
        }
      }

      if (newMarkers.length === 0) {
        alert('No markers were generated. Please try again.');
        return;
      }

      console.log('🎯 Total markers created:', newMarkers.length);
      setMarkers(newMarkers);
      
      // Add clustering for performance
      const clusterer = new MarkerClusterer({ 
        markers: newMarkers, 
        map,
        algorithmOptions: {
          maxZoom: 15,
        }
      });
      setMarkerClusterer(clusterer);

      // Make shapes transparent but keep borders visible
      shapes.forEach(shape => {
        (shape as any).setOptions({ fillOpacity: 0.0, strokeOpacity: 1.0 });
      });

      console.log('✨ Marker generation complete!');
    } catch (error) {
      console.error('❌ Error generating markers:', error);
      alert(`Failed to generate markers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const updateCoordinates = (shape: google.maps.MVCObject) => {
    let coordsText = '';

    try {
      if (shape instanceof google.maps.Rectangle) {
        const bounds = shape.getBounds();
        if (bounds) {
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          coordsText = `Rectangle: NE(${ne.lat().toFixed(6)}, ${ne.lng().toFixed(6)}) SW(${sw.lat().toFixed(6)}, ${sw.lng().toFixed(6)})`;
        }
      } else if (shape instanceof google.maps.Circle) {
        const center = shape.getCenter();
        const radius = shape.getRadius();
        if (center) {
          coordsText = `Circle: Center(${center.lat().toFixed(6)}, ${center.lng().toFixed(6)}) Radius: ${radius.toFixed(2)}m`;
        }
      } else if (shape instanceof google.maps.Polygon) {
        const path = shape.getPath();
        const coords = [];
        for (let i = 0; i < path.getLength(); i++) {
          const point = path.getAt(i);
          coords.push(`(${point.lat().toFixed(6)}, ${point.lng().toFixed(6)})`);
        }
        coordsText = `Polygon: ${coords.join(', ')}`;
      }
    } catch (error) {
      coordsText = 'Error reading coordinates';
    }

    setShapeCoordinates(coordsText);
  };

  useEffect(() => {
    if (!map) return;

    const manager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: false,
      rectangleOptions: {
        fillColor: '#8ab4f8',
        fillOpacity: 0.2,
        strokeWeight: 2,
        strokeColor: '#8ab4f8',
        clickable: true,
        editable: true,
        draggable: false,
      },
      circleOptions: {
        fillColor: '#8ab4f8',
        fillOpacity: 0.2,
        strokeWeight: 2,
        strokeColor: '#8ab4f8',
        clickable: true,
        editable: true,
        draggable: false,
      },
      polygonOptions: {
        fillColor: '#8ab4f8',
        fillOpacity: 0.2,
        strokeWeight: 2,
        strokeColor: '#8ab4f8',
        clickable: true,
        editable: true,
        draggable: false,
      },
    });

    manager.setMap(map);
    setDrawingManager(manager);

    const shapeCompleteListener = manager.addListener('overlaycomplete', (event: google.maps.drawing.OverlayCompleteEvent) => {
      const finalShape = event.overlay;

      setShapes(prev => [...prev, finalShape]);

      finalShape.addListener('click', () => {
        shapes.forEach(shape => {
          if (shape !== finalShape) {
            (shape as any).setEditable?.(false);
          }
        });
        (finalShape as any).setEditable?.(true);
        setSelectedShape(finalShape);
        updateCoordinates(finalShape);
      });

      manager.setDrawingMode(null);
      setSelectedTool('');
    });

    return () => {
      google.maps.event.removeListener(shapeCompleteListener);
      manager.setMap(null);
    };
  }, [map]);

  
  useEffect(() => {
    if (markers.length === 0) return;

    const frameData = new Map();
    markers.forEach(m => frameData.set(m, 1));

    const interval = setInterval(() => {
      markers.forEach(marker => {
        const img = marker.content as HTMLImageElement;
        if (img) {
          let frame = frameData.get(marker) || 1;
          frame = (frame % 9) + 1;
          img.src = `/plant-animation/${frame}.png`;
          frameData.set(marker, frame);
        }
      });
    }, 200);

    return () => clearInterval(interval);
  }, [markers]);

  const handleToolSelect = (tool: string) => {
    if (!drawingManager) return;
    setSelectedTool(tool);

    switch (tool) {
      case 'rectangle':
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
        break;
      case 'circle':
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
        break;
      case 'triangle':
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        break;
      case 'select':
        drawingManager.setDrawingMode(null);
        break;
      default:
        drawingManager.setDrawingMode(null);
    }
  };

  const clearAll = () => {
    shapes.forEach(shape => (shape as any).setMap(null));
    setShapes([]);
    setSelectedShape(null);
    setShapeCoordinates('');
    if (markerClusterer) {
      markerClusterer.clearMarkers();
    }
    setMarkers([]);
    setSelectedMarker(null);
    setMarkerInfo('');
  };

  const deleteSelectedShape = () => {
    if (selectedShape) {
      (selectedShape as any).setMap(null);
      setShapes(prev => prev.filter(shape => shape !== selectedShape));
      setSelectedShape(null);
      setShapeCoordinates('');
    }
  };

  
  return (
    <>
      {isMobile ? (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 1000, pointerEvents: 'none' }}>
          <div
            style={{
              margin: '0 12px 12px',
              background: '#0f172a',
              color: '#e5e7eb',
              border: '1px solid #1f2a44',
              borderRadius: 12,
              boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
              overflow: 'hidden',
              transform: sheetOpen ? 'translateY(0)' : 'translateY(calc(100% - 52px))',
              transition: 'transform 250ms ease',
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={() => setSheetOpen((s) => !s)}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: '#0b1220',
                color: '#e5e7eb',
                border: 'none',
                borderBottom: '1px solid #1f2a44',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: 36, height: 4, borderRadius: 999, background: '#334155' }} />
            </button>

            <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button onClick={() => handleToolSelect('select')} style={{ padding: 10, border: '1px solid #374151', borderRadius: 8, background: selectedTool === 'select' ? '#2563eb' : '#1f2937', color: '#e5e7eb' }}>Select</button>
              <button onClick={() => handleToolSelect('rectangle')} style={{ padding: 10, border: '1px solid #374151', borderRadius: 8, background: selectedTool === 'rectangle' ? '#2563eb' : '#1f2937', color: '#e5e7eb' }}>Rectangle</button>
              <button onClick={() => handleToolSelect('circle')} style={{ padding: 10, border: '1px solid #374151', borderRadius: 8, background: selectedTool === 'circle' ? '#2563eb' : '#1f2937', color: '#e5e7eb' }}>Circle</button>
              <button onClick={() => handleToolSelect('triangle')} style={{ padding: 10, border: '1px solid #374151', borderRadius: 8, background: selectedTool === 'triangle' ? '#2563eb' : '#1f2937', color: '#e5e7eb' }}>Custom</button>
            </div>

            <div style={{ padding: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={deleteSelectedShape} style={{ flex: 1, padding: 10, border: '1px solid #ef4444', borderRadius: 8, background: '#991b1b', color: 'white' }}>Delete</button>
              <button onClick={clearAll} style={{ flex: 1, padding: 10, border: '1px solid #4b5563', borderRadius: 8, background: '#374151', color: 'white' }}>Clear</button>
              <button onClick={generateRandomMarkers} style={{ flexBasis: '100%', padding: 10, border: '1px solid #059669', borderRadius: 8, background: '#10b981', color: 'white' }}>Generate Markers</button>
              <button onClick={onToggleDarkMode} style={{ flexBasis: '100%', padding: 10, border: '1px solid #f59e0b', borderRadius: 8, background: darkMode ? '#d97706' : '#1f2937', color: 'white' }}>
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>

            {sheetOpen && (
              <div style={{ padding: 12, display: 'grid', gap: 8 }}>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>Shapes: {shapes.length}</div>
                {shapeCoordinates && (
                  <div style={{ fontSize: 11, color: '#e5e7eb', background: '#0f172a', padding: 8, borderRadius: 8, border: '1px solid #374151' }}>
                    <strong>Selected Shape:</strong><br />{shapeCoordinates}
                  </div>
                )}
                {markerInfo && (
                  <div style={{ fontSize: 11, color: '#e5e7eb', background: '#0f172a', padding: 8, borderRadius: 8, border: '1px solid #374151' }}>
                    <strong>Selected Marker:</strong><br />{markerInfo}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '36px',
          zIndex: 1000,
          background: '#0f172a',
          color: '#e5e7eb',
          padding: '14px',
          borderRadius: '10px',
          boxShadow: '0 2px 18px rgba(0,0,0,0.42)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minWidth: '250px',
          maxWidth: '350px',
          transition: 'top 0.2s, left 0.2s',
          pointerEvents: 'auto',
          cursor: 'default',
        }}>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', pointerEvents: 'auto' }}>
            <button onClick={() => handleToolSelect('select')} style={{
              padding: '8px 12px', border: '1px solid #374151', borderRadius: '4px',
              background: selectedTool === 'select' ? '#2563eb' : '#1f2937',
              color: selectedTool === 'select' ? 'white' : '#e5e7eb',
              cursor: 'pointer', fontSize: '12px', pointerEvents: 'auto'
            }}>Select</button>
            <button onClick={() => handleToolSelect('rectangle')} style={{
              padding: '8px 12px', border: '1px solid #374151', borderRadius: '4px',
              background: selectedTool === 'rectangle' ? '#2563eb' : '#1f2937',
              color: selectedTool === 'rectangle' ? 'white' : '#e5e7eb',
              cursor: 'pointer', fontSize: '12px', pointerEvents: 'auto'
            }}>Rectangle</button>
            <button onClick={() => handleToolSelect('circle')} style={{
              padding: '8px 12px', border: '1px solid #374151', borderRadius: '4px',
              background: selectedTool === 'circle' ? '#2563eb' : '#1f2937',
              color: selectedTool === 'circle' ? 'white' : '#e5e7eb',
              cursor: 'pointer', fontSize: '12px', pointerEvents: 'auto'
            }}>Circle</button>
            <button onClick={() => handleToolSelect('triangle')} style={{
              padding: '8px 12px', border: '1px solid #374151', borderRadius: '4px',
              background: selectedTool === 'triangle' ? '#2563eb' : '#1f2937',
              color: selectedTool === 'triangle' ? 'white' : '#e5e7eb',
              cursor: 'pointer', fontSize: '12px', pointerEvents: 'auto'
            }}>Custom Shape</button>
          </div>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', pointerEvents: 'auto' }}>
            <button onClick={deleteSelectedShape} style={{
              padding: '6px 10px', border: '1px solid #ef4444', borderRadius: '4px',
              background: '#991b1b', color: 'white', cursor: 'pointer', fontSize: '11px', pointerEvents: 'auto'
            }}>Delete Selected</button>
            <button onClick={clearAll} style={{
              padding: '6px 10px', border: '1px solid #4b5563', borderRadius: '4px',
              background: '#374151', color: 'white', cursor: 'pointer', fontSize: '11px', pointerEvents: 'auto'
            }}>Clear All</button>
            <button onClick={generateRandomMarkers} style={{
              padding: '6px 10px', border: '1px solid #059669', borderRadius: '4px',
              background: '#10b981', color: 'white', cursor: 'pointer', fontSize: '11px', pointerEvents: 'auto'
            }}>Generate Markers</button>
            <button onClick={onToggleDarkMode} style={{
              padding: '6px 10px', border: '1px solid #f59e0b', borderRadius: '4px',
              background: darkMode ? '#d97706' : '#1f2937', color: 'white', cursor: 'pointer', fontSize: '11px', pointerEvents: 'auto'
            }}>{darkMode ? '☀️ Light' : '🌙 Dark'}</button>
          </div>
          <div style={{ fontSize: '10px', color: '#e5e7eb', background: '#0f172a', padding: '4px', borderRadius: '3px', border: '1px solid #374151', pointerEvents: 'auto', cursor: 'default' }}>
            Shapes: {shapes.length}
          </div>
          {shapeCoordinates && (
            <div style={{
              fontSize: '10px', color: '#e5e7eb', background: '#0f172a', padding: '8px',
              borderRadius: '4px', maxWidth: '300px', wordBreak: 'break-all', border: '1px solid #374151', pointerEvents: 'auto', cursor: 'default'
            }}>
              <strong>Selected Shape:</strong><br />{shapeCoordinates}
            </div>
          )}
          {markerInfo && (
            <div style={{
              fontSize: '10px', color: '#e5e7eb', background: '#0f172a', padding: '8px',
              borderRadius: '4px', maxWidth: '300px', wordBreak: 'break-all', border: '1px solid #374151', pointerEvents: 'auto', cursor: 'default'
            }}>
              <strong>Selected Marker:</strong><br />{markerInfo}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function Map2Page() {
  const position = { lat: 22.5726, lng: 88.3639 };
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  // Fetch configuration from API route on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error('Failed to fetch configuration');
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Loading state
  if (loading) {
    return <RouteLoading />;
  }

  // Error state
  if (error || !config) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: '#0f172a',
        color: '#ef4444',
        fontSize: '18px',
        padding: '20px',
        textAlign: 'center',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div>❌ Error loading configuration</div>
        <div style={{ fontSize: '14px', color: '#9ca3af' }}>
          {error || 'Configuration not available'}
        </div>
      </div>
    );
  }

  // Missing API key
  if (!config.googleMapsApiKey) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: '#0f172a',
        color: '#ef4444',
        fontSize: '18px',
        padding: '20px',
        textAlign: 'center'
      }}>
        ❌ Error: Google Maps API Key is missing.<br/>
        Please set GOOGLE_MAPS_API_KEY in your .env file.
      </div>
    );
  }

  return (
    <APIProvider apiKey={config.googleMapsApiKey} libraries={['drawing', 'geometry', 'marker']}>
      <div style={{ height: "100dvh", width: "100%", position: "relative" }}>
        <NavBar />
        <GoogleMap
          defaultCenter={position}
          defaultZoom={1.5}
          defaultTilt={0}
          defaultHeading={0}
          gestureHandling="greedy"
          mapId={config.mapId || undefined}
          colorScheme={darkMode ? "DARK" : "LIGHT"}
          restriction={{
            latLngBounds: {
              north: 85, south: -85, west: -179, east: 179
            },
            strictBounds: true
          }}
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
