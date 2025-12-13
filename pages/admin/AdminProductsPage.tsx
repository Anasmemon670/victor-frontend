"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, ChevronDown, X, AlertTriangle } from "lucide-react";
import { products as sharedProducts } from "@/data/products";

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  discount: number;
  onOffer: boolean;
  bigOffer: boolean;
  image: string;
}

// Convert shared products to admin format
const convertToAdminFormat = (product: typeof sharedProducts[0]): Product => {
  // Extract discount percentage from string like "25% OFF" or calculate from prices
  let discountPercent = 0;
  if (product.discount) {
    const match = product.discount.match(/(\d+)%/);
    if (match) {
      discountPercent = parseInt(match[1]);
    } else if (product.originalPrice && product.price) {
      discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
  }

  const hasDiscount = discountPercent > 0;
  const isBigOffer = discountPercent >= 25; // Consider 25%+ as big offer

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    discount: discountPercent,
    onOffer: hasDiscount,
    bigOffer: isBigOffer,
    image: product.image
  };
};

// Initialize with shared products converted to admin format
const initialProducts = sharedProducts.map(convertToAdminFormat);

export function AdminProductsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const categories = ["All", "Audio", "Wearables", "Accessories", "Gaming", "Smart Home", "Storage"];

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('adminProducts');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Product[];
          // If saved products exist and match the count, use them; otherwise use shared products
          if (parsed && parsed.length === sharedProducts.length) {
            return parsed;
          }
        } catch (e) {
          // If parsing fails, use shared products
        }
      }
      // Initialize with shared products (12 products)
      localStorage.setItem('adminProducts', JSON.stringify(initialProducts));
      return initialProducts;
    }
    return initialProducts;
  });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminProducts', JSON.stringify(products));
    }
  }, [products]);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteConfirm(product.id);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      const updatedProducts = products.filter((p: Product) => p.id !== productToDelete.id);
      setProducts(updatedProducts);
      setDeleteConfirm(null);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
    setProductToDelete(null);
  };

  const handleEdit = (id: number) => {
    console.log("Editing product ID:", id);
    router.push(`/admin/products/edit/${id}`);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    // First filter by category
    let filtered = selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

    // Then sort based on sortBy
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        // Keep original order
        break;
    }
    return sorted;
  }, [products, selectedCategory, sortBy]);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl mb-2">Manage Products</h1>
            <p className="text-slate-400">{products.length} total products</p>
          </div>
          <button
            onClick={() => router.push("/admin/products/add")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === cat
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-700 border border-slate-600 text-white px-4 py-2 pr-10 rounded-lg hover:border-cyan-500 transition-all cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Products Count */}
        <p className="text-slate-400 mb-6">
          Showing <span className="font-semibold text-white">{filteredAndSortedProducts.length}</span> products
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-700"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.bigOffer && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    Big Offer
                  </span>
                )}
                {product.onOffer && !product.bigOffer && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                    On Offer
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-white text-lg mb-1">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-cyan-400">${product.price}</p>
                  <p className="text-slate-500 text-sm">{product.category}</p>
                </div>
                {product.discount > 0 && (
                  <p className="text-orange-400 text-sm mb-3">Discount: {product.discount}%</p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && productToDelete && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-700 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                    <h2 className="text-white text-xl font-semibold">Delete Product</h2>
                  </div>
                  <button
                    onClick={handleDeleteCancel}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-slate-300 mb-2">
                  Are you sure you want to delete this product?
                </p>
                <p className="text-white font-semibold mb-6">
                  "{productToDelete.name}"
                </p>
                <p className="text-slate-400 text-sm mb-6">
                  This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Product
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}

export default AdminProductsPage;