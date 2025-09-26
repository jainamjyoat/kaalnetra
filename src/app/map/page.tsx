'use client';

// --- Types and flower locations for phenology-rich map ---
type LifeStage = { stage: string; description: string };
type PhenologyDetails = {
  lifeCycleStages: LifeStage[];
  climateImpact: string[];
  analysis: string;
  temperature: { min: number; max: number; unit: string };
  bloomingPeriod: string;
  peakBloom: string;
  region: string;
  climate: string;
  researchCentre?: { name: string; url?: string; location?: string };
};
type FlowerLocation = {
  id: string;
  name: string;
  scientificName?: string;
  position: { lat: number; lng: number };
  emoji?: string;
  accentColor?: string;
  details: PhenologyDetails;
};
const FLOWER_LOCATIONS: FlowerLocation[] = [
  // Japan
  {
    id: 'tokyo-sakura',
    name: 'Cherry Blossom (Sakura)',
    scientificName: 'Prunus serrulata',
    position: { lat: 35.6762, lng: 139.6503 },
    emoji: '🌸',
    accentColor: '#f472b6',
    details: {
      lifeCycleStages: [
        { stage: 'Bud Formation', description: 'Buds form in late winter as the temperature rises.' },
        { stage: 'Bloom', description: 'Full bloom usually in March–April.' },
        { stage: 'Petal Fall', description: 'Petals drop after about 1–2 weeks.' },
        { stage: 'Leaf Expansion', description: 'Green leaves emerge post-bloom.' },
      ],
      climateImpact: [
        'Bloom timing advances with warming.',
        'Late frosts damage buds.'
      ],
      analysis: 'Urban warmth affects early blooms.',
      temperature: { min: 2, max: 18, unit: '°C' },
      bloomingPeriod: 'March–April',
      peakBloom: 'Early April',
      region: 'Tokyo, Japan',
      climate: 'Temperate',
    },
  },
  // Netherlands
  {
    id: 'amsterdam-tulip',
    name: 'Tulip',
    scientificName: 'Tulipa gesneriana',
    position: { lat: 52.3702, lng: 4.8952 },
    emoji: '🌷',
    accentColor: '#fb7185',
    details: {
      lifeCycleStages: [
        { stage: 'Planting', description: 'Bulbs planted in autumn.' },
        { stage: 'Sprout', description: 'Sprouts emerge as winter ends.' },
        { stage: 'Bloom', description: 'Bright flowers in Dutch fields.' },
        { stage: 'Senescence', description: 'Leaves yellow then die back.' },
      ],
      climateImpact: [
        'Needs winter chill.',
        'Heat shortens bloom.'
      ],
      analysis: 'Fields bloom mid-late April.',
      temperature: { min: 3, max: 15, unit: '°C' },
      bloomingPeriod: 'April–May',
      peakBloom: 'End April',
      region: 'Amsterdam Area, NL',
      climate: 'Maritime',
    },
  },
  // India (Lotus)
  {
    id: 'delhi-lotus',
    name: 'Lotus',
    scientificName: 'Nelumbo nucifera',
    position: { lat: 28.6139, lng: 77.209 },
    emoji: '🪷',
    accentColor: '#ed81c8',
    details: {
      lifeCycleStages: [
        { stage: 'Sprouting', description: 'Lotus roots develop as water warms.' },
        { stage: 'Leaf Emergence', description: 'Large leaves unfurl.' },
        { stage: 'Bud', description: 'Pink or white buds appear.' },
        { stage: 'Bloom', description: 'Spectacular blooms above water.' },
      ],
      climateImpact: [
        'Needs calm, shallow water.',
        'Flowers best in warm, sunny ponds.'
      ],
      analysis: 'India’s national flower. Blooms June–Sept.',
      temperature: { min: 16, max: 35, unit: '°C' },
      bloomingPeriod: 'June–September',
      peakBloom: 'July',
      region: 'Delhi, India',
      climate: 'Monsoonal',
    },
  },
  // USA (Sunflower)
  {
    id: 'usa-sunflower',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    position: { lat: 39.0997, lng: -94.5786 }, // Kansas City
    emoji: '🌻',
    accentColor: '#fbbf24',
    details: {
      lifeCycleStages: [
        { stage: 'Seed', description: 'Seeds planted in spring.' },
        { stage: 'Growth', description: 'Stems and heads develop.' },
        { stage: 'Bloom', description: 'Bright yellow heads peak in July.' },
        { stage: 'Seeds Dry', description: 'Seeds mature late summer.' },
      ],
      climateImpact: [
        'Loves sun, deep soil.',
        'Drought lowers yield.'
      ],
      analysis: 'Midwest US icon.',
      temperature: { min: 14, max: 32, unit: '°C' },
      bloomingPeriod: 'June–August',
      peakBloom: 'July',
      region: 'Midwest, USA',
      climate: 'Continental',
    },
  },
  // South Africa (Protea)
  {
    id: 'ct-protea',
    name: 'Protea',
    scientificName: 'Protea cynaroides',
    position: { lat: -33.9249, lng: 18.4241 }, // Cape Town
    emoji: '🌺',
    accentColor: '#fbbf24',
    details: {
      lifeCycleStages: [
        { stage: 'Sprout', description: 'Protea seedlings emerge in wet season.' },
        { stage: 'Bud', description: 'Flower buds slowly develop.' },
        { stage: 'Bloom', description: 'Large heads open in southern spring.' },
        { stage: 'Seed', description: 'Seeds dispersed by wind.' },
      ],
      climateImpact: [
        'Adapts to fire-prone dry ecosystem.',
        'Drought and fire-tolerant.'
      ],
      analysis: 'Cape region wildflower icon.',
      temperature: { min: 8, max: 25, unit: '°C' },
      bloomingPeriod: 'August–November',
      peakBloom: 'September',
      region: 'Cape Town, South Africa',
      climate: 'Mediterranean',
    },
  },
  // Israel (Anemone)
  {
    id: 'israel-anemone',
    name: 'Anemone',
    scientificName: 'Anemone coronaria',
    position: { lat: 31.7683, lng: 35.2137 }, // Jerusalem
    emoji: '❣️',
    accentColor: '#ef4444',
    details: {
      lifeCycleStages: [
        { stage: 'Emergence', description: 'Red blossoms appear in early spring.' },
        { stage: 'Full Bloom', description: 'Fields of scarlet in the “Darom Adom” festival.' },
      ],
      climateImpact: [
        'Needs mild, rainy winters.',
        'Heat causes rapid decline.'
      ],
      analysis: 'Israel wildflower festival highlight.',
      temperature: { min: 7, max: 18, unit: '°C' },
      bloomingPeriod: 'February–March',
      peakBloom: 'Late February',
      region: 'Jerusalem, Israel',
      climate: 'Mediterranean',
    },
  },
  // Australia (Waratah)
  {
    id: 'sydney-waratah',
    name: 'Waratah',
    scientificName: 'Telopea speciosissima',
    position: { lat: -33.8688, lng: 151.2093 }, // Sydney
    emoji: '🟥',
    accentColor: '#dc2626',
    details: {
      lifeCycleStages: [
        { stage: 'Growth', description: 'Leaves and buds develop in late winter.' },
        { stage: 'Bloom', description: 'Spectacular red blooms in spring.' },
      ],
      climateImpact: [
        'Tolerates dry soils.',
        'Sensitive to root rot.'
      ],
      analysis: 'Famous New South Wales floral symbol.',
      temperature: { min: 8, max: 24, unit: '°C' },
      bloomingPeriod: 'September–November',
      peakBloom: 'October',
      region: 'Sydney, Australia',
      climate: 'Temperate',
    },
  },
  // UK (Bluebell)
  {
    id: 'uk-bluebell',
    name: 'Bluebell',
    scientificName: 'Hyacinthoides non-scripta',
    position: { lat: 51.5074, lng: -0.1278 }, // London
    emoji: '🔔',
    accentColor: '#60a5fa',
    details: {
      lifeCycleStages: [
        { stage: 'Emergence', description: 'Leaves and shoots emerge in March.' },
        { stage: 'Full Bloom', description: 'Blue carpets in ancient woodlands.' },
        { stage: 'Dormancy', description: 'Leaves die back by July.' },
      ],
      climateImpact: [
        'Cool, damp soils vital.',
        'Vulnerable to drought.'
      ],
      analysis: 'Iconic British spring flower.',
      temperature: { min: 2, max: 16, unit: '°C' },
      bloomingPeriod: 'April–May',
      peakBloom: 'Late April',
      region: 'London, UK',
      climate: 'Temperate Atlantic',
    },
  },
];
// Removed duplicate/erroneous FLOWER_LOCATIONS definition block (clean - fixed build error)

