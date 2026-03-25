"use client";

import {
  Package,
  ShoppingCart,
  Truck,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const kpiData = [
  {
    title: "Valor Total Inventario",
    value: "$2,450,000",
    change: "+12.5%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Pedidos Abiertos",
    value: "156",
    change: "-8.2%",
    trend: "down",
    icon: ShoppingCart,
  },
  {
    title: "Entregas a Tiempo",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: Truck,
  },
  {
    title: "Proveedores Activos",
    value: "48",
    change: "+5.3%",
    trend: "up",
    icon: Users,
  },
];

const trendData = [
  { name: "Ene", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Abr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

const categoryData = [
  { name: "Electrónica", value: 35 },
  { name: "Materia Prima", value: 28 },
  { name: "Componentes", value: 22 },
  { name: "Embalaje", value: 15 },
];

const recentActivity = [
  { id: 1, action: "Nuevo pedido recibido", detail: "PO-2024-0156 de TechCorp", time: "Hace 5 min", type: "order" },
  { id: 2, action: "Envío completado", detail: "SHP-8921 entregado a Madrid", time: "Hace 15 min", type: "shipment" },
  { id: 3, action: "Alerta de stock", detail: "SKU-4521 bajo nivel mínimo", time: "Hace 30 min", type: "alert" },
  { id: 4, action: "Proveedor aprobado", detail: "Global Supplies agregado", time: "Hace 1 hora", type: "supplier" },
  { id: 5, action: "Pedido enviado", detail: "PO-2024-0155 en tránsito", time: "Hace 2 horas", type: "order" },
];

const alerts = [
  { id: 1, message: "Stock crítico: Tornillos M5 (234 unidades)", severity: "critical" },
  { id: 2, message: "Pedido atrasado: Proveedor AsianParts", severity: "warning" },
  { id: 3, message: "Nuevo proveedor requiere aprobación", severity: "info" },
];

const COLORS = ["#0F766E", "#14B8A6", "#F59E0B", "#6B7280"];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary">Resumen de tu cadena de suministro</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Clock className="w-4 h-4" />
          <span>Última actualización: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-xl p-5 card-hover"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-secondary text-sm">{kpi.title}</p>
                <p className="text-2xl font-bold text-text-primary mt-1 font-mono">
                  {kpi.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-error" />
                  )}
                  <span
                    className={`text-sm ${
                      kpi.trend === "up" ? "text-success" : "text-error"
                    }`}
                  >
                    {kpi.change}
                  </span>
                  <span className="text-text-secondary text-sm">vs mes anterior</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <kpi.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Tendencia de Pedidos
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F8FAFC" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0F766E"
                strokeWidth={3}
                dot={{ fill: "#0F766E", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Distribución por Categoría
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx] }}
                />
                <span className="text-xs text-text-secondary">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Actividad Reciente
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-background/50 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "order"
                      ? "bg-primary"
                      : activity.type === "shipment"
                      ? "bg-success"
                      : activity.type === "alert"
                      ? "bg-warning"
                      : "bg-accent"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    {activity.action}
                  </p>
                  <p className="text-xs text-text-secondary">{activity.detail}</p>
                </div>
                <span className="text-xs text-text-secondary">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Alertas y Notificaciones
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  alert.severity === "critical"
                    ? "bg-error/10 border border-error/20"
                    : alert.severity === "warning"
                    ? "bg-warning/10 border border-warning/20"
                    : "bg-primary/10 border border-primary/20"
                }`}
              >
                <AlertTriangle
                  className={`w-5 h-5 ${
                    alert.severity === "critical"
                      ? "text-error"
                      : alert.severity === "warning"
                      ? "text-warning"
                      : "text-primary"
                  }`}
                />
                <p className="text-sm text-text-primary flex-1">{alert.message}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors">
            Ver todas las alertas
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-5">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Rendimiento Mensual por Región
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={[
              { region: "Norte", orders: 450, deliveries: 420 },
              { region: "Sur", orders: 380, deliveries: 365 },
              { region: "Este", orders: 520, deliveries: 490 },
              { region: "Oeste", orders: 290, deliveries: 280 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="region" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="orders" fill="#0F766E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="deliveries" fill="#14B8A6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
