"use client";

import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { Star, Filter, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Audio", "Wearables", "Accessories", "Gaming", "Smart Home", "Storage"];

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
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        // Keep original order
        break;
    }
    return sorted;
  }, [selectedCategory, sortBy]);

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.stopPropagation();
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      originalPrice: product.originalPrice
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-cyan-400 mb-3">
              <span className="text-xs sm:text-sm">★ Premium Products</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">Our Products</h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl">
              Discover our complete range of premium technology products designed for your daily needs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Filter and Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white border border-slate-200 px-3 sm:px-4 py-2 rounded-lg hover:border-cyan-500 transition-all text-xs sm:text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Category Pills */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-4 py-2 rounded-lg transition-all text-xs sm:text-sm ${selectedCategory === cat
                    ? "bg-cyan-500 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-200 px-3 sm:px-4 py-2 pr-10 rounded-lg hover:border-cyan-500 transition-all cursor-pointer w-full md:w-auto text-xs sm:text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Products Count */}
        <p className="text-slate-600 mb-6">
          Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> products
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => router.push(`/product/${product.id}`)}
              className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer group border border-slate-200 hover:border-cyan-500"
            >
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm z-10">
                  {product.discount}
                </div>
              )}

              {/* Product Image */}
              <div
                className="h-48 sm:h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-cyan-50 group-hover:to-blue-50 transition-all relative overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <span className="text-cyan-600 text-sm">{product.category}</span>
                <h3
                  className="text-slate-900 text-lg mb-2 group-hover:text-cyan-600 transition-colors"
                >
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-600 text-sm">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-slate-500 line-through text-sm">
                    ${product.originalPrice}
                  </span>
                  <span className="text-slate-900 text-2xl">
                    ${product.price}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition-all transform group-hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;