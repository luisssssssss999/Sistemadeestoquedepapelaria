import { useState } from "react";
import { ProductForm, Product } from "./components/product-form";
import { ProductTable } from "./components/product-table";
import { EditProductDialog } from "./components/edit-product-dialog";
import { StockSummary } from "./components/stock-summary";
import { FileText } from "lucide-react";

export default function App() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Caneta Esferográfica Azul",
      quantity: 150,
      category: "Canetas",
      price: 1.5,
    },
    {
      id: "2",
      name: "Caderno Universitário 200 Folhas",
      quantity: 45,
      category: "Cadernos",
      price: 18.9,
    },
    {
      id: "3",
      name: "Papel Sulfite A4 (500 folhas)",
      quantity: 8,
      category: "Papéis",
      price: 22.0,
    },
    {
      id: "4",
      name: "Borracha Branca",
      quantity: 0,
      category: "Acessórios",
      price: 0.8,
    },
    {
      id: "5",
      name: "Lápis Preto HB",
      quantity: 89,
      category: "Lápis",
      price: 1.2,
    },
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts([...products, product]);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <FileText className="size-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Sistema de Estoque</h1>
            <p className="text-muted-foreground">
              Gerenciamento de produtos da papelaria
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <StockSummary products={products} />

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-1">
            <ProductForm onAddProduct={handleAddProduct} />
          </div>

          {/* Table */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Produtos em Estoque</h2>
              <ProductTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </div>
          </div>
        </div>

        {/* Edit Dialog */}
        <EditProductDialog
          product={editingProduct}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSaveProduct}
        />
      </div>
    </div>
  );
}
