import React, { useMemo, useState } from 'react';
import { Ticket, CreditCard, QrCode } from 'lucide-react';

export default function TicketingPayments() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    event: 'Market Day Access',
    tier: 'General',
    price: 5,
    quantity: 1,
  });

  const total = useMemo(() => Number(form.price) * Number(form.quantity || 0), [form]);

  function issueTickets(e) {
    e.preventDefault();
    const qty = Math.max(1, Number(form.quantity));
    const created = Array.from({ length: qty }).map(() => ({
      id: crypto.randomUUID(),
      ...form,
      issuedAt: new Date().toISOString(),
      code: Math.random().toString(36).slice(2, 10).toUpperCase(),
      status: 'valid',
    }));
    setTickets((prev) => [...created, ...prev]);
  }

  function markUsed(id) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'used' } : t)));
  }

  return (
    <section id="ticketing" className="w-full bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-600 text-white">
            <Ticket size={18} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Ticketing & Payments</h2>
            <p className="text-sm text-gray-500">Issue tickets and simulate payments</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <form onSubmit={issueTickets} className="rounded-lg bg-gray-50 p-4 ring-1 ring-gray-200">
            <div className="grid gap-3">
              <div className="grid gap-1">
                <label className="text-sm font-medium">Event</label>
                <input
                  value={form.event}
                  onChange={(e) => setForm({ ...form, event: e.target.value })}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-medium">Tier</label>
                <select
                  value={form.tier}
                  onChange={(e) => setForm({ ...form, tier: e.target.value })}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option>General</option>
                  <option>VIP</option>
                  <option>Vendor</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <label className="text-sm font-medium">Price</label>
                  <input
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                <CreditCard size={16} />
                Collect payment & issue
              </button>

              <div className="mt-2 text-xs text-gray-500">
                Payments are simulated in this demo. Integrate with your provider to go live.
              </div>
            </div>

            <div className="mt-4 rounded-md border border-dashed border-gray-300 p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Order total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>
          </form>

          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white ring-1 ring-gray-200">
              <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <div className="text-sm font-semibold text-gray-700">Recently issued</div>
                <div className="text-xs text-gray-500">Click a ticket to mark as used</div>
              </div>
              {tickets.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-500">
                  No tickets yet. Issue some on the left.
                </div>
              ) : (
                <ul className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                  {tickets.map((t) => (
                    <li key={t.id}>
                      <button
                        onClick={() => markUsed(t.id)}
                        className={`group relative flex w-full items-stretch gap-3 rounded-lg border p-4 text-left transition ${t.status === 'used' ? 'border-gray-300 bg-gray-50' : 'border-teal-200 bg-teal-50 hover:shadow-md'}`}
                      >
                        <div className="flex flex-1 flex-col">
                          <div className="text-xs text-gray-500">{t.event} • {t.tier}</div>
                          <div className="text-lg font-semibold tracking-wide">ADMIT ONE</div>
                          <div className="text-xs text-gray-500">{new Date(t.issuedAt).toLocaleString()}</div>
                          <div className="mt-2 inline-flex items-center gap-2 text-xs">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${t.status === 'valid' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${t.status === 'valid' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                              {t.status}
                            </span>
                            <span className="text-gray-500">Code:</span>
                            <code className="rounded bg-black/5 px-1.5 py-0.5">{t.code}</code>
                          </div>
                        </div>
                        <div className="flex w-20 flex-col items-center justify-center border-l border-dashed border-gray-300 pl-3 text-gray-700">
                          <QrCode size={28} className="opacity-70" />
                          <div className="text-xs font-semibold">${Number(t.price).toFixed(2)}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
