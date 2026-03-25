"use client";

import { TrendingUp, TrendingDown, AlertTriangle, Target, BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const historicalData = [
  { month: "Ene", demand: 4200, forecast: 4100 },
  { month: "Feb", demand: 3800, forecast: 3900 },
  { month: "Mar", demand: 4500, forecast: 4400 },
  { month: "Abr", demand: 4100, forecast: 4200 },
  { month: "May", demand: 4800, forecast: 4700 },
  { month: "Jun", demand: 5200, forecast: 5100 },
  { month: "Jul", demand: 4900, forecast: 5000 },
  { month: "Ago", demand: 5500, forecast: 5400 },
  { month: "Sep", demand: 5100, forecast: 5200 },
  { month: "Oct", demand: 5800, forecast: 5700 },
  { month: "Nov", demand: 6200, forecast: 6100 },
  { month: "Dic", demand: 6800, forecast: 6700 },
];

const forecastData = [
  { month: "Ene 24", actual: 4200, predicted: null },
  { month: "Feb 24", actual: 3800, predicted: null },
  { month: "Mar 24", actual: 4500, predicted: null },
  { month: "Abr 24", actual: 4100, predicted: null },
  { month: "May 24", actual: 4800, predicted: null },
  { month: "Jun 24", actual: 5200, predicted: null },
  { month: "Jul 24", actual: 4900, predicted: null },
  { month: "Ago 24", actual: 5500, predicted: null },
  { month: "Sep 24", actual: 5100, predicted: null },
  { month: "Oct 24", actual: null, predicted: 5600 },
  { month: "Nov 24", actual: null, predicted: 5900 },
  { month: "Dic 24", actual: null, predicted: 6300 },
  { month: "Ene 25", actual: null, predicted: 5800 },
  { month: "Feb 25", actual: null, predicted: 5400 },
];

const seasonalData = [
  { month: "Ene", factor: 0.85 },
  { month: "Feb", factor: 0.78 },
  { month: "Mar", factor: 0.92 },
  { month: "Abr", factor: 0.88 },
  { month: "May", factor: 0.95 },
  { month: "Jun", factor: 1.05 },
  { month: "Jul", factor: 1.12 },
  { month: "Ago", factor: 1.08 },
  { month: "Sep", factor: 1.02 },
  { month: "Oct", factor: 1.15 },
  { month: "Nov", factor: 1.25 },
  { month: "Dic", factor: 1.35 },
];

const productForecast = [
  { sku: "SKU-1001", product: "Tornillo M5x20mm", current: 1250, predicted: 1400, trend: "up", urgency: "low" },
  { sku: "SKU-1002", product: "Placa Base PCB-X1", current: 234, predicted: 180, trend: "down", urgency: "medium" },
  { sku: "SKU-1004", product: "Sensor Temperatura TMP", current: 890, predicted: 950, trend: "up", urgency: "low" },
  { sku: "SKU-1005", product: "Alambre Cobre 2mm", current: 156, predicted: 120, trend: "down", urgency: "high" },
  { sku: "SKU-1007", product: "Rodamiento 6205", current: 78, predicted: 65, trend: "down", urgency: "high" },
];

export default function ForecastingPage() {
  const accuracy = 94.2;
  const growthRate = 12.5;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Pronósticos de Demanda</h1>
          <p className="text-text-secondary">Análisis predictivo y planificación</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Precisión del Pronóstico</p>
              <p className="text-xl font-bold text-primary">{accuracy}%</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Tasa de Crecimiento</p>
              <p className="text-xl font-bold text-success">+{growthRate}%</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Demanda Mensual</p>
              <p className="text-xl font-bold text-text-primary">5,200</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-error" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Alertas de Stock</p>
              <p className="text-xl font-bold text-error">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Demanda vs Pronóstico (Histórico)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F8FAFC" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="demand"
                name="Demanda Real"
                stroke="#0F766E"
                strokeWidth={3}
                dot={{ fill: "#0F766E", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                name="Pronóstico"
                stroke="#F59E0B"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#F59E0B", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Predicción Futura (6 meses)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="actual"
                name="Datos Reales"
                stroke="#0F766E"
                fillOpacity={1}
                fill="url(#colorActual)"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                name="Predicción"
                stroke="#F59E0B"
                fillOpacity={1}
                fill="url(#colorPredicted)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Factores Estacionales
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={seasonalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" domain={[0.5, 1.5]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="factor" name="Factor" fill="#14B8A6" radius={[4, 4, 0, 0]}>
                {seasonalData.map((entry, index) => (
                  <rect
                    key={`bar-${index}`}
                    fill={entry.factor >= 1 ? "#10B981" : "#F59E0B"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-success" />
              <span className="text-text-secondary">Alta demanda (≥1)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-warning" />
              <span className="text-text-secondary">Baja demanda (&lt;1)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Recomendaciones de Pedido
          </h2>
          <div className="space-y-3">
            {productForecast.map((item) => (
              <div
                key={item.sku}
                className={`p-4 rounded-lg border ${
                  item.urgency === "high"
                    ? "bg-error/5 border-error/20"
                    : item.urgency === "medium"
                    ? "bg-warning/5 border-warning/20"
                    : "bg-background border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-primary">{item.sku}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.urgency === "high"
                          ? "bg-error/20 text-error"
                          : item.urgency === "medium"
                          ? "bg-warning/20 text-warning"
                          : "bg-success/20 text-success"
                      }`}>
                        {item.urgency === "high" ? "Urgente" : item.urgency === "medium" ? "Moderado" : "Normal"}
                      </span>
                    </div>
                    <p className="text-text-primary font-medium">{item.product}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-text-secondary text-sm">Stock actual:</span>
                      <span className="font-mono text-text-primary">{item.current}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-text-secondary text-sm">Predicho:</span>
                      <span className="font-mono text-text-primary">{item.predicted}</span>
                      {item.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-error" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors">
            Ver todas las recomendaciones
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-5">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Tendencia de Precisión del Modelo
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={[
              { month: "Jul", accuracy: 89 },
              { month: "Ago", accuracy: 91 },
              { month: "Sep", accuracy: 88 },
              { month: "Oct", accuracy: 92 },
              { month: "Nov", accuracy: 94 },
              { month: "Dic", accuracy: 94.2 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" domain={[80, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              name="Precisión %"
              stroke="#0F766E"
              strokeWidth={3}
              dot={{ fill: "#0F766E", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
