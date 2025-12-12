"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { allOffers, bigOffers, otherOffers } from "@/data/offers";

export function OffersPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedTab, setSelectedTab] = useState<"all" | "big" | "other">("all");
  const [displayedOffers, setDisplayedOffers] = useState(allOffers);

  useEffect(() => {
    if (selectedTab === "all") {
      setDisplayedOffers(allOffers);
    } else if (selectedTab === "big") {
      setDisplayedOffers(bigOffers);
    } else if (selectedTab === "other") {
      setDisplayedOffers(otherOffers);
    }
  }, [selectedTab]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-3">
              <span className="text-sm">★ Exclusive Deals</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl mb-6">
              {selectedTab === "all" ? "All Offers" : selectedTab === "big" ? "Big Offers" : "Other Offers"}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed">
              {selectedTab === "all" 
                ? "Discover our complete collection of exclusive deals and special offers. Quality products at unbeatable prices."
                : selectedTab === "big"
                ? "Discover our most exclusive deals and products at competitive prices. Quality and value that you can trust."
                : "Explore additional products with special pricing. Quality products at competitive rates."
              }
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 justify-center py-4">
            <button
              onClick={() => setSelectedTab("all")}
              className={`px-6 py-3 rounded-lg transition-all font-medium ${
                selectedTab === "all"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Offers ({allOffers.length})
            </button>
            <button
              onClick={() => setSelectedTab("big")}
              className={`px-6 py-3 rounded-lg transition-all font-medium ${
                selectedTab === "big"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Big Offers ({bigOffers.length})
            </button>
            <button
              onClick={() => setSelectedTab("other")}
              className={`px-6 py-3 rounded-lg transition-all font-medium ${
                selectedTab === "other"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Other Offers ({otherOffers.length})
            </button>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {displayedOffers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedOffers.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all group border border-slate-200"
                >
                  {/* Product Image with Discount Badge */}
                  <div
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="relative h-56 overflow-hidden cursor-pointer"
                  >
                    <ImageWithFallback
                      src={product.imageQuery}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                      {product.discount}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="text-slate-900 text-lg mb-2 cursor-pointer hover:text-cyan-600 transition-colors"
                    >
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < product.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                            }`}
                        />
                      ))}
                      <span className="text-slate-500 text-sm ml-1">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-slate-900 text-2xl font-semibold">${product.price}</span>
                      <span className="text-slate-500 line-through text-sm">
                        ${product.originalPrice}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id.toString(),
                          name: product.name,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: product.imageQuery
                        });
                      }}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                    >
                      Add to Cart
                      <span>+</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">No offers available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OffersPage;

