import { NextResponse } from 'next/server';

/**
 * API route to expose environment variables to the client
 * This allows us to keep variables server-side without NEXT_PUBLIC_ prefix
 */
export async function GET() {
  return NextResponse.json({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    apiUrl: process.env.API_URL || '',
    mapId: process.env.MAP_ID || '',
  });
}
