"use client";

import { useState } from "react";
import { Search, Filter, Plus, AlertTriangle, Package, MapPin } from "lucide-react";

const inventoryData = [
  {
    id: "SKU-1001",
    name: "Tornillo M5x20mm",
    category: "Componentes",
    quantity: 1250,
    minStock: 500,
    maxStock: 3000,
    location: "A-12-03",
    status: "optimal",
    value: 2500,
  },
  {
    id: "SKU-1002",
    name: "Placa Base PCB-X1",
    category: "Electrónica",
    quantity: 234,
    minStock: 300,
    maxStock: 1500,
    location: "B-05-01",
    status: "low",
    value: 46800,
  },
  {
    id: "SKU-1003",
    name: "Caja Embalaje 30x20",
    category: "Embalaje",
    quantity: 4500,
    minStock: 1000,
    maxStock: 5000,
    location: "C-01-01",
    status: "excess",
    value: 9000,
  },
  {
    id: "SKU-1004",
    name: "Sensor Temperatura TMP",
    category: "Electrónica",
    quantity: 890,
    minStock: 200,
    maxStock: 1000,
    location: "B-08-04",
    status: "optimal",
    value: 44500,
  },
  {
    id: "SKU-1005",
    name: "Alambre Cobre 2mm",
    category: "Materia Prima",
    quantity: 156,
    minStock: 200,
    maxStock: 800,
    location: "D-02-02",
    status: "critical",
    value: 23400,
  },
  {
    id: "SKU-1006",
    name: "Conector USB-C",
    category: "Electrónica",
    quantity: 3200,
    minStock: 500,
    maxStock: 4000,
    location: "B-03-02",
    status: "optimal",
    value: 32000,
  },
  {
    id: "SKU-1007",
    name: "Rodamiento 6205",
    category: "Componentes",
    quantity: 78,
    minStock: 100,
    maxStock: 500,
    location: "A-08-01",
    status: "critical",
    value: 15600,
  },
  {
    id: "SKU-1008",
    name: "Pintura Epoxy 5L",
    category: "Materia Prima",
    quantity: 45,
    minStock: 20,
    maxStock: 100,
    location: "D-05-03",
    status: "optimal",
    value: 11250,
  },
];

const getStockStatus = (quantity: number, minStock: number, maxStock: number) => {
  if (quantity <= minStock * 0.5) return { label: "Crítico", color: "text-error bg-error/10" };
  if (quantity <= minStock) return { label: "Bajo", color: "text-warning bg-warning/10" };
  if (quantity >= maxStock) return { label: "Exceso", color: "text-accent bg-accent/10" };
  return { label: "Óptimo", color: "text-success bg-success/10" };
};

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", ...new Set(inventoryData.map((item) => item.category))];

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalValue = inventoryData.reduce((sum, item) => sum + item.value, 0);
  const criticalItems = inventoryData.filter(
    (item) => item.quantity <= item.minStock * 0.5
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Gestión de Inventario</h1>
          <p className="text-text-secondary">Controla el stock de tus productos</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Total SKUs</p>
              <p className="text-xl font-bold text-text-primary">{inventoryData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Unidades Totales</p>
              <p className="text-xl font-bold text-text-primary">
                {inventoryData.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Valor Total</p>
              <p className="text-xl font-bold text-text-primary font-mono">
                ${totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-error" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Stock Crítico</p>
              <p className="text-xl font-bold text-error">{criticalItems}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar por nombre o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Todas las categorías" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-text-secondary text-sm font-medium">SKU</th>
                <th className="text-left p-4 text-text-secondary text-sm font-medium">Producto</th>
                <th className="text-left p-4 text-text-secondary text-sm font-medium">Categoría</th>
                <th className="text-right p-4 text-text-secondary text-sm font-medium">Cantidad</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Estado</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Ubicación</th>
                <th className="text-right p-4 text-text-secondary text-sm font-medium">Valor</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const status = getStockStatus(item.quantity, item.minStock, item.maxStock);
                return (
                  <tr
                    key={item.id}
                    className="border-b border-border/50 hover:bg-background/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="font-mono text-sm text-primary">{item.id}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-text-primary font-medium">{item.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-text-secondary text-sm">{item.category}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-text-primary">{item.quantity.toLocaleString()}</span>
                      <span className="text-text-secondary text-xs block">
                        min: {item.minStock} / max: {item.maxStock}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1 text-text-secondary">
                        <MapPin className="w-3 h-3" />
                        <span className="font-mono text-sm">{item.location}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-text-primary">${item.value.toLocaleString()}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between">
          <span className="text-text-secondary text-sm">
            Mostrando {filteredInventory.length} de {inventoryData.length} productos
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50" disabled>
              Anterior
            </button>
            <span className="px-3 py-1 bg-primary text-white text-sm rounded-lg">1</span>
            <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50" disabled>
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
