/*
InteractiveMap.tsx
A drop-in React + TypeScript component for the sikkim-360-explore project.

Features:
- Displays geo-tagged monastery locations (sample GeoJSON array included).
- Sidebar with list, search/filter, and quick links to local tourism services.
- Route planner: pick start and end monastery to draw a route (polyline).
- Nearby attractions finder (shows attractions within an adjustable radius).

How to add to your project:
1. Install dependencies:
   npm install react-leaflet leaflet
   # If using routing with server-side routing or advanced features, you can add a routing plugin later.

2. Important: ensure Leaflet CSS is imported in your app (e.g. src/main.tsx or index.css):
   import 'leaflet/dist/leaflet.css';

3. Save this file as src/components/InteractiveMap.tsx and import it where needed:
   import InteractiveMap from '@/components/InteractiveMap';
   <InteractiveMap />

Notes:
- This component uses plain react-leaflet and Tailwind classes already present in the repository.
- Replace SAMPLE_DATA with your real monastery GeoJSON or fetch from an endpoint.
*/

import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';

// Fix default icon issues when bundlers don't load images automatically
import 'leaflet/dist/leaflet.css';
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Sample monastery and attraction data (replace this with your real dataset)
type Place = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  tags?: string[];
  serviceLink?: string; // link to local tourism service or booking
};

const SAMPLE_MONASTERIES: Place[] = [
  {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    lat: 27.3302,
    lng: 88.4953,
    description: 'One of the largest and most important monasteries in Sikkim.',
    tags: ['monastery', 'historic'],
    serviceLink: 'https://www.sikkimtourism.gov.in/',
  },
  {
    id: 'tashiding',
    name: 'Tashiding Monastery',
    lat: 27.2720,
    lng: 88.3477,
    description: 'Sacred monastery on a hill overlooking the Rathong river.',
    tags: ['monastery'],
    serviceLink: 'https://www.example-tour-service.com/tashiding',
  },
  {
    id: 'phodong',
    name: 'Phodong Monastery',
    lat: 27.3120,
    lng: 88.5120,
    description: 'Known for its annual festivals and murals.',
    tags: ['monastery'],
    serviceLink: 'https://www.example-tour-service.com/phodong',
  },
];

const SAMPLE_ATTRACTIONS: Place[] = [
  {
    id: 'khangchendzonga-view',
    name: 'Kangchenjunga Viewpoint',
    lat: 27.333,
    lng: 88.445,
    description: 'Scenic viewpoint for mountain vistas.',
    tags: ['viewpoint', 'trek'],
    serviceLink: 'https://www.sikkimtourism.gov.in/',
  },
  {
    id: 'local-market',
    name: 'Gangtok Local Market',
    lat: 27.338,
    lng: 88.606,
    description: 'Handicrafts and local food stalls.',
    tags: ['market'],
    serviceLink: 'https://www.example-tour-service.com/gangtok-market',
  },
];

function FitBounds({ bounds }: { bounds: LatLngExpression[] | null }) {
  const map = useMap();
  if (!bounds || bounds.length === 0) return null;
  try {
    const lb = L.latLngBounds(bounds as any);
    map.fitBounds(lb, { padding: [40, 40] });
  } catch (e) {
    // ignore
  }
  return null;
}

