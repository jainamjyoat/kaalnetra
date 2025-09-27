import { NextResponse } from "next/server.js";
import type { NextRequest } from "next/server.js";

// Basic types
type Point = [number, number]; // [lat, lng]

// Utilities
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const deg2rad = (d: number) => (d * Math.PI) / 180;
const rad2deg = (r: number) => (r * 180) / Math.PI;

function pointInPolygon(point: Point, polygon: Point[]): boolean {
  // Ray casting algorithm
  const [x, y] = [point[1], point[0]]; // treat lng as x, lat as y
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][1], yi = polygon[i][0];
    const xj = polygon[j][1], yj = polygon[j][0];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function randomPointsInRectangle(ne: Point, sw: Point, count: number): Point[] {
  const latMin = Math.min(ne[0], sw[0]);
  const latMax = Math.max(ne[0], sw[0]);
  let lngMin = Math.min(ne[1], sw[1]);
  let lngMax = Math.max(ne[1], sw[1]);

  // If rectangle crosses antimeridian, fallback to simple non-crossing assumption
  // (could be extended to support antimeridian properly)
  const result: Point[] = [];
  for (let i = 0; i < count; i++) {
    const lat = latMin + Math.random() * (latMax - latMin);
    const lng = lngMin + Math.random() * (lngMax - lngMin);
    result.push([lat, lng]);
  }
  return result;
}

function randomPointsInCircle(center: Point, radiusMeters: number, count: number): Point[] {
  const [lat1Deg, lon1Deg] = center;
  const lat1 = deg2rad(lat1Deg);
  const lon1 = deg2rad(lon1Deg);
  const R = 6371000; // Earth radius in meters

  const pts: Point[] = [];
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const w = radiusMeters * Math.sqrt(u); // radial distance
    const t = 2 * Math.PI * v; // angle
    const delta = w / R; // angular distance

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(delta) + Math.cos(lat1) * Math.sin(delta) * Math.cos(t)
    );
    const lon2 =
      lon1 + Math.atan2(
        Math.sin(t) * Math.sin(delta) * Math.cos(lat1),
        Math.cos(delta) - Math.sin(lat1) * Math.sin(lat2)
      );

    pts.push([rad2deg(lat2), rad2deg(lon2)]);
  }
  return pts;
}

function randomPointsInPolygon(polygon: Point[], count: number): Point[] {
  // Bounding box for rejection sampling
  let latMin = Infinity, latMax = -Infinity, lngMin = Infinity, lngMax = -Infinity;
  polygon.forEach(([lat, lng]) => {
    latMin = Math.min(latMin, lat);
    latMax = Math.max(latMax, lat);
    lngMin = Math.min(lngMin, lng);
    lngMax = Math.max(lngMax, lng);
  });

  const points: Point[] = [];
  let attempts = 0;
  const maxAttempts = count * 1000; // safety bound

  while (points.length < count && attempts < maxAttempts) {
    attempts++;
    const lat = latMin + Math.random() * (latMax - latMin);
    const lng = lngMin + Math.random() * (lngMax - lngMin);
    const p: Point = [lat, lng];
    if (pointInPolygon(p, polygon)) points.push(p);
  }
  return points;
}

export async function POST(req: NextRequest, context: { params: Promise<{ shape: string }> }) {
  try {
    const { shape } = await context.params;
    const url = new URL(req.url);
    const count = clamp(Number(url.searchParams.get("count") || "100"), 1, 5000);

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // ignore empty body
    }

    if (shape === "rectangle") {
      const ne = body?.ne as Point | undefined;
      const sw = body?.sw as Point | undefined;
      if (!ne || !sw || !Array.isArray(ne) || !Array.isArray(sw)) {
        return NextResponse.json({ error: "Invalid rectangle payload: expected { ne:[lat,lng], sw:[lat,lng] }" }, { status: 400 });
      }
      const points = randomPointsInRectangle(ne, sw, count);
      return NextResponse.json({ points });
    }

    if (shape === "circle") {
      const center = body?.center as Point | undefined;
      const radius = Number(body?.radius ?? 0);
      if (!center || !Array.isArray(center) || !Number.isFinite(radius) || radius <= 0) {
        return NextResponse.json({ error: "Invalid circle payload: expected { center:[lat,lng], radius:number }" }, { status: 400 });
      }
      const points = randomPointsInCircle(center, radius, count);
      return NextResponse.json({ points });
    }

    if (shape === "polygon") {
      const pointsIn = body?.points as Point[] | undefined;
      if (!pointsIn || !Array.isArray(pointsIn) || pointsIn.length < 3) {
        return NextResponse.json({ error: "Invalid polygon payload: expected { points:[[lat,lng], ...] } with >= 3 vertices" }, { status: 400 });
      }
      const points = randomPointsInPolygon(pointsIn, count);
      return NextResponse.json({ points });
    }

    return NextResponse.json({ error: `Unsupported shape: ${shape}` }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}
