"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export function OtherProducts() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    { id: "1", name: "Wireless Headphones", rating: 4.8, reviews: 256, price: 149.99, image: "/images/products/headphones.png" },
    { id: "2", name: "Smart Watch Pro", rating: 4.6, reviews: 189, price: 299.99, image: "/images/products/smart-watch.png" },
    { id: "3", name: "Laptop Stand", rating: 4.9, reviews: 412, price: 79.99, image: "/images/products/laptop-stand.png" },
    { id: "4", name: "USB-C Hub", rating: 4.7, reviews: 324, price: 49.99, image: "/images/products/usb-hub.png" },
    { id: "5", name: "Wireless Charger", rating: 4.5, reviews: 198, price: 39.99, image: "/images/products/charging-pad.png" },
    { id: "6", name: "Bluetooth Speaker", rating: 4.8, reviews: 267, price: 89.99, image: "/images/products/bluetooth-speaker.png" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("other-products");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section id="other-products" className="py-12 sm:py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-600 mb-2">
              <span className="text-xs sm:text-sm">★ Premium Collection</span>
            </div>
            <h2 className="text-slate-900 text-2xl sm:text-3xl md:text-4xl mb-2">
              Other Products
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Discover our complete range of products designed for your daily needs.
            </p>
          </div>
          <button
            onClick={() => router.push("/products")}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base"
          >
            Explore All
          </button>
        </motion.div>

        {/* Products Grid */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 transition-all hidden lg:block"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 transition-all hidden lg:block"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>

          {/* Grid/Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => router.push(`/product/${product.id}`)}
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group border border-slate-200 hover:border-cyan-500"
              >
                {/* Image */}
                <div className="h-48 sm:h-56 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-slate-900 text-xl mb-2 group-hover:text-cyan-600 transition-colors">
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

                  <p className="text-slate-600 text-sm mb-4">
                    High-quality product with premium features and design.
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 text-2xl">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image
                        });
                        toast.success(`${product.name} added to cart!`, {
                          duration: 2000,
                        });
                      }}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}