export default function InteractiveMap() {
  const [monasteries] = useState<Place[]>(SAMPLE_MONASTERIES);
  const [attractions] = useState<Place[]>(SAMPLE_ATTRACTIONS);
  const [query, setQuery] = useState('');
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [nearbyRadiusKm, setNearbyRadiusKm] = useState(10);
  const [showNearbyFor, setShowNearbyFor] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return monasteries;
    return monasteries.filter((m) => m.name.toLowerCase().includes(q) || (m.tags || []).join(' ').includes(q));
  }, [monasteries, query]);

  const startPlace = monasteries.find((m) => m.id === selectedStart) || null;
  const endPlace = monasteries.find((m) => m.id === selectedEnd) || null;

  const routeLatLngs: LatLngExpression[] = useMemo(() => {
    if (!startPlace || !endPlace) return [];
    return [
      [startPlace.lat, startPlace.lng],
      [endPlace.lat, endPlace.lng],
    ];
  }, [startPlace, endPlace]);

  // compute attractions within radius of a monastery
  const nearbyAttractions = useMemo(() => {
    if (!showNearbyFor) return [];
    const base = monasteries.find((m) => m.id === showNearbyFor);
    if (!base) return [];
    const km = nearbyRadiusKm;
    const toKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };
    return attractions.filter((a) => toKm(base.lat, base.lng, a.lat, a.lng) <= km);
  }, [showNearbyFor, nearbyRadiusKm, monasteries, attractions]);

  // center default near Gangtok
  const center: LatLngExpression = [27.33, 88.50];

  const boundsForFit = useMemo(() => {
    const pts: LatLngExpression[] = monasteries.map((m) => [m.lat, m.lng]);
    if (routeLatLngs.length) pts.push(...routeLatLngs as LatLngExpression[]);
    return pts;
  }, [monasteries, routeLatLngs]);

  return (
    <div className="flex h-[80vh] gap-4">
      <aside className="w-80 bg-white/90 p-4 rounded-2xl shadow-lg overflow-auto">
        <h2 className="text-xl font-semibold mb-2">Monasteries</h2>
        <input
          className="w-full p-2 rounded border mb-3"
          placeholder="Search by name or tag"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="space-y-2">
          {filtered.map((m) => (
            <div key={m.id} className="p-2 rounded hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-gray-600">{m.description}</div>
                  <div className="mt-1 text-xs">
                    <a href={m.serviceLink} target="_blank" rel="noreferrer" className="underline text-indigo-600">Local services</a>
                  </div>
                </div>
                <div className="flex flex-col gap-1 ml-2">
                  <button className="text-sm px-2 py-1 rounded bg-indigo-600 text-white" onClick={() => setSelectedStart(m.id)}>Start</button>
                  <button className="text-sm px-2 py-1 rounded bg-emerald-600 text-white" onClick={() => setSelectedEnd(m.id)}>End</button>
                  <button className="text-sm px-2 py-1 rounded bg-yellow-400 text-black" onClick={() => setShowNearbyFor(m.id)}>Nearby</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-3" />
        <div className="text-sm space-y-2">
          <div>Route planner:</div>
          <div className="flex gap-2">
            <select value={selectedStart ?? ''} onChange={(e) => setSelectedStart(e.target.value || null)} className="flex-1 p-2 rounded border">
              <option value="">Select start</option>
              {monasteries.map((m) => <option key={`s-${m.id}`} value={m.id}>{m.name}</option>)}
            </select>
            <select value={selectedEnd ?? ''} onChange={(e) => setSelectedEnd(e.target.value || null)} className="flex-1 p-2 rounded border">
              <option value="">Select end</option>
              {monasteries.map((m) => <option key={`e-${m.id}`} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="px-3 py-1 rounded bg-red-500 text-white" onClick={() => { setSelectedStart(null); setSelectedEnd(null); }}>Clear</button>
            <button className="px-3 py-1 rounded bg-sky-600 text-white" onClick={() => { if (startPlace && endPlace) window.alert('Route drawn on map — you can replace this placeholder with real routing API (OSRM/Mapbox Directions).'); }}>Get Directions</button>
          </div>
        </div>

        <hr className="my-3" />
        <div>
          <div className="flex items-center gap-2">
            <div className="text-sm">Nearby radius (km)</div>
            <input type="number" value={nearbyRadiusKm} onChange={(e) => setNearbyRadiusKm(Number(e.target.value))} className="w-20 p-1 rounded border" />
          </div>

          {showNearbyFor && (
            <div className="mt-2 text-sm">
              <div className="font-medium">Nearby attractions for:</div>
              <div className="mb-2">{monasteries.find((m) => m.id === showNearbyFor)?.name}</div>
              {nearbyAttractions.length === 0 ? <div className="text-xs text-gray-600">No attractions in radius.</div> : (
                <ul className="list-disc pl-4 text-xs">
                  {nearbyAttractions.map((a) => (
                    <li key={a.id}>
                      {a.name} — <a href={a.serviceLink} target="_blank" rel="noreferrer" className="underline">service</a>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-2">
                <button className="px-2 py-1 rounded bg-gray-200" onClick={() => setShowNearbyFor(null)}>Close</button>
              </div>
            </div>
          )}
        </div>

      </aside>

      <div className="flex-1 rounded-2xl overflow-hidden shadow-lg">
        <MapContainer center={center} zoom={10} className="h-full">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* markers for monasteries */}
          {monasteries.map((m) => (
            <Marker key={m.id} position={[m.lat, m.lng]}>
              <Popup>
                <div className="min-w-[200px]">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-xs">{m.description}</div>
                  <div className="mt-2 flex gap-2">
                    <a className="text-sm underline text-indigo-600" href={m.serviceLink} target="_blank" rel="noreferrer">Local services</a>
                    <button className="text-sm px-2 py-1 rounded bg-indigo-600 text-white" onClick={() => { setSelectedStart(m.id); }}>Set as start</button>
                    <button className="text-sm px-2 py-1 rounded bg-emerald-600 text-white" onClick={() => { setSelectedEnd(m.id); }}>Set as end</button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* markers for attractions */}
          {attractions.map((a) => (
            <Marker key={a.id} position={[a.lat, a.lng]}>
              <Popup>
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs">{a.description}</div>
                  <div className="mt-1"><a href={a.serviceLink} target="_blank" rel="noreferrer" className="underline">Book / Info</a></div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* polyline for route (simple straight line) */}
          {routeLatLngs.length >= 2 && (
            <Polyline positions={routeLatLngs} pathOptions={{ color: 'blue', weight: 4 }} />
          )}

          {/* circle for nearby attractions (if any) */}
          {showNearbyFor && (() => {
            const base = monasteries.find((m) => m.id === showNearbyFor);
            if (!base) return null;
            return (
              <>
                <Circle center={[base.lat, base.lng]} radius={nearbyRadiusKm * 1000} pathOptions={{ opacity: 0.25 }} />
                {nearbyAttractions.map((a) => (
                  <Marker key={`near-${a.id}`} position={[a.lat, a.lng]}>
                    <Popup>
                      <div>
                        <div className="font-semibold">{a.name}</div>
                        <div className="text-xs">{a.description}</div>
                        <div className="mt-1"><a href={a.serviceLink} target="_blank" rel="noreferrer" className="underline">Book / Info</a></div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </>
            );
          })()}

          {/* Fit initial bounds to points */}
          <FitBounds bounds={boundsForFit} />
        </MapContainer>
      </div>
    </div>
  );
}
