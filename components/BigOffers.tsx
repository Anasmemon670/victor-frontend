"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { bigOffers as products } from "@/data/offers";

export function BigOffers() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("big-offers");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="big-offers" className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-cyan-400 mb-3">
            <span className="text-sm">★ Exclusive Deals</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4">
            Big Offers
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Discover our most exclusive deals and products at competitive prices. Quality and value that you can trust.
          </p>
        </motion.div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all group"
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
                  className="text-white text-lg mb-2 cursor-pointer hover:text-cyan-400 transition-colors"
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
                        : "text-slate-600"
                        }`}
                    />
                  ))}
                  <span className="text-slate-400 text-sm ml-1">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white text-2xl">${product.price}</span>
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <button
            onClick={() => router.push('/offers')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
          >
            View All Offers
            <span>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}