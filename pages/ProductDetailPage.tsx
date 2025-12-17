"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, ArrowLeft, Loader2 } from "lucide-react";
import { productsAPI } from "@/lib/api";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  title: string;
  description?: string;
  price: string;
  discount?: number;
  category?: string;
  stock: number;
  images?: string[] | null;
  supplier?: {
    id: string;
    name: string;
    email?: string;
  };
}

export function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle case when id is not available during SSR
  if (!id) {
    return null;
  }

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsAPI.getById(id);
        setProduct(response.product);
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.error || 'Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
          <button
            onClick={() => router.push("/products")}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images && Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['/images/products/headphones.png'];

  const price = parseFloat(product.price);
  const originalPrice = product.discount
    ? price / (1 - product.discount / 100)
    : price;
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: price,
      image: images[0] || '/images/products/headphones.png',
      originalPrice: originalPrice
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Button */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/products")}
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="bg-white rounded-2xl p-8 mb-4 border border-slate-200 overflow-hidden">
              <div className="h-96 rounded-xl overflow-hidden">
                <img
                  src={images[selectedImage] || '/images/products/headphones.png'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                      ? "border-cyan-500"
                      : "border-slate-200 hover:border-slate-300"
                      }`}
                  >
                    <div className="h-20 overflow-hidden">
                      <img
                        src={img || '/images/products/headphones.png'}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-600 text-sm">{product.category}</span>
            <h1 className="text-slate-900 text-3xl md:text-4xl mb-4 mt-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-slate-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-slate-500 line-through text-xl">
                ${product.originalPrice}
              </span>
              <span className="text-slate-900 text-4xl">
                ${product.price}
              </span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                Save 25%
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className="text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                In Stock
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-slate-700 mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-white border border-slate-200 w-10 h-10 rounded-lg hover:bg-slate-50 transition-all"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border border-slate-200 rounded-lg py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-white border border-slate-200 w-10 h-10 rounded-lg hover:bg-slate-50 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="bg-white border border-slate-200 p-4 rounded-lg hover:bg-slate-50 transition-all">
                <Heart className="w-5 h-5 text-slate-600" />
              </button>
              <button className="bg-white border border-slate-200 p-4 rounded-lg hover:bg-slate-50 transition-all">
                <Share2 className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Features */}
            <div className="bg-slate-100 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-cyan-600" />
                <span className="text-slate-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-cyan-600" />
                <span className="text-slate-700">2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-cyan-600" />
                <span className="text-slate-700">30-day return policy</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-8 mb-16"
        >
          {/* Tabs */}
          <div className="flex gap-6 border-b border-slate-200 mb-8">
            {["description", "features", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 capitalize transition-colors ${activeTab === tab
                  ? "text-cyan-600 border-b-2 border-cyan-600"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "description" && (
              <div>
                {product.description ? (
                  <p className="text-slate-600 leading-relaxed">{product.description}</p>
                ) : (
                  <p className="text-slate-600 leading-relaxed">No description available.</p>
                )}
              </div>
            )}

            {activeTab === "features" && (
              <div>
                <p className="text-slate-600">Features information coming soon.</p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Price</span>
                  <span className="text-slate-900">${price.toFixed(2)}</span>
                </div>
                {product.discount && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Discount</span>
                    <span className="text-slate-900">{product.discount}%</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Stock</span>
                  <span className="text-slate-900">{product.stock} units</span>
                </div>
                {product.category && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Category</span>
                    <span className="text-slate-900">{product.category}</span>
                  </div>
                )}
                {product.supplier && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Supplier</span>
                    <span className="text-slate-900">{product.supplier.name}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <p className="text-slate-600">Reviews feature coming soon.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetailPage;