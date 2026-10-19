"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, PackagePlus, WalletCards } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

const initialForm = {
  name: "",
  category: "",
  price: "",
  quantity: "",
};

export function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to load products.");
      return;
    }

    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalInventory = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to save product.");
      }

      setForm(initialForm);
      setSuccess("Mahsulot muvaffaqiyatli qo‘shildi.");
      await fetchProducts();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Mahsulot saqlashda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Admin panel</p>
            <h1 className="mt-2 text-3xl font-bold">Mahsulotlar boshqaruvi</h1>
          </div>

          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Asosiy sahifaga qaytish
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackagePlus className="h-5 w-5 text-blue-600" />
                Mahsulot qo‘shish
              </CardTitle>
              <CardDescription>MongoDB ma’lumotlar bazasiga yangi mahsulot qo‘shing.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Mahsulot nomi</Label>
                  <Input
                    id="name"
                    placeholder="Masalan: Smart Fridge"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategoriya</Label>
                  <Input
                    id="category"
                    placeholder="Masalan: Kitchen"
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Narx</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="2500"
                      value={form.price}
                      onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Miqdor</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="8"
                      value={form.quantity}
                      onChange={(event) => setForm((current) => ({ ...current, quantity: event.target.value }))}
                      required
                    />
                  </div>
                </div>

                {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
                {success && <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600">{success}</p>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Saqlanmoqda..." : "Mahsulot qo‘shish"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletCards className="h-5 w-5 text-emerald-600" />
                Jami summa
              </CardTitle>
              <CardDescription>Mahsulotlarning umumiy qiymati avtomatik hisoblanadi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-5 text-white">
                <p className="text-sm text-blue-100">Umumiy qiymat</p>
                <p className="mt-2 text-3xl font-bold">${totalInventory.toLocaleString()}</p>
              </div>

              <div className="space-y-3">
                {products.length === 0 ? (
                  <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                    Hozircha mahsulotlar yo‘q. Avval yangi mahsulot qo‘shing.
                  </p>
                ) : (
                  products.map((product) => (
                    <div key={product._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-slate-500">{product.category}</p>
                        </div>
                        <p className="text-right text-sm font-medium text-slate-700">
                          ${((product.price || 0) * (product.quantity || 0)).toLocaleString()}
                        </p>
                      </div>

                      <div className="mt-2 flex justify-between text-sm text-slate-600">
                        <span>Narx: ${Number(product.price).toLocaleString()}</span>
                        <span>Miqdor: {product.quantity}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
