"use client";

import { useState } from "react";
import { Plus, FileText, Clock, CheckCircle, Truck, Package, DollarSign, LucideIcon } from "lucide-react";

const purchaseOrders = [
  {
    id: "PO-2024-0156",
    supplier: "TechCorp Industries",
    items: 12,
    totalValue: 45600,
    status: "pending",
    createdAt: "2024-01-15",
    deliveryDate: "2024-01-25",
  },
  {
    id: "PO-2024-0155",
    supplier: "Global Supplies Ltd",
    items: 8,
    totalValue: 23400,
    status: "approved",
    createdAt: "2024-01-14",
    deliveryDate: "2024-01-22",
  },
  {
    id: "PO-2024-0154",
    supplier: "AsianParts Co",
    items: 25,
    totalValue: 89000,
    status: "shipped",
    createdAt: "2024-01-12",
    deliveryDate: "2024-01-20",
  },
  {
    id: "PO-2024-0153",
    supplier: "EuroComponents GmbH",
    items: 5,
    totalValue: 12300,
    status: "received",
    createdAt: "2024-01-10",
    deliveryDate: "2024-01-18",
  },
  {
    id: "PO-2024-0152",
    supplier: "MetalWorks Inc",
    items: 15,
    totalValue: 67800,
    status: "pending",
    createdAt: "2024-01-09",
    deliveryDate: "2024-01-19",
  },
  {
    id: "PO-2024-0151",
    supplier: "ElectroParts SA",
    items: 30,
    totalValue: 156000,
    status: "approved",
    createdAt: "2024-01-08",
    deliveryDate: "2024-01-15",
  },
  {
    id: "PO-2024-0150",
    supplier: "PackAll Solutions",
    items: 3,
    totalValue: 4500,
    status: "draft",
    createdAt: "2024-01-07",
    deliveryDate: "2024-01-17",
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  draft: { label: "Borrador", color: "text-text-secondary bg-surface", icon: FileText },
  pending: { label: "Pendiente", color: "text-warning bg-warning/10", icon: Clock },
  approved: { label: "Aprobado", color: "text-primary bg-primary/10", icon: CheckCircle },
  shipped: { label: "Enviado", color: "text-accent bg-accent/10", icon: Truck },
  received: { label: "Recibido", color: "text-success bg-success/10", icon: Package },
};

const statusColumns = ["draft", "pending", "approved", "shipped", "received"];

export default function ProcurementPage() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const totalValue = purchaseOrders.reduce((sum, po) => sum + po.totalValue, 0);
  const pendingOrders = purchaseOrders.filter((po) => po.status === "pending").length;
  const inTransit = purchaseOrders.filter((po) => po.status === "shipped").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Gestión de Compras</h1>
          <p className="text-text-secondary">Administra tus pedidos de compra</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          <Plus className="w-4 h-4" />
          Nuevo Pedido
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Total Pedidos</p>
              <p className="text-xl font-bold text-text-primary">{purchaseOrders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Pendientes</p>
              <p className="text-xl font-bold text-warning">{pendingOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">En Tránsito</p>
              <p className="text-xl font-bold text-accent">{inTransit}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Valor Total</p>
              <p className="text-xl font-bold text-text-primary font-mono">
                ${(totalValue / 1000).toFixed(1)}K
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {statusColumns.map((status) => {
          const config = statusConfig[status];
          const count = purchaseOrders.filter((po) => po.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
              className={`p-4 rounded-xl border transition-all ${
                selectedStatus === status
                  ? "border-primary bg-primary/10"
                  : "border-border bg-surface hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <config.icon className={`w-4 h-4 ${config.color.split(" ")[0]}`} />
                <span className="text-text-primary font-medium">{config.label}</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">{count}</p>
            </button>
          );
        })}
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Pedidos de Compra</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-text-secondary text-sm font-medium">Pedido</th>
                <th className="text-left p-4 text-text-secondary text-sm font-medium">Proveedor</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Items</th>
                <th className="text-right p-4 text-text-secondary text-sm font-medium">Valor</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Estado</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders
                .filter((po) => !selectedStatus || po.status === selectedStatus)
                .map((po) => {
                  const config = statusConfig[po.status];
                  return (
                    <tr
                      key={po.id}
                      className="border-b border-border/50 hover:bg-background/50 transition-colors cursor-pointer"
                    >
                      <td className="p-4">
                        <span className="font-mono text-sm text-primary">{po.id}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-text-primary font-medium">{po.supplier}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-text-primary">{po.items}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-mono text-text-primary">
                          ${po.totalValue.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                          <config.icon className="w-3 h-3" />
                          {config.label}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-text-secondary text-sm">{po.deliveryDate}</span>
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
