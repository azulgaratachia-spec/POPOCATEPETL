"use client";

import { useState } from "react";
import { Search, Truck, MapPin, CheckCircle, AlertCircle, Route, Calendar, LucideIcon } from "lucide-react";

const shipments = [
  {
    id: "SHP-8921",
    origin: "Centro de Distribución Norte",
    destination: "Madrid, España",
    carrier: "DHL Express",
    status: "in_transit",
    eta: "2024-01-18",
    progress: 65,
    items: 12,
    weight: "245 kg",
  },
  {
    id: "SHP-8920",
    origin: "Warehouse Barcelona",
    destination: "Lisboa, Portugal",
    carrier: "FedEx",
    status: "in_transit",
    eta: "2024-01-19",
    progress: 40,
    items: 8,
    weight: "120 kg",
  },
  {
    id: "SHP-8919",
    origin: "Puerto de Valencia",
    destination: "París, Francia",
    carrier: "Maersk",
    status: "delayed",
    eta: "2024-01-20",
    progress: 30,
    items: 45,
    weight: "2500 kg",
  },
  {
    id: "SHP-8918",
    origin: "Centro Logístico Madrid",
    destination: "Berlín, Alemania",
    carrier: "DHL Freight",
    status: "delivered",
    eta: "2024-01-16",
    progress: 100,
    items: 22,
    weight: "890 kg",
  },
  {
    id: "SHP-8917",
    origin: "Almacén Sevilla",
    destination: "Roma, Italia",
    carrier: "UPS",
    status: "in_transit",
    eta: "2024-01-21",
    progress: 15,
    items: 6,
    weight: "75 kg",
  },
  {
    id: "SHP-8916",
    origin: "Centro de Distribución Norte",
    destination: "Amsterdam, Países Bajos",
    carrier: "DHL Express",
    status: "in_transit",
    eta: "2024-01-18",
    progress: 80,
    items: 18,
    weight: "320 kg",
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  in_transit: { label: "En Tránsito", color: "text-primary bg-primary/10", icon: Truck },
  delayed: { label: "Atrasado", color: "text-warning bg-warning/10", icon: AlertCircle },
  delivered: { label: "Entregado", color: "text-success bg-success/10", icon: CheckCircle },
};

const cities = [
  { name: "Madrid", x: 45, y: 55 },
  { name: "Barcelona", x: 40, y: 70 },
  { name: "Lisboa", x: 20, y: 75 },
  { name: "París", x: 50, y: 35 },
  { name: "Berlín", x: 75, y: 30 },
  { name: "Roma", x: 75, y: 70 },
  { name: "Amsterdam", x: 60, y: 25 },
];

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || shipment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const inTransitCount = shipments.filter((s) => s.status === "in_transit").length;
  const delayedCount = shipments.filter((s) => s.status === "delayed").length;
  const deliveredCount = shipments.filter((s) => s.status === "delivered").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Logística y Envíos</h1>
          <p className="text-text-secondary">Rastrea tus envíos en tiempo real</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">En Tránsito</p>
              <p className="text-xl font-bold text-primary">{inTransitCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Atrasados</p>
              <p className="text-xl font-bold text-warning">{delayedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Entregados</p>
              <p className="text-xl font-bold text-success">{deliveredCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Route className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Rutas Activas</p>
              <p className="text-xl font-bold text-accent">{inTransitCount + delayedCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Mapa de Rutas</h2>
          <div className="relative bg-background rounded-lg h-[400px] overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {[0, 25, 50, 75, 100].map((pos) => (
                <line
                  key={pos}
                  x1={pos}
                  y1="0"
                  x2={pos}
                  y2="100"
                  stroke="#334155"
                  strokeWidth="0.2"
                />
              ))}
              {[0, 25, 50, 75, 100].map((pos) => (
                <line
                  key={`h-${pos}`}
                  x1="0"
                  y1={pos}
                  x2="100"
                  y2={pos}
                  stroke="#334155"
                  strokeWidth="0.2"
                />
              ))}

              {shipments.slice(0, 4).map((shipment) => {
                const origins: Record<string, {x: number, y: number}> = {
                  "Centro de Distribución Norte": {x: 45, y: 55},
                  "Warehouse Barcelona": {x: 40, y: 70},
                  "Puerto de Valencia": {x: 38, y: 72},
                  "Centro Logístico Madrid": {x: 45, y: 55},
                  "Almacén Sevilla": {x: 28, y: 68},
                };
                const dests: Record<string, {x: number, y: number}> = {
                  "Madrid, España": {x: 45, y: 55},
                  "Lisboa, Portugal": {x: 20, y: 75},
                  "París, Francia": {x: 50, y: 35},
                  "Berlín, Alemania": {x: 75, y: 30},
                  "Roma, Italia": {x: 75, y: 70},
                  "Amsterdam, Países Bajos": {x: 60, y: 25},
                };
                const start = origins[shipment.origin] || {x: 45, y: 55};
                const end = dests[shipment.destination] || {x: 50, y: 50};
                const progress = shipment.progress / 100;
                const curX = start.x + (end.x - start.x) * progress;
                const curY = start.y + (end.y - start.y) * progress;

                return (
                  <g key={shipment.id}>
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={curX}
                      y2={curY}
                      stroke="#0F766E"
                      strokeWidth="0.5"
                      strokeDasharray="2,1"
                    />
                    <circle cx={curX} cy={curY} r="1.5" fill={shipment.status === "delayed" ? "#F59E0B" : "#0F766E"} />
                  </g>
                );
              })}

              {cities.map((city) => (
                <g key={city.name}>
                  <circle cx={city.x} cy={city.y} r="2" fill="#1E293B" stroke="#0F766E" strokeWidth="0.5" />
                  <text
                    x={city.x}
                    y={city.y - 3}
                    fontSize="3"
                    fill="#94A3B8"
                    textAnchor="middle"
                  >
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
            <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur px-3 py-2 rounded-lg">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-text-secondary">En Tránsito</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-text-secondary">Atrasado</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-text-secondary">Entregado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Estado de Entregas</h2>
          <div className="space-y-3">
            {[
              { label: "En Tiempo", value: 75, color: "bg-success" },
              { label: "Atrasados", value: 15, color: "bg-warning" },
              { label: "Pendientes", value: 10, color: "bg-primary" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary">{item.label}</span>
                  <span className="text-sm font-medium text-text-primary">{item.value}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-text-primary mb-3">Tiempo Promedio</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Nacional</span>
                <span className="font-mono text-text-primary">1.5 días</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Europa</span>
                <span className="font-mono text-text-primary">3.2 días</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Internacional</span>
                <span className="font-mono text-text-primary">5.8 días</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Lista de Envíos</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Buscar envío..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">Todos los estados</option>
              <option value="in_transit">En Tránsito</option>
              <option value="delayed">Atrasado</option>
              <option value="delivered">Entregado</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-text-secondary text-sm font-medium">Envío</th>
                <th className="text-left p-4 text-text-secondary text-sm font-medium">Origen</th>
                <th className="text-left p-4 text-text-secondary text-sm font-medium">Destino</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Transportista</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Estado</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Progreso</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">ETA</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment) => {
                const config = statusConfig[shipment.status];
                return (
                  <tr
                    key={shipment.id}
                    className="border-b border-border/50 hover:bg-background/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <span className="font-mono text-sm text-primary">{shipment.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-text-secondary" />
                        <span className="text-text-primary text-sm">{shipment.origin}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span className="text-text-primary text-sm">{shipment.destination}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-text-secondary text-sm">{shipment.carrier}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                        <config.icon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              shipment.status === "delayed"
                                ? "bg-warning"
                                : shipment.status === "delivered"
                                ? "bg-success"
                                : "bg-primary"
                            }`}
                            style={{ width: `${shipment.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-secondary w-8">{shipment.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-text-secondary text-sm">
                        <Calendar className="w-3 h-3" />
                        {shipment.eta}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
