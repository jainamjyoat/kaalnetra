'use client';

import React, { useEffect, useState } from 'react';
import { Marker, InfoWindow, useMap } from '@vis.gl/react-google-maps';

// --- Type Definitions ---
interface DrawingToolsProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  apiUrl: string;
}
interface Species { scientific_name: string; common_name: string; phenophase: string; }
interface Pest { scientific_name_pest: string; common_name_pest: string; }
interface BiomeResult {
  biome: string;
  biome_name: string;
  location: { lat: number; lng: number; }; // <-- Location is now inside the result
  climate_data: { temperature: number; precipitation: number; radiation: number; };
  species: Species[];
  pests: Pest[];
}
interface AnalysisResult {
  results: BiomeResult[]; // <-- Top level is now just the results array
}

function DrawingTools({ darkMode, onToggleDarkMode, apiUrl }: DrawingToolsProps) {
  const map = useMap();
  const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);
  const [shapes, setShapes] = useState<google.maps.MVCObject[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  
  const [analysisMonth, setAnalysisMonth] = useState<number>(10);
  const [analysisYear, setAnalysisYear] = useState<number>(2025);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [activeInfoWindow, setActiveInfoWindow] = useState<string | null>(null); // <-- Will now store the biome code

  useEffect(() => {
    if (!map) return;
    const manager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: false,
      polygonOptions: { fillColor: '#8ab4f8', fillOpacity: 0.2, strokeWeight: 2, strokeColor: '#8ab4f8', clickable: true, editable: true },
      rectangleOptions: { fillColor: '#8ab4f8', fillOpacity: 0.2, strokeWeight: 2, strokeColor: '#8ab4f8', clickable: true, editable: true },
      circleOptions: { fillColor: '#8ab4f8', fillOpacity: 0.2, strokeWeight: 2, strokeColor: '#8ab4f8', clickable: true, editable: true },
    });
    manager.setMap(map);
    setDrawingManager(manager);

    const onShapeComplete = (event: google.maps.drawing.OverlayCompleteEvent) => {
      shapes.forEach(s => (s as any).setMap(null));
      const newShape = event.overlay;
      setShapes([newShape]);
      manager.setDrawingMode(null);
      setSelectedTool('select');
    };
    
    const listener = manager.addListener('overlaycomplete', onShapeComplete);
    return () => google.maps.event.removeListener(listener);
  }, [map, shapes]);

  const handleToolSelect = (tool: string) => {
    if (!drawingManager) return;
    setSelectedTool(tool);
    switch (tool) {
      case 'rectangle': drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE); break;
      case 'circle': drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE); break;
      case 'polygon': drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON); break;
      default: drawingManager.setDrawingMode(null);
    }
  };

  const deleteSelectedShape = () => {
    shapes.forEach(s => (s as any).setMap(null));
    setShapes([]);
    setAnalysisResult(null);
  };

  const handleAnalysis = async () => {
    if (shapes.length === 0) {
      alert("Please draw an area to analyze first!");
      return;
    }
    setIsLoadingAnalysis(true);
    setAnalysisResult(null);
    setActiveInfoWindow(null);

    const shape = shapes[0];
    let shape_points: [number, number][] = [];

    if (shape instanceof google.maps.Polygon) {
      const path = shape.getPath();
      for (let i = 0; i < path.getLength(); i++) {
        const p = path.getAt(i);
        if (p) shape_points.push([p.lat(), p.lng()]);
      }
    } else if (shape instanceof google.maps.Rectangle) {
      const bounds = shape.getBounds();
      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        shape_points.push([ne.lat(), ne.lng()],[ne.lat(), sw.lng()],[sw.lat(), sw.lng()],[sw.lat(), ne.lng()]);
      }
    } else if (shape instanceof google.maps.Circle) {
      const center = shape.getCenter();
      const radius = shape.getRadius();
      if (center && radius) {
        for (let i = 0; i < 32; i++) {
          const point = google.maps.geometry.spherical.computeOffset(center, radius, (i / 32) * 360);
          if (point) shape_points.push([point.lat(), point.lng()]);
        }
      }
    }

    if (shape_points.length < 3) {
      alert("Could not define a valid area from the selected shape.");
      setIsLoadingAnalysis(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/analyze-by-biome`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ shape_points, month: analysisMonth, year: analysisYear }) });
      if (!res.ok) throw new Error(await res.text());
      const data: AnalysisResult = await res.json();
      setAnalysisResult(data);
    } catch (error) {
      alert(`Failed to run analysis: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const btnStyle = (tool: string) => ({ padding: '8px 12px', border: '1px solid #374151', borderRadius: '4px', background: selectedTool === tool ? '#2563eb' : '#1f2937', color: 'white', cursor: 'pointer' });

  return (
    <>
      <div style={{ position: 'absolute', top: '80px', left: '24px', zIndex: 1000, background: '#0f172a', color: '#e5e7eb', padding: '14px', borderRadius: '10px', boxShadow: '0 2px 18px rgba(0,0,0,0.42)', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '320px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => handleToolSelect('rectangle')} style={btnStyle('rectangle')}>Rectangle</button>
          <button onClick={() => handleToolSelect('circle')} style={btnStyle('circle')}>Circle</button>
          <button onClick={() => handleToolSelect('polygon')} style={btnStyle('polygon')}>Polygon</button>
          <button onClick={deleteSelectedShape} style={{...btnStyle(''), background: '#374151'}}>Clear</button>
          <button onClick={onToggleDarkMode} style={{...btnStyle(''), background: darkMode ? '#d97706' : '#1f2937' }}>{darkMode ? '☀️' : '🌙'}</button>
        </div>
        
        <div style={{ borderTop: '1px solid #374151', paddingTop: '12px', marginTop: '4px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>🔬 Ecology Analysis</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{fontSize: '12px'}}>Month:</label>
            <input type="number" min="1" max="12" value={analysisMonth} onChange={(e) => setAnalysisMonth(parseInt(e.target.value))} style={{ width: '60px', background: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', padding: '4px' }}/>
            <label style={{fontSize: '12px'}}>Year:</label>
            <input type="number" value={analysisYear} onChange={(e) => setAnalysisYear(parseInt(e.target.value))} style={{ width: '80px', background: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', padding: '4px' }}/>
          </div>
          <button onClick={handleAnalysis} disabled={isLoadingAnalysis || shapes.length === 0} style={{ width: '100%', padding: '8px', border: '1px solid #059669', borderRadius: '4px', background: '#10b981', color: 'white', cursor: 'pointer', opacity: (isLoadingAnalysis || shapes.length === 0) ? 0.6 : 1 }}>
            {isLoadingAnalysis ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
      </div>

      {/* NEW: Loop to render a marker for each biome */}
      {analysisResult?.results.map((result) => (
        <React.Fragment key={result.biome}>
          <Marker
            position={result.location}
            title={result.biome_name}
            onClick={() => setActiveInfoWindow(result.biome)}
            label="📍"
          />
          
          {activeInfoWindow === result.biome && (
            <InfoWindow
              position={result.location}
              onCloseClick={() => setActiveInfoWindow(null)}
            >
              <div style={{ maxHeight: '250px', overflowY: 'auto', padding: '5px', color: '#111', minWidth: '280px' }}>
                <h4>{result.biome_name} ({result.biome})</h4>
                <div style={{fontSize: '12px', background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', margin: '4px 0'}}>
                  Temp: {result.climate_data.temperature}°C | Precip: {result.climate_data.precipitation}mm | Rad: {result.climate_data.radiation}
                </div>
                <strong style={{fontSize: '13px'}}>Species:</strong>
                <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                  {result.species.map((s) => <li key={s.scientific_name}>{s.common_name} ({s.phenophase})</li>)}
                </ul>
                <strong style={{fontSize: '13px'}}>Pests:</strong>
                 <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                  {result.pests.map((p) => <li key={p.scientific_name_pest}>{p.common_name_pest}</li>)}
                </ul>
              </div>
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default DrawingTools;