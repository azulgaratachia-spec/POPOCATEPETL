"use client";

import { useState } from "react";
import { Search, Plus, Star, Globe, MapPin, TrendingUp } from "lucide-react";

const suppliers = [
  {
    id: "SUP-001",
    name: "TechCorp Industries",
    category: "Electrónica",
    country: "Alemania",
    city: "Múnich",
    rating: 4.8,
    orders: 156,
    totalValue: 1250000,
    certifications: ["ISO 9001", "ISO 14001"],
    onTimeDelivery: 96,
    qualityScore: 98,
    status: "active",
  },
  {
    id: "SUP-002",
    name: "Global Supplies Ltd",
    category: "Materia Prima",
    country: "Reino Unido",
    city: "Londres",
    rating: 4.5,
    orders: 89,
    totalValue: 780000,
    certifications: ["ISO 9001"],
    onTimeDelivery: 92,
    qualityScore: 94,
    status: "active",
  },
  {
    id: "SUP-003",
    name: "AsianParts Co",
    category: "Componentes",
    country: "Japón",
    city: "Tokio",
    rating: 4.9,
    orders: 234,
    totalValue: 2100000,
    certifications: ["ISO 9001", "ISO 14001", "IATF 16949"],
    onTimeDelivery: 98,
    qualityScore: 99,
    status: "active",
  },
  {
    id: "SUP-004",
    name: "EuroComponents GmbH",
    category: "Electrónica",
    country: "Alemania",
    city: "Berlín",
    rating: 4.3,
    orders: 67,
    totalValue: 450000,
    certifications: ["ISO 9001"],
    onTimeDelivery: 88,
    qualityScore: 91,
    status: "active",
  },
  {
    id: "SUP-005",
    name: "MetalWorks Inc",
    category: "Materia Prima",
    country: "Estados Unidos",
    city: "Detroit",
    rating: 4.6,
    orders: 112,
    totalValue: 890000,
    certifications: ["ISO 9001", "AS9100"],
    onTimeDelivery: 94,
    qualityScore: 96,
    status: "active",
  },
  {
    id: "SUP-006",
    name: "ElectroParts SA",
    category: "Electrónica",
    country: "España",
    city: "Barcelona",
    rating: 4.4,
    orders: 78,
    totalValue: 560000,
    certifications: ["ISO 9001"],
    onTimeDelivery: 90,
    qualityScore: 92,
    status: "active",
  },
  {
    id: "SUP-007",
    name: "PackAll Solutions",
    category: "Embalaje",
    country: "Francia",
    city: "París",
    rating: 4.2,
    orders: 45,
    totalValue: 180000,
    certifications: ["ISO 9001"],
    onTimeDelivery: 85,
    qualityScore: 88,
    status: "pending",
  },
  {
    id: "SUP-008",
    name: "SmartParts Asia",
    category: "Componentes",
    country: "Corea del Sur",
    city: "Seúl",
    rating: 4.7,
    orders: 189,
    totalValue: 1560000,
    certifications: ["ISO 9001", "ISO 14001", "IATF 16949"],
    onTimeDelivery: 95,
    qualityScore: 97,
    status: "active",
  },
];

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", ...new Set(suppliers.map((s) => s.category))];

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || supplier.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const avgRating = (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1);
  const totalValue = suppliers.reduce((sum, s) => sum + s.totalValue, 0);
  const activeSuppliers = suppliers.filter((s) => s.status === "active").length;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-success";
    if (rating >= 4.0) return "text-primary";
    if (rating >= 3.5) return "text-warning";
    return "text-error";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Gestión de Proveedores</h1>
          <p className="text-text-secondary">Administra tu red de proveedores</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          <Plus className="w-4 h-4" />
          Nuevo Proveedor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Total Proveedores</p>
              <p className="text-xl font-bold text-text-primary">{suppliers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Proveedores Activos</p>
              <p className="text-xl font-bold text-success">{activeSuppliers}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Rating Promedio</p>
              <p className="text-xl font-bold text-warning">{avgRating}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Valor Total</p>
              <p className="text-xl font-bold text-text-primary font-mono">
                ${(totalValue / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-4">
          <Search className="w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar proveedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Todas las categorías" : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-surface border border-border rounded-xl p-5 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">{supplier.name}</h3>
                <p className="text-text-secondary text-sm">{supplier.category}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                supplier.status === "active" 
                  ? "bg-success/10 text-success" 
                  : "bg-warning/10 text-warning"
              }`}>
                {supplier.status === "active" ? "Activo" : "Pendiente"}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4 text-text-secondary">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{supplier.city}, {supplier.country}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-text-secondary text-xs">Pedidos</p>
                <p className="text-lg font-bold text-text-primary">{supplier.orders}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs">Valor Total</p>
                <p className="text-lg font-bold text-text-primary font-mono">
                  ${(supplier.totalValue / 1000).toFixed(0)}K
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-xs">Entrega a Tiempo</span>
                <span className="text-text-primary text-sm font-medium">{supplier.onTimeDelivery}%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full"
                  style={{ width: `${supplier.onTimeDelivery}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-xs">Calidad</span>
                <span className="text-text-primary text-sm font-medium">{supplier.qualityScore}%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${supplier.qualityScore}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(supplier.rating)
                        ? "text-warning fill-warning"
                        : "text-text-secondary"
                    }`}
                  />
                ))}
                <span className={`ml-1 text-sm font-medium ${getRatingColor(supplier.rating)}`}>
                  {supplier.rating}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {supplier.certifications.slice(0, 2).map((cert) => (
                  <span
                    key={cert}
                    className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