// --- END Types and flower locations ---

import React, { useEffect, useState } from 'react';
import { APIProvider, Map as GoogleMap, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { Marker } from '@vis.gl/react-google-maps';

// FlowerMarkers component: renders markers using @vis.gl/react-google-maps
function FlowerMarkers({ onMarkerClick }: { onMarkerClick: (flower: FlowerLocation) => void }) {
  return (
    <>
      {FLOWER_LOCATIONS.map((flower) => (
        <Marker
          key={flower.id}
          position={flower.position}
          onClick={() => onMarkerClick(flower)} 
          label={{
            text: flower.emoji || '🌸',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            className: undefined,
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: flower.accentColor || '#8ab4f8',
            fillOpacity: 1,
            strokeColor: '#22223b',
            strokeWeight: 2,
          }}
        />
      ))}
    </>
  );
}

// FlowerModal component: shows phenology and research details in an animated modal
function FlowerModal({ open, onClose, flower }: { open: boolean; onClose: () => void; flower: FlowerLocation | null }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (open) { const id = requestAnimationFrame(() => setShow(true)); return () => cancelAnimationFrame(id); }
    else { setShow(false); }
  }, [open]);
  if (!open || !flower) return null;
  const accent = flower.accentColor || '#93c5fd';
  const overlayStyle: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, transition: 'opacity 250ms ease', opacity: show ? 1 : 0 };
  const panelStyle: React.CSSProperties = { width: 'min(920px, 92vw)', maxHeight: '82vh', overflow: 'auto', background: '#0b1220', color: '#e5e7eb', border: '1px solid #1f2a44', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', transform: show ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)', transition: 'transform 250ms ease, opacity 250ms ease', opacity: show ? 1 : 0 };
  const sectionStyle: React.CSSProperties = { padding: 16, borderBottom: '1px solid #111827' };
  const chipStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0f172a', border: `1px solid ${accent}40`, padding: '8px 10px', borderRadius: 999, fontSize: 13, color: '#e5e7eb', };
  const labelStyle: React.CSSProperties = { color: '#9ca3af', fontSize: 12 };
  const barBg: React.CSSProperties = { height: 6, background: '#0f172a', border: '1px solid #1f2a44', borderRadius: 999, overflow: 'hidden' };
  const bar = (value: number, color = accent) => (<div style={barBg}><div style={{ width: `${value}%`, height: '100%', background: color }} /></div>);
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={panelStyle} onClick={e => e.stopPropagation()}>
        <div style={{ position: 'sticky', top: 0, background: 'linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(15,23,42,0.85) 100%)', borderBottom: '1px solid #1f2a44', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', background: `radial-gradient(60% 60% at 50% 40%, ${accent}66, transparent)`, border: `1px solid ${accent}66`, fontSize: 20 }}>{flower.emoji || '🌼'}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{flower.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{flower.scientificName || '—'}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ border: '1px solid #1f2a44', background: '#0f172a', color: '#e5e7eb', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}>Close</button>
        </div>
        <div style={{ ...sectionStyle, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span style={chipStyle}>Region: <strong>{flower.details.region}</strong></span>
          <span style={chipStyle}>Climate: <strong>{flower.details.climate}</strong></span>
          <span style={chipStyle}>Blooming Period: <strong>{flower.details.bloomingPeriod}</strong></span>
          <span style={chipStyle}>Peak Bloom: <strong>{flower.details.peakBloom}</strong></span>
          <span style={chipStyle}>Temperature: <strong>{`${flower.details.temperature.min}–${flower.details.temperature.max}${flower.details.temperature.unit}`}</strong></span>
        </div>
        <div style={sectionStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: accent }}>Life Cycle Stages</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {flower.details.lifeCycleStages.map((s, idx) => (
              <div key={idx} style={{ border: '1px solid #1f2a44', borderRadius: 10, padding: 12, background: '#0f172a' }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>{s.stage}</div>
                <div style={{ fontSize: 13, color: '#9ca3af' }}>{s.description}</div>
                <div style={{ marginTop: 10 }}>{bar(25 + (idx * 20) % 60)}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ border: '1px solid #1f2a44', borderRadius: 10, padding: 12, background: '#0f172a' }}>
              <div style={{ fontWeight: 600, marginBottom: 6, color: accent }}>Climate Impact</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#9ca3af' }}>
                {flower.details.climateImpact.map((c, i) => (<li key={i} style={{ marginBottom: 6 }}>{c}</li>))}
              </ul>
            </div>
            <div style={{ border: '1px solid #1f2a44', borderRadius: 10, padding: 12, background: '#0f172a' }}>
              <div style={{ fontWeight: 600, marginBottom: 6, color: accent }}>Special Analysis</div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>{flower.details.analysis}</div>
            </div>
          </div>
        </div>
        {/* Phenology research centre section removed as this field no longer exists */}
        <div style={{ ...sectionStyle, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Temperature', 'Blooming Period', 'Region', 'Peak Bloom', 'Climate'].map((k, i) => (<span key={i} style={{ ...chipStyle, border: `1px dashed ${accent}55` }}>{k}</span>))}
        </div>
      </div>
    </div>
  );
}

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
    isMobile ? (
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
        top: '80px', // Move box downward to clear navbar
        left: '36px', // Move box left for better visibility if needed
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
    )
  );
}

export default function MapPage() {
  const position = { lat: 22.5726, lng: 88.3639 };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const darkMapId = 'f5a527ffab781fb81f077b38';
  const mapid = process.env.NEXT_PUBLIC_MAP_ID || darkMapId
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<FlowerLocation | null>(null);
  
  if (!apiKey) {
  return <div>Error: API Key is missing. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.</div>;
  }

  return (
    <APIProvider apiKey={apiKey} libraries={['drawing', 'geometry', 'marker']}>
      <div style={{ height: "100dvh", width: "100%", position: "relative" }}>
        
        
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
          <FlowerMarkers onMarkerClick={f => { setSelectedFlower(f); setModalOpen(true); }} />
          <DrawingTools />
        </GoogleMap>
        <FlowerModal open={modalOpen} flower={selectedFlower} onClose={() => setModalOpen(false)} />
      </div>
    </APIProvider>
  );
}