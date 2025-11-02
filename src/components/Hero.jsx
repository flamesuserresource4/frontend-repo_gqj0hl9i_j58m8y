import React from 'react';
import Spline from '@splinetool/react-spline';
import { Ticket, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-black/30 to-black/90" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20 backdrop-blur-md">
          <Sparkles size={14} className="text-teal-300" />
          Futuristic ticketing meets real-world market mapping
        </div>
        <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
          Market Stall Rental, Mapping, and Ticketing
        </h1>
        <p className="max-w-2xl text-white/80 md:text-lg">
          Manage temporary and permanent tenants, visualize stall layouts, issue tickets, and accept payments — all in one sleek dashboard.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#map"
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Explore Stall Map
          </a>
          <a
            href="#ticketing"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            <Ticket size={16} />
            Open Ticketing
          </a>
        </div>
      </div>
    </section>
  );
}
