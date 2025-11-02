import React, { useMemo, useState } from 'react';
import { Map, Store, Square, Circle, Info } from 'lucide-react';

const defaultStalls = Array.from({ length: 48 }).map((_, i) => ({
  id: i + 1,
  status: 'available', // available | temporary | permanent
  tenant: null,
}));

const statusStyles = {
  available: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  temporary: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  permanent: 'bg-blue-500/15 text-blue-300 ring-blue-500/30',
};

export default function StallMap() {
  const [stalls, setStalls] = useState(defaultStalls);
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return stalls;
    return stalls.filter((s) => s.status === filter);
  }, [stalls, filter]);

  function cycleStatus(id) {
    setStalls((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const next = s.status === 'available' ? 'temporary' : s.status === 'temporary' ? 'permanent' : 'available';
        return { ...s, status: next };
      })
    );
  }

  return (
    <section id="map" className="relative w-full bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-600 text-white">
              <Map size={18} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Stall Map</h2>
              <p className="text-sm text-gray-500">Tap a stall to change its status</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="temporary">Temporary</option>
              <option value="permanent">Permanent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((stall) => (
            <button
              key={stall.id}
              onClick={() => cycleStatus(stall.id)}
              className={`group relative flex aspect-square flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md`}
            >
              <div className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${statusStyles[stall.status]}`}>
                {stall.status}
              </div>
              <Store className="mb-2 text-gray-600" size={22} />
              <div className="text-xs text-gray-500">Stall</div>
              <div className="text-lg font-semibold">#{stall.id}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 rounded-lg bg-gray-50 p-4 ring-1 ring-gray-200 sm:grid-cols-3">
          <LegendItem color="bg-emerald-500" label="Available" />
          <LegendItem color="bg-amber-500" label="Temporary" />
          <LegendItem color="bg-blue-500" label="Permanent" />
        </div>

        <div className="mt-3 flex items-start gap-2 text-sm text-gray-500">
          <Info size={16} className="mt-0.5" />
          Changes are local for now. Integrate with the backend to persist mapping and assignments.
        </div>
      </div>
    </section>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}
