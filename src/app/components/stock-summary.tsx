import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Package, AlertTriangle, DollarSign, Layers } from "lucide-react";
import { Product } from "./product-form";

interface StockSummaryProps {
  products: Product[];
}

export function StockSummary({ products }: StockSummaryProps) {
  const totalProducts = products.length;
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockCount = products.filter((p) => p.quantity > 0 && p.quantity < 10).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const stats = [
    {
      title: "Total de Produtos",
      value: totalProducts,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Itens em Estoque",
      value: totalItems,
      icon: Layers,
      color: "text-green-600",
    },
    {
      title: "Baixo Estoque",
      value: lowStockCount,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Valor Total",
      value: `R$ ${totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{stat.title}</CardTitle>
              <Icon className={`size-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
