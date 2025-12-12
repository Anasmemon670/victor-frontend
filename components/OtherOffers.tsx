"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/navigation";

export function OtherOffers() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const offers = [
    { id: 1, title: "Smart Accessories", discount: "30% OFF", price: "$49.99", image: "/images/products/usb-hub.png" },
    { id: 2, title: "Tech Gadgets", discount: "25% OFF", price: "$79.99", image: "/images/products/charging-pad.png" },
    { id: 3, title: "Home Automation", discount: "40% OFF", price: "$129.99", image: "/images/products/bluetooth-speaker.png" },
    { id: 4, title: "Wearable Tech", discount: "35% OFF", price: "$89.99", image: "/images/products/smart-watch.png" },
    { id: 5, title: "Audio Devices", discount: "20% OFF", price: "$59.99", image: "/images/products/bluetooth-speaker.png" },
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

    const element = document.getElementById("other-offers");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <section id="other-offers" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-600 mb-2">
              <span className="text-sm">★ Special Deals</span>
            </div>
            <h2 className="text-slate-900 text-3xl md:text-4xl mb-2">
              Other Offers
            </h2>
            <p className="text-slate-600">
              Explore additional products with special pricing. Quality products at competitive rates.
            </p>
          </div>
          <button
            onClick={() => router.push('/offers')}
            className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2 transition-colors"
          >
            View All Offers
            <span>→</span>
          </button>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 transition-all hidden md:block"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 transition-all hidden md:block"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>

          {/* Carousel Items */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentSlide * (100 / 3)}%` }}
              transition={{ duration: 0.5 }}
            >
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                >
                  <div className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group border border-slate-200 hover:border-cyan-500">
                    {/* Image */}
                    <div className="h-48 overflow-hidden">
                      <ImageWithFallback
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="bg-cyan-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-3">
                        {offer.discount}
                      </span>
                      <h3 className="text-slate-900 text-xl mb-2">{offer.title}</h3>
                      <p className="text-slate-600 text-sm mb-4">
                        Quality products at competitive rates
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-900 text-xl">{offer.price}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/product/${offer.id}`);
                          }}
                          className="text-cyan-600 hover:text-cyan-700 transition-colors"
                        >
                          Learn More →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
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

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-cyan-600 w-8" : "bg-slate-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}