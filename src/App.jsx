import React from 'react';
import Hero from './components/Hero';
import StallMap from './components/StallMap';
import TenantManager from './components/TenantManager';
import TicketingPayments from './components/TicketingPayments';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-900">
      <Hero />

      <main className="relative -mt-10 space-y-12 rounded-t-3xl bg-white pb-20 pt-10">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            title="Operations Dashboard"
            subtitle="Everything you need to run your market — organized and efficient"
          />
        </div>

        <StallMap />
        <TenantManager />
        <TicketingPayments />

        <footer className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-500">
          Built for modern markets • Demo mode (no backend connected yet)
        </footer>
      </main>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}

export default App;
