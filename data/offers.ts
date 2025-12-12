// Big Offers Products
export const bigOffers = [
  {
    id: 1,
    name: "MacBook Pro M3 16\"",
    price: 2249.99,
    originalPrice: 2499.99,
    discount: "10% OFF",
    rating: 5,
    reviews: 142,
    imageQuery: "/images/products/laptop-stand.png"
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1399.99,
    discount: "15% OFF",
    rating: 5,
    reviews: 328,
    imageQuery: "/images/products/smart-watch.png"
  },
  {
    id: 3,
    name: "Dyson V15 Vacuum",
    price: 599.99,
    originalPrice: 749.99,
    discount: "20% OFF",
    rating: 5,
    reviews: 89,
    imageQuery: "/images/products/bluetooth-speaker.png"
  },
  {
    id: 4,
    name: "Peloton Bike+",
    price: 1871.25,
    originalPrice: 2495.00,
    discount: "25% OFF",
    rating: 5,
    reviews: 256,
    imageQuery: "/images/products/smart-watch.png"
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    price: 349.99,
    originalPrice: 399.99,
    discount: "13% OFF",
    rating: 5,
    reviews: 512,
    imageQuery: "/images/products/headphones.png"
  },
  {
    id: 6,
    name: "Samsung Galaxy Watch",
    price: 279.99,
    originalPrice: 349.99,
    discount: "20% OFF",
    rating: 5,
    reviews: 198,
    imageQuery: "/images/products/smart-watch.png"
  },
  {
    id: 7,
    name: "iPad Pro 12.9\"",
    price: 999.99,
    originalPrice: 1199.99,
    discount: "17% OFF",
    rating: 5,
    reviews: 421,
    imageQuery: "/images/products/charging-pad.png"
  },
  {
    id: 8,
    name: "Canon EOS R5 Camera",
    price: 3399.99,
    originalPrice: 3899.99,
    discount: "13% OFF",
    rating: 5,
    reviews: 167,
    imageQuery: "/images/products/usb-hub.png"
  },
];

// Other Offers Products
export const otherOffers = [
  { id: 9, name: "Smart Accessories", price: 49.99, originalPrice: 71.42, discount: "30% OFF", rating: 4, reviews: 89, imageQuery: "/images/products/usb-hub.png" },
  { id: 10, name: "Tech Gadgets", price: 79.99, originalPrice: 106.65, discount: "25% OFF", rating: 4, reviews: 156, imageQuery: "/images/products/charging-pad.png" },
  { id: 11, name: "Home Automation", price: 129.99, originalPrice: 216.65, discount: "40% OFF", rating: 5, reviews: 234, imageQuery: "/images/products/bluetooth-speaker.png" },
  { id: 12, name: "Wearable Tech", price: 89.99, originalPrice: 138.45, discount: "35% OFF", rating: 4, reviews: 178, imageQuery: "/images/products/smart-watch.png" },
  { id: 13, name: "Audio Devices", price: 59.99, originalPrice: 74.99, discount: "20% OFF", rating: 4, reviews: 267, imageQuery: "/images/products/bluetooth-speaker.png" },
];

// All Offers Combined
export const allOffers = [...bigOffers, ...otherOffers];

