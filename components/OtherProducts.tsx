"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { productsAPI } from "@/lib/api";

interface Product {
  id: string;
  title: string;
  price: string;
  images?: string[] | null;
  slug?: string;
}

export function OtherProducts() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll({ limit: 12 });
        setProducts(response.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    setCurrentSlide((prev) => (prev + 3 >= products.length ? 0 : prev + 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 3 < 0 ? Math.max(0, products.length - 3) : prev - 3));
  };

  if (products.length === 0 && !loading) {
    return null; // Don't show section if no products
  }

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