"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

type Prediction = {
  date: string;
  probability: number;
  temperature: number;
  blooms: number;
};

type BloomPhase = {
  phase: string;
  duration: string;
  status: "current" | "predicted";
  confidence: number;
};

type Hotspot = {
  region: string;
  country: string;
  bloomType: string;
  peakDate: string;
  confidence: number;
  risk: "low" | "medium" | "high" | string;
};

type Anomaly = {
  region: string;
  type: string;
  severity: "low" | "medium" | "high" | string;
  description: string;
  impact: string;
};

export default function PredictionAnalysisPage() {
  const [selectedRegion, setSelectedRegion] = useState("north-america");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30-days");

  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(scope);

    // Nav entrance
    gsap.from(q("header"), { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" });

    // Header text entrance
    gsap.from([q("[data-title]"), q("[data-subtitle]")], {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power2.out",
    });

    // Stats cards stagger
    gsap.from(q("[data-stat]"), {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      delay: 0.1,
    });

    // Sections reveal on scroll
    const sections = gsap.utils.toArray(q("[data-section]")) as HTMLElement[];
    sections.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope });

  // Mock prediction data
  const futurePredictions: Prediction[] = [
    { date: "2024-10-01", probability: 75, temperature: 18, blooms: 2800 },
    { date: "2024-10-08", probability: 82, temperature: 16, blooms: 3200 },
    { date: "2024-10-15", probability: 68, temperature: 14, blooms: 2600 },
    { date: "2024-10-22", probability: 45, temperature: 12, blooms: 1800 },
    { date: "2024-10-29", probability: 35, temperature: 10, blooms: 1200 },
    { date: "2024-11-05", probability: 25, temperature: 8, blooms: 800 },
    { date: "2024-11-12", probability: 15, temperature: 6, blooms: 400 },
    { date: "2024-11-19", probability: 12, temperature: 5, blooms: 200 },
  ];

  const bloomPhases: BloomPhase[] = [
    { phase: "Pre-bloom", duration: "2-3 weeks", status: "current", confidence: 85 },
    { phase: "Early bloom", duration: "1-2 weeks", status: "predicted", confidence: 78 },
    { phase: "Peak bloom", duration: "3-5 days", status: "predicted", confidence: 72 },
    { phase: "Late bloom", duration: "1 week", status: "predicted", confidence: 65 },
    { phase: "Post-bloom", duration: "2-3 weeks", status: "predicted", confidence: 58 },
  ];

  const hotspots: Hotspot[] = [
    {
      region: "Pacific Northwest",
      country: "USA",
      bloomType: "Cherry Blossoms",
      peakDate: "2024-10-15",
      confidence: 87,
      risk: "low",
    },
    {
      region: "Kanto Region",
      country: "Japan",
      bloomType: "Sakura",
      peakDate: "2024-10-08",
      confidence: 92,
      risk: "low",
    },
    {
      region: "Provence",
      country: "France",
      bloomType: "Lavender",
      peakDate: "2024-10-22",
      confidence: 74,
      risk: "medium",
    },
    {
      region: "California Central Valley",
      country: "USA",
      bloomType: "Almond Trees",
      peakDate: "2024-11-01",
      confidence: 68,
      risk: "high",
    },
  ];

  const anomalies: Anomaly[] = [
    {
      region: "Amazon Basin",
      type: "Delayed Bloom",
      severity: "high",
      description: "Unusually late flowering due to extended dry season",
      impact: "Ecosystem disruption, reduced pollinator activity",
    },
    {
      region: "Siberian Tundra",
      type: "Early Bloom",
      severity: "medium",
      description: "Earlier than expected spring flowering",
      impact: "Potential mismatch with pollinator emergence",
    },
    {
      region: "Australian Outback",
      type: "Bloom Intensity",
      severity: "low",
      description: "Higher than predicted bloom density",
      impact: "Increased wildlife activity, positive ecosystem impact",
    },
  ];

  // Deterministic date formatting to avoid hydration mismatches
  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return `${parseInt(m, 10)}/${parseInt(d, 10)}/${y}`;
  };

  const getRiskColor = (risk: Hotspot["risk"]) => {
    switch (risk) {
      case "low":
        return "bg-emerald-400/10 text-emerald-300";
      case "medium":
        return "bg-yellow-400/10 text-yellow-300";
      case "high":
        return "bg-red-400/10 text-red-300";
      default:
        return "bg-white/10 text-neutral-200";
    }
  };

  const getSeverityColor = (severity: Anomaly["severity"]) => {
    switch (severity) {
      case "low":
        return "text-emerald-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
      default:
        return "text-neutral-400";
    }
  };

  return (
    <div ref={scope} className="min-h-screen bg-neutral-950 text-neutral-100 p-6 pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 data-title className="text-3xl font-semibold text-emerald-300">AI Bloom Predictions</h1>
            <p data-subtitle className="text-emerald-400">Advanced forecasting powered by machine learning</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="region" className="text-sm text-neutral-300">Region</label>
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-48 rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="north-america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="south-america">South America</option>
                <option value="africa">Africa</option>
                <option value="australia">Australia</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="timeframe" className="text-sm text-neutral-300">Timeframe</label>
              <select
                id="timeframe"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-40 rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="30-days">30 Days</option>
                <option value="90-days">90 Days</option>
                <option value="1-year">1 Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Model Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            { label: "Model Accuracy", value: "87.3%", sub: "Last 30 days", color: "purple" },
            { label: "Predictions Made", value: "12,847", sub: "This month", color: "blue" },
            { label: "Active Alerts", value: "3", sub: "Anomalies detected", color: "orange" },
            { label: "Next Update", value: "6h", sub: "Model refresh", color: "green" },
          ].map((stat) => (
            <div data-stat key={stat.label} className="rounded-lg border border-white/10 bg-neutral-900 p-6 shadow-none">
              <p className="text-sm text-neutral-300">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-neutral-400">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Prediction Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Bloom Probability Over Time */}
          <div data-section className="rounded-lg border border-white/10 bg-neutral-900">
            <div className="border-b border-white/10 p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-300">
                <span>Bloom Probability Forecast</span>
              </h2>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {futurePredictions.map((row) => (
                  <div key={row.date} className="flex items-center gap-3">
                    <div className="w-28 shrink-0 text-sm text-neutral-400">
                      {formatDate(row.date)}
                    </div>
                    <div className="relative h-3 flex-1 rounded-full bg-white/10">
                      <div
                        className="h-3 rounded-full bg-violet-500/60"
                        style={{ width: `${row.probability}%` }}
                      />
                    </div>
                    <div className="w-14 shrink-0 text-right text-sm font-medium text-violet-300">
                      {row.probability}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Temperature vs Bloom Correlation */}
          <div data-section className="rounded-lg border border-white/10 bg-neutral-900">
            <div className="border-b border-white/10 p-5">
              <h2 className="text-lg font-semibold text-emerald-300">Temperature Impact Prediction</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2 text-xs font-medium text-neutral-400">
                <div>Date</div>
                <div className="text-center">Blooms</div>
                <div className="text-right">Temperature (°C)</div>
              </div>
              <div className="divide-y divide-white/10">
                {futurePredictions.map((row) => (
                  <div key={row.date} className="grid grid-cols-3 gap-2 py-2 text-sm">
                    <div className="text-neutral-300">{formatDate(row.date)}</div>
                    <div className="text-center text-emerald-300">{row.blooms.toLocaleString()}</div>
                    <div className="text-right text-amber-300">{row.temperature}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bloom Phase Timeline */}
        <div data-section className="rounded-lg border border-white/10 bg-neutral-900">
          <div className="border-b border-white/10 p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-300">
              <span>Predicted Bloom Phase Timeline</span>
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {bloomPhases.map((phase, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-neutral-800 p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-4 w-4 rounded-full ${phase.status === "current" ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <div>
                      <h4 className="font-medium text-neutral-100">{phase.phase}</h4>
                      <p className="text-sm text-neutral-400">Duration: {phase.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-neutral-400">Confidence</p>
                      <div className="h-2 w-24 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${phase.confidence}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-emerald-300">{phase.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future Bloom Hotspots */}
        <div data-section className="rounded-lg border border-white/10 bg-neutral-900">
          <div className="border-b border-white/10 p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-300">
              <span>Predicted Bloom Hotspots</span>
            </h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {hotspots.map((hotspot, index) => (
                <div key={index} className="rounded-lg border border-white/10 p-4 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-neutral-100">{hotspot.region}</h4>
                      <p className="text-sm text-neutral-400">{hotspot.country}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getRiskColor(hotspot.risk)}`}>
                      {hotspot.risk} risk
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-emerald-400">Bloom Type:</span> {hotspot.bloomType}
                    </p>
                    <p>
                      <span className="text-emerald-400">Peak Date:</span> {hotspot.peakDate}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Confidence:</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${hotspot.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{hotspot.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Anomaly Alerts */}
        <div data-section className="rounded-lg border border-white/10 bg-neutral-900">
          <div className="border-b border-white/10 p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-300">
              <span>Anomaly Detection Alerts</span>
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {anomalies.map((anomaly, index) => (
                <div key={index} className="flex flex-col gap-2 rounded-md border-l-4 border-orange-400 bg-orange-400/10 p-4 text-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-neutral-100">{anomaly.region}</h4>
                      <p className="text-neutral-400">{anomaly.type}</p>
                    </div>
                    <span className={`rounded border px-2 py-0.5 text-xs font-medium ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity} severity
                    </span>
                  </div>
                  <p className="text-emerald-400">{anomaly.description}</p>
                  <p className="text-neutral-300">
                    <strong>Potential Impact:</strong> {anomaly.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
