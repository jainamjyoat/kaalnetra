"use client";

import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

// Data model for blooms
interface Bloom {
  id: string;
  species: string;
  commonName: string;
  coords: [number, number]; // [lat, lng]
  climate: string;
  vegetation: string;
  bloomPeriod: string;
  phenology: {
    stage: string;
    peakMonth: string;
    probability: number; // 0..1
  };
}

const SAMPLE_BLOOMS: Bloom[] = [
  {
    id: "1",
    species: "Prunus serrulata",
    commonName: "Japanese Cherry (Sakura)",
    coords: [35.6762, 139.6503],
    climate: "Temperate, humid subtropical",
    vegetation: "Urban parks, ornamental plantings",
    bloomPeriod: "March - April",
    phenology: { stage: "Flowering", peakMonth: "April", probability: 0.9 },
  },
  {
    id: "2",
    species: "Lavandula angustifolia",
    commonName: "English Lavender",
    coords: [43.9493, 4.8055],
    climate: "Mediterranean",
    vegetation: "Scrubland, cultivated fields",
    bloomPeriod: "June - August",
    phenology: { stage: "Flowering", peakMonth: "July", probability: 0.8 },
  },
  {
    id: "3",
    species: "Rhododendron arboreum",
    commonName: "Buransh (Rhododendron)",
    coords: [30.0668, 79.0193],
    climate: "Montane, temperate",
    vegetation: "Himalayan forests",
    bloomPeriod: "February - April",
    phenology: { stage: "Flowering", peakMonth: "March", probability: 0.75 },
  },
];

export default function FloraMapPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const [blooms] = useState<Bloom[]>(SAMPLE_BLOOMS);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!mapContainerRef.current || mapRef.current) return;
      const Leaflet = await import("leaflet");

      // Initialize map
      const container = mapContainerRef.current as HTMLElement;
      // If the container was previously used by a Leaflet map (e.g., HMR/StrictMode), reset it
      if ((container as any)?._leaflet_id) {
        container.innerHTML = "";
        delete (container as any)._leaflet_id;
      }
      const map = Leaflet.map(container, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        worldCopyJump: true,
      });
      mapRef.current = map;

      // Base tiles
      Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Default marker icon (use CDN to avoid bundling images)
      const defaultIcon = Leaflet.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Plot blooms
      blooms.forEach((b) => {
        const popupHtml = `
        <div class="max-w-[260px]">
          <div class="mb-1 text-sm font-semibold">${b.commonName}</div>
          <div class="mb-2 text-xs text-neutral-600 dark:text-neutral-300 italic">${b.species}</div>
          <ul class="mb-2 list-disc space-y-1 pl-4 text-sm">
            <li><span class="font-medium">Climate:</span> ${b.climate}</li>
            <li><span class="font-medium">Vegetation:</span> ${b.vegetation}</li>
            <li><span class="font-medium">Bloom:</span> ${b.bloomPeriod}</li>
          </ul>
          <div class="rounded-md bg-black/5 p-2 text-xs dark:bg_white/10">
            <div><span class="font-medium">Phenology Stage:</span> ${b.phenology.stage}</div>
            <div><span class="font-medium">Peak Month:</span> ${b.phenology.peakMonth}</div>
            <div class="mt-1">
              <span class="font-medium">Bloom Probability:</span> ${Math.round(
                b.phenology.probability * 100
              )}%
              <div class="mt-1 h-1 w-full rounded bg-black/10 dark:bg-white/20">
                <div class="h-1 rounded bg-emerald-500" style="width: ${Math.round(
                  b.phenology.probability * 100
                )}%;"></div>
              </div>
            </div>
          </div>
        </div>`;

        Leaflet.marker(b.coords, { icon: defaultIcon }).addTo(map).bindPopup(popupHtml);
      });
    };

    init();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = "";
        delete (mapContainerRef.current as any)._leaflet_id;
      }
    };
  }, [blooms]);

  return (
    <div className="min-h-screen w-full">
      <div className="h-[64px] w-full border-b border-white/10 bg-black text-white">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <a href="/" className="font-semibold">
            Kaalnetra Flora Atlas
          </a>
          <span className="text-sm text-white/70">Interactive Bloom Map</span>
        </div>
      </div>

      <div className="relative min-h-[calc(100vh-64px)] w-full">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>
    </div>
  );
}
