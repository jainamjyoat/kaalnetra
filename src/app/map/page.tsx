'use client';

import React, { useEffect, useState } from 'react';
import { APIProvider, Map as GoogleMap, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

function DrawingTools() {
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
  if (!map || shapes.length === 0) return;

  if (markerClusterer) {
    markerClusterer.clearMarkers();
  }

  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    'marker',
  )) as google.maps.MarkerLibrary;

  const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

  // take only the first shape for now
  for( const shape of shapes ){
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
  
  if (!endpoint) return;

  // Call backend (falls back to relative API route if NEXT_PUBLIC_API_URL is not set)
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
  const origin = apiBase || (typeof window !== 'undefined' ? window.location.origin : '');
  const url = `${origin}/api/random-points/${endpoint}?count=100`;
  console.log('generateRandomMarkers -> POST', url, payload);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  // Place returned points as markers
  for (const [lat, lng] of data.points) {
    const img = document.createElement("img");
    img.src = "/plant-animation/1.png";
    img.width = 48;
    img.height = 48;

    const marker = new AdvancedMarkerElement({
      position: { lat, lng },
      content: img,
    });

    marker.addListener("click", () => {
      if (selectedMarker) {
        (selectedMarker.content as HTMLElement).style.border = "";
      }
      (marker.content as HTMLElement).style.border = "2px solid #93c5fd";
      setSelectedMarker(marker);
      setMarkerInfo(`Marker Position: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    });

    newMarkers.push(marker);
  }
  }
  setMarkers(newMarkers);
  const clusterer = new MarkerClusterer({ markers: newMarkers, map });
  setMarkerClusterer(clusterer);

  // Keep shape borders but make them transparent
  shapes.forEach(shape => {
    (shape as any).setOptions({ fillOpacity: 0.0, strokeOpacity: 1.0 });
  });
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
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '1000px',
      zIndex: 1000,
      background: '#0f172a',
      color: '#e5e7eb',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        <button onClick={() => handleToolSelect('select')} style={{
          padding: '8px 12px', border: '1px solid #374151', borderRadius: '4px',
          background: selectedTool === 'select' ? '#2563eb' : '#1f2937',
          color: selectedTool === 'select' ? 'white' : '#e5e7eb',
          cursor: 'pointer', fontSize: '12px'
        }}>Select</button>
        <button onClick={() => handleToolSelect('rectangle')} style={{
          padding: '8px 12px', border: '1px solid #374151', borderRadius: '4px',
          background: selectedTool === 'rectangle' ? '#2563eb' : '#1f2937',
          color: selectedTool === 'rectangle' ? 'white' : '#e5e7eb',
          cursor: 'pointer', fontSize: '12px'
        }}>Rectangle</button>
        <button onClick={() => handleToolSelect('circle')} style={{
          padding: '8px 12px', border: '1px solid #374151', borderRadius: '4px',
          background: selectedTool === 'circle' ? '#2563eb' : '#1f2937',
          color: selectedTool === 'circle' ? 'white' : '#e5e7eb',
          cursor: 'pointer', fontSize: '12px'
        }}>Circle</button>
        <button onClick={() => handleToolSelect('triangle')} style={{
          padding: '8px 12px', border: '1px solid #374151', borderRadius: '4px',
          background: selectedTool === 'triangle' ? '#2563eb' : '#1f2937',
          color: selectedTool === 'triangle' ? 'white' : '#e5e7eb',
          cursor: 'pointer', fontSize: '12px'
        }}>Custom Shape</button>
      </div>
      <div style={{ display: 'flex', gap: '5px' }}>
        <button onClick={deleteSelectedShape} style={{
          padding: '6px 10px', border: '1px solid #ef4444', borderRadius: '4px',
          background: '#991b1b', color: 'white', cursor: 'pointer', fontSize: '11px'
        }}>Delete Selected</button>
        <button onClick={clearAll} style={{
          padding: '6px 10px', border: '1px solid #4b5563', borderRadius: '4px',
          background: '#374151', color: 'white', cursor: 'pointer', fontSize: '11px'
        }}>Clear All</button>
        <button onClick={generateRandomMarkers} style={{
          padding: '6px 10px', border: '1px solid #059669', borderRadius: '4px',
          background: '#10b981', color: 'white', cursor: 'pointer', fontSize: '11px'
        }}>Generate Markers</button>
      </div>
      <div style={{ fontSize: '10px', color: '#e5e7eb', background: '#0f172a', padding: '4px', borderRadius: '3px', border: '1px solid #374151' }}>
        Shapes: {shapes.length}
      </div>
      {shapeCoordinates && (
        <div style={{
          fontSize: '10px', color: '#e5e7eb', background: '#0f172a', padding: '8px',
          borderRadius: '4px', maxWidth: '300px', wordBreak: 'break-all', border: '1px solid #374151'
        }}>
          <strong>Selected Shape:</strong><br />{shapeCoordinates}
        </div>
      )}
      {markerInfo && (
        <div style={{
          fontSize: '10px', color: '#e5e7eb', background: '#0f172a', padding: '8px',
          borderRadius: '4px', maxWidth: '300px', wordBreak: 'break-all', border: '1px solid #374151'
        }}>
          <strong>Selected Marker:</strong><br />{markerInfo}
        </div>
      )}
    </div>
  );
}

export default function MapPage() {
  const position = { lat: 22.5726, lng: 88.3639 };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const darkMapId = 'f5a527ffab781fb81f077b38';
  const mapid = process.env.NEXT_PUBLIC_MAP_ID || darkMapId
  
  if (!apiKey) {
  return <div>Error: API Key is missing. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.</div>;
  }

  return (
    <APIProvider apiKey={apiKey} libraries={['drawing', 'geometry', 'marker']}>
      <div style={{ height: "100vh", width: "100%", position: "relative" }}>
        
        
        <GoogleMap
          defaultCenter={position}
          defaultZoom={1.5}
          defaultTilt={0}
          defaultHeading={0}
          gestureHandling="greedy"
          mapId={mapid}
          restriction={{
            latLngBounds: {
              north: 85, south: -85, west: -179, east: 179
            },
            strictBounds: true
          }}
        >
          <DrawingTools />
        </GoogleMap>
      </div>
    </APIProvider>
  );
}