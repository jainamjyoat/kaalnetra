'use client';

import React, { useEffect, useState } from 'react';
import { Marker, InfoWindow, useMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import FLOWER_PIN from './flower pin.gif';

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBiome, setSelectedBiome] = useState<BiomeResult | null>(null);
  const [summaryMap, setSummaryMap] = useState<Record<string, string>>({});
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [activeSpeciesKey, setActiveSpeciesKey] = useState<string | null>(null);

  // Guided tour state for DrawingTools controls
  const [tourActive, setTourActive] = useState(false);
  const [tourSteps, setTourSteps] = useState<{ el: HTMLElement; title: string; content: string }[]>([]);
  const [tourIndex, setTourIndex] = useState(0);
  const [tourRect, setTourRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  // Initialize steps after mount
  useEffect(() => {
    // Respect prior completion
    try {
      const seen = localStorage.getItem('tour_drawing_tools_completed') === '1';
      if (seen) {
        setTourActive(false);
        return;
      }
    } catch {}

    const defs = [
      { selector: '[data-tour="tools-shapes-group"]', title: 'Draw tools', content: 'Use Rectangle, Circle, or Polygon to draw an area for analysis.' },
      { selector: '[data-tour="tool-clear"]', title: 'Clear', content: 'Remove the drawn shape and reset the analysis.' },
      { selector: '[data-tour="tool-theme"]', title: 'Theme', content: 'Toggle between dark and light map themes.' },
      { selector: '[data-tour="tools-zoom-group"]', title: 'Zoom', content: 'Use + and − to zoom the map.' },
      { selector: '[data-tour="input-time"]', title: 'Time', content: 'Select the month and year for the ecology analysis.' },
      { selector: '[data-tour="run-analysis"]', title: 'Run Analysis', content: 'Run the ecology analysis for the selected shape and time.' },
    ];
    const available = defs
      .map((d) => ({ ...d, el: document.querySelector(d.selector) as HTMLElement | null }))
      .filter((d): d is { selector: string; title: string; content: string; el: HTMLElement } => !!d.el)
      .map(({ el, title, content }) => ({ el, title, content }));

    setTourSteps(available);
    setTourIndex(0);
    setTourActive(available.length > 0);
  }, []);

  // Keep spotlight aligned to current target and block interactions until advancing
  useEffect(() => {
    if (!tourActive || !tourSteps[tourIndex]?.el) {
      setTourRect(null);
      return;
    }
    const el = tourSteps[tourIndex].el;
    const update = () => {
      const r = el.getBoundingClientRect();
      setTourRect({ top: r.top + window.scrollY, left: r.left + window.scrollX, width: r.width, height: r.height });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, { passive: true } as AddEventListenerOptions);
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [tourActive, tourSteps, tourIndex]);

  const finishTour = () => {
    try { localStorage.setItem('tour_drawing_tools_completed', '1'); } catch {}
    setTourActive(false);
  };
  const nextTour = () => {
    if (tourIndex < tourSteps.length - 1) setTourIndex((i) => i + 1);
    else finishTour();
  };
  const skipTour = () => finishTour();

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

  const handleZoom = (delta: number) => {
    if (!map) return;
    const current = map.getZoom() ?? 0;
    const next = Math.min(21, Math.max(1, current + delta));
    map.setZoom(next);
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

  // Media used for the custom map marker loaded from src/components/map/flower pin.gif
  // Next.js image imports can return an object (StaticImport). Resolve to a string URL.
  const FLOWER_PIN_SRC: string = (typeof FLOWER_PIN === 'string' ? FLOWER_PIN : (FLOWER_PIN as any)?.src ?? '');
  const PUBLIC_FLOWER_PIN_SRC = '/Video/flower%20pin.gif';

  // Local fallback summary generator (used if Gemini fails)
  const fallbackSummary = (s: Species, biomeName: string) => {
    const name = s.common_name || s.scientific_name || 'This plant';
    const sci = s.scientific_name ? ` (${s.scientific_name})` : '';
    const stage = s.phenophase ? ` It is typically observed in the ${s.phenophase.toLowerCase()} stage during its active season.` : '';
    const biomeText = biomeName ? ` Within the ${biomeName} biome, it adapts to local climate patterns and soils.` : '';
    return `${name}${sci} is a commonly documented species in this region.${biomeText}${stage}`.trim();
  };

  // Fetch a summary for a given species (cached by scientific/common name + biome)
  const fetchSummary = async (s: Species, biomeName: string) => {
    const key = `${s.scientific_name || s.common_name}::${selectedBiome?.biome || biomeName}`;
    if (!key || summaryMap[key]) return;
    try {
      setSummaryError(null);
      setSummaryLoading(true);
      const res = await fetch('/api/flower-summary', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scientific_name: s.scientific_name, common_name: s.common_name, biome_name: biomeName })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to get summary');
      setSummaryMap((m) => ({ ...m, [key]: data.summary || 'No summary available.' }));
    } catch (e: any) {
      // Graceful fallback: synthesize a concise local summary
      setSummaryMap((m) => ({ ...m, [key]: fallbackSummary(s, biomeName) }));
      setSummaryError(null);
    } finally {
      setSummaryLoading(false);
    }
  };

  // When modal opens, auto-select the first species (fetch handled in activeSpeciesKey effect)
  React.useEffect(() => {
    if (!modalOpen || !selectedBiome) return;
    const first = selectedBiome.species[0];
    if (!first) return;
    const key = `${first.scientific_name || first.common_name}::${selectedBiome.biome}`;
    setActiveSpeciesKey(key);
    // Do not fetch here; avoid double requests. Fetch occurs when activeSpeciesKey changes.
  }, [modalOpen, selectedBiome]);

  // When the active species changes, fetch if not cached
  React.useEffect(() => {
    if (!activeSpeciesKey || !selectedBiome) return;
    const name = activeSpeciesKey.split('::')[0];
    const s = selectedBiome.species.find(x => (x.scientific_name || x.common_name) === name);
    if (s && !summaryMap[activeSpeciesKey]) fetchSummary(s, selectedBiome.biome_name);
  }, [activeSpeciesKey]);

  return (
    <>
      <div style={{ position: 'absolute', top: '80px', left: '24px', zIndex: 1000, background: '#0f172a', color: '#e5e7eb', padding: '14px', borderRadius: '10px', boxShadow: '0 2px 18px rgba(0,0,0,0.42)', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '320px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <div data-tour="tools-shapes-group" style={{ display: 'flex', gap: '8px' }}>
            <button data-tour="tool-rectangle" onClick={() => handleToolSelect('rectangle')} style={btnStyle('rectangle')}>Rectangle</button>
          <button data-tour="tool-circle" onClick={() => handleToolSelect('circle')} style={btnStyle('circle')}>Circle</button>
          <button data-tour="tool-polygon" onClick={() => handleToolSelect('polygon')} style={btnStyle('polygon')}>Polygon</button>
          </div>
          <button data-tour="tool-clear" onClick={deleteSelectedShape} style={{...btnStyle(''), background: '#374151'}}>Clear</button>
          <button data-tour="tool-theme" onClick={onToggleDarkMode} style={{...btnStyle(''), background: darkMode ? '#d97706' : '#1f2937' }}>{darkMode ? '☀️' : '🌙'}</button>
          <div data-tour="tools-zoom-group" style={{ display: 'flex', gap: '8px' }}>
            <button aria-label="Zoom in" onClick={() => handleZoom(1)} style={{...btnStyle(''), background: '#374151'}}>+</button>
            <button aria-label="Zoom out" onClick={() => handleZoom(-1)} style={{...btnStyle(''), background: '#374151'}}>-</button>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid #374151', paddingTop: '12px', marginTop: '4px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>🔬 Ecology Analysis</h3>
          <div data-tour="input-time" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{fontSize: '12px'}}>Month:</label>
            <input type="number" min="1" max="12" value={analysisMonth} onChange={(e) => setAnalysisMonth(parseInt(e.target.value))} style={{ width: '60px', background: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', padding: '4px' }}/>
            <label style={{fontSize: '12px'}}>Year:</label>
            <input type="number" value={analysisYear} onChange={(e) => setAnalysisYear(parseInt(e.target.value))} style={{ width: '80px', background: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', padding: '4px' }}/>
          </div>
          <button data-tour="run-analysis" onClick={handleAnalysis} disabled={isLoadingAnalysis || shapes.length === 0} style={{ width: '100%', padding: '8px', border: '1px solid #059669', borderRadius: '4px', background: '#10b981', color: 'white', cursor: 'pointer', opacity: (isLoadingAnalysis || shapes.length === 0) ? 0.6 : 1 }}>
            {isLoadingAnalysis ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
      </div>

      {/* NEW: Loop to render a marker for each biome */}
      {analysisResult?.results.map((result) => (
        <React.Fragment key={result.biome}>
          <AdvancedMarker
            position={result.location}
            title={result.biome_name}
            onClick={() => { setSelectedBiome(result); setModalOpen(true); }}
          >
            <img
              src={FLOWER_PIN_SRC || PUBLIC_FLOWER_PIN_SRC}
              alt={result.biome_name}
              draggable={false}
              style={{ width: 56, height: 56, display: 'block' }}
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                if (t.src !== PUBLIC_FLOWER_PIN_SRC) {
                  t.src = PUBLIC_FLOWER_PIN_SRC;
                }
              }}
            />
          </AdvancedMarker>
        </React.Fragment>
      ))}

      {/* Modal for biome details */}
      {modalOpen && selectedBiome && (
        <div className="biome-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="biome-modal pop-in" onClick={(e) => e.stopPropagation()}>
            <div className="biome-header">
              <div className="biome-title">{selectedBiome.biome_name} <span className="biome-code">({selectedBiome.biome})</span></div>
              <button className="biome-close" onClick={() => setModalOpen(false)}>×</button>
              <div className="biome-sub">Köppen code: {selectedBiome.biome}</div>
            </div>
            <div className="biome-metrics">
              <div className="metric"><div className="metric-label">Temperature</div><div className="metric-value">{selectedBiome.climate_data.temperature}°C</div></div>
              <div className="metric"><div className="metric-label">Precipitation</div><div className="metric-value">{selectedBiome.climate_data.precipitation} mm/day</div></div>
              <div className="metric"><div className="metric-label">Radiation</div><div className="metric-value">{selectedBiome.climate_data.radiation} W/m²</div></div>
            </div>
            <div className="biome-section">
              <div className="section-title">Predicted species</div>
              <div className="chips">
                {selectedBiome.species.slice(0,20).map((s) => {
                  const cacheKey = `${s.scientific_name || s.common_name}::${selectedBiome.biome}`;
                  const isActive = activeSpeciesKey === cacheKey;
                  return (
                    <span
                      key={s.scientific_name}
                      className={`chip ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveSpeciesKey(cacheKey)}
                    >
                      {s.common_name} <em className="chip-sub">{s.phenophase}</em>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="biome-section">
              <div className="section-title">Predicted pests</div>
              <div className="chips">
                {selectedBiome.pests.slice(0,20).map((p) => (
                  <span key={p.scientific_name_pest} className="chip chip-danger">
                    {p.common_name_pest}
                  </span>
                ))}
              </div>
            </div>
            <div className="biome-section">
              <div className="section-title">Flower summary</div>
              {summaryLoading ? (
                <div className="summary loading">Fetching summary…</div>
              ) : summaryError ? (
                <div className="summary error">{summaryError}</div>
              ) : (
                <div className="summary">
                  {activeSpeciesKey && summaryMap[activeSpeciesKey]
                    ? summaryMap[activeSpeciesKey]
                    : (activeSpeciesKey ? 'Tap a species above to load its summary.' : 'Tip: tap a species above to view its summary.')}
                </div>
              )}
            </div>
                      </div>
          <style>{`
            .biome-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.55); backdrop-filter: blur(2px); z-index: 4000; display: grid; place-items: center; }
            .biome-modal { width: min(92vw, 760px); max-height: 82vh; overflow: hidden auto; color: #fff; background: linear-gradient(180deg,#0f172a 0%, #111827 100%); border-radius: 16px; box-shadow: 0 18px 42px rgba(0,0,0,.45); border: 1px solid rgba(255,255,255,0.08); }
            .pop-in { animation: biomePop .35s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
            @keyframes biomePop { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
            .biome-header { position: sticky; top: 0; z-index: 1; padding: 16px; background: radial-gradient(80% 120% at 0% 0%, rgba(16,185,129,0.25) 0%, rgba(0,0,0,0) 60%), radial-gradient(80% 120% at 100% 0%, rgba(59,130,246,0.25) 0%, rgba(0,0,0,0) 60%), #0f172a; border-bottom: 1px solid rgba(255,255,255,0.08); }
            .biome-title { font-weight: 800; font-size: 18px; letter-spacing: .2px; }
            .biome-code { font-weight: 600; color: rgba(255,255,255,.85); }
            .biome-sub { font-size: 12px; color: rgba(255,255,255,.7); margin-top: 2px; }
            .biome-close { position: absolute; right: 12px; top: 12px; width: 32px; height: 32px; border-radius: 8px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06); color: #fff; font-size: 20px; line-height: 28px; text-align: center; cursor: pointer; }
            .biome-close:hover { background: rgba(255,255,255,.12); }
            .biome-metrics { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; padding: 14px 16px; }
            .metric { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 10px; text-align: center; }
            .metric-label { font-size: 11px; color: rgba(255,255,255,.75); }
            .metric-value { font-size: 14px; font-weight: 800; margin-top: 2px; }
            .biome-section { padding: 8px 16px 14px; }
            .section-title { font-size: 12px; color: rgba(255,255,255,.7); margin-bottom: 8px; text-transform: uppercase; letter-spacing: .06em; }
            .chips { display: flex; flex-wrap: wrap; gap: 8px; max-height: 180px; overflow: auto; }
            .chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #e5e7eb; background: rgba(59,130,246,.12); border: 1px solid rgba(59,130,246,.25); padding: 6px 10px; border-radius: 999px; cursor: pointer; }
            .chip.active { background: rgba(16,185,129,.16); border-color: rgba(16,185,129,.35); }
            .chip-sub { font-style: normal; color: #93c5fd; font-weight: 600; }
            .chip-danger { background: rgba(239,68,68,.12); border-color: rgba(239,68,68,.25); }
            .summary { font-size: 13px; color: #e5e7eb; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); padding: 10px 12px; border-radius: 12px; line-height: 1.4; }
            .summary.loading { color: #93c5fd; border-color: rgba(147,197,253,.35); background: rgba(59,130,246,.12); }
            .summary.error { color: #fecaca; border-color: rgba(248,113,113,.35); background: rgba(248,113,113,.12); }
            .biome-foot { padding: 12px 16px 16px; display: flex; gap: 8px; flex-wrap: wrap; }
            .foot-pill { font-size: 11px; color: rgba(255,255,255,.85); background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); padding: 4px 8px; border-radius: 999px; }
          `}</style>
        </div>
      )}

      
      {tourActive && tourRect && (
        <>
          {/* Overlay blocker to prevent interactions */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 3000 }}
            onClick={(e) => e.stopPropagation()}
          />
          {/* Spotlight highlight */}
          <div
            style={{
              position: 'fixed',
              top: tourRect.top - 8,
              left: tourRect.left - 8,
              width: tourRect.width + 16,
              height: tourRect.height + 16,
              borderRadius: 12,
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
              border: '2px solid #34d399',
              zIndex: 3001,
              pointerEvents: 'none',
            }}
          />
          {/* Tooltip */}
          <div
            style={{
              position: 'fixed',
              top: tourRect.top + tourRect.height + 12,
              left: Math.max(tourRect.left, 16),
              zIndex: 3002,
              maxWidth: 340,
            }}
            className="rounded-md border border-white/10 bg-neutral-900/95 p-3 text-neutral-100 shadow-lg backdrop-blur"
          >
            <div className="text-sm font-semibold text-emerald-300">{tourSteps[tourIndex].title}</div>
            <div className="text-sm text-neutral-300 mt-1">{tourSteps[tourIndex].content}</div>
            <div className="mt-3 flex gap-2 justify-end">
              <button
                type="button"
                onClick={finishTour}
                className="px-3 py-1 rounded-md border border-white/10 text-neutral-300 hover:bg-white/5"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={nextTour}
                className="px-3 py-1 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
              >
                {tourIndex === tourSteps.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DrawingTools;
