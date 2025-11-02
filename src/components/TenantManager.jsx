import React, { useMemo, useState } from 'react';
import { Users, Calendar, Store } from 'lucide-react';

export default function TenantManager() {
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState({
    name: '',
    type: 'temporary',
    stall: '',
    start: '',
    end: '',
  });

  const stats = useMemo(() => {
    const total = tenants.length;
    const temp = tenants.filter((t) => t.type === 'temporary').length;
    const perm = tenants.filter((t) => t.type === 'permanent').length;
    return { total, temp, perm };
  }, [tenants]);

  function addTenant(e) {
    e.preventDefault();
    if (!form.name || !form.stall) return;
    setTenants((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...form,
      },
    ]);
    setForm({ name: '', type: 'temporary', stall: '', start: '', end: '' });
  }

  function removeTenant(id) {
    setTenants((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-violet-600 text-white">
            <Users size={18} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Tenant Management</h2>
            <p className="text-sm text-gray-500">Track temporary and permanent tenants</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <form onSubmit={addTenant} className="rounded-lg bg-white p-4 ring-1 ring-gray-200">
            <div className="grid gap-3">
              <div className="grid gap-1">
                <label className="text-sm font-medium">Tenant name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="e.g., Ana's Fresh Produce"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-medium">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="temporary">Temporary</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-medium">Stall number</label>
                <input
                  value={form.stall}
                  onChange={(e) => setForm({ ...form, stall: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="e.g., 12"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <label className="text-sm font-medium">Start date</label>
                  <input
                    type="date"
                    value={form.start}
                    onChange={(e) => setForm({ ...form, start: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm font-medium">End date</label>
                  <input
                    type="date"
                    value={form.end}
                    onChange={(e) => setForm({ ...form, end: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Add tenant
              </button>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-3 md:grid-cols-3 lg:col-span-2">
            <StatCard label="Total" value={stats.total} />
            <StatCard label="Temporary" value={stats.temp} color="text-amber-600" />
            <StatCard label="Permanent" value={stats.perm} color="text-blue-600" />

            <div className="col-span-3 rounded-lg bg-white p-4 ring-1 ring-gray-200">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">Current tenants</h3>
              {tenants.length === 0 ? (
                <div className="rounded-md border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
                  No tenants yet. Add one using the form.
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {tenants.map((t) => (
                    <li key={t.id} className="flex items-center justify-between py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${t.type === 'permanent' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                        <div>
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-gray-500">
                            Stall {t.stall} • {t.type}
                            {t.start && t.end ? ` • ${t.start} to ${t.end}` : ''}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeTenant(t.id)}
                        className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Remove
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

function StatCard({ label, value, color = 'text-gray-900' }) {
  return (
    <div className="rounded-lg bg-white p-4 ring-1 ring-gray-200">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-2xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}
