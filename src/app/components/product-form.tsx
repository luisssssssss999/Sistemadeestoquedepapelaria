import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Package, Plus } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
}

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, "id">) => void;
}

export function ProductForm({ onAddProduct }: ProductFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !quantity || !category || !price) {
      return;
    }

    onAddProduct({
      name,
      quantity: parseInt(quantity),
      category,
      price: parseFloat(price),
    });

    // Limpar formulário
    setName("");
    setQuantity("");
    setCategory("");
    setPrice("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="size-5" />
          Cadastro de Produto
        </CardTitle>
        <CardDescription>
          Adicione novos produtos ao estoque da papelaria
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              placeholder="Ex: Caneta Azul"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              placeholder="Ex: Canetas, Cadernos, Papéis"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="size-4 mr-2" />
            Adicionar Produto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
