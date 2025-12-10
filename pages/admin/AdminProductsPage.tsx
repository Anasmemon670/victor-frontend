"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus } from "lucide-react";

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

// Function to get image based on product title
const getProductImage = (productName: string): string => {
  const name = productName.toLowerCase();
  
  if (name.includes("macbook") || name.includes("laptop")) {
    return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop";
  }
  if (name.includes("iphone") || name.includes("phone")) {
    return "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop";
  }
  if (name.includes("sony") || name.includes("headphone") || name.includes("earphone")) {
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop";
  }
  if (name.includes("ipad") || name.includes("tablet")) {
    return "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop";
  }
  if (name.includes("dyson") || name.includes("vacuum")) {
    return "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?w=400&h=300&fit=crop";
  }
  if (name.includes("peloton") || name.includes("bike") || name.includes("exercise")) {
    return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop";
  }
  
  // Default image
  return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop";
};

const initialProducts = [
  {
    id: 1,
    name: "MacBook Pro M3 16\"",
    price: 2249.99,
    category: "Electronics",
    description: "Powerful laptop with M3 chip, 16GB RAM, 512GB SSD.",
    discount: 10,
    onOffer: true,
    bigOffer: true,
    image: getProductImage("MacBook Pro M3 16\"")
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    category: "Electronics",
    description: "Latest iPhone with titanium design and A17 Pro chip.",
    discount: 15,
    onOffer: true,
    bigOffer: true,
    image: getProductImage("iPhone 15 Pro Max")
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 349.99,
    category: "Electronics",
    description: "Industry-leading noise cancelling wireless headphones.",
    discount: 15,
    onOffer: true,
    bigOffer: false,
    image: getProductImage("Sony WH-1000XM5")
  },
  {
    id: 4,
    name: "iPad Air 5th Gen",
    price: 599.99,
    category: "Electronics",
    description: "10.9-inch Liquid Retina display with M1 chip.",
    discount: 0,
    onOffer: false,
    bigOffer: false,
    image: getProductImage("iPad Air 5th Gen")
  },
  {
    id: 5,
    name: "Dyson V15 Vacuum",
    price: 599.99,
    category: "Home & Kitchen",
    description: "Powerful cordless vacuum with laser dust detection.",
    discount: 20,
    onOffer: true,
    bigOffer: true,
    image: getProductImage("Dyson V15 Vacuum")
  },
  {
    id: 6,
    name: "Peloton Bike+",
    price: 1871.25,
    category: "Fitness",
    description: "Premium indoor cycling bike with live classes.",
    discount: 25,
    onOffer: true,
    bigOffer: true,
    image: getProductImage("Peloton Bike+")
  }
];

export function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('adminProducts');
      if (saved) {
        return JSON.parse(saved) as Product[];
      } else {
        // Initialize with default products
        localStorage.setItem('adminProducts', JSON.stringify(initialProducts));
        return initialProducts;
      }
    }
    return initialProducts;
  });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminProducts', JSON.stringify(products));
    }
  }, [products]);

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((p: Product) => p.id !== id);
    setProducts(updatedProducts);
    setDeleteConfirm(null);
    alert(`Product deleted successfully!`);
  };

  const handleEdit = (id: number) => {
    console.log("Editing product ID:", id);
    router.push(`/admin/products/edit/${id}`);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
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
                  {deleteConfirm === product.id ? (
                    <>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all text-sm"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminProductsPage;