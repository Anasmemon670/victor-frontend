export const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 149.99,
        originalPrice: 199.99,
        rating: 4.8,
        reviews: 256,
        category: "Audio",
        discount: "25% OFF",
        image: "/images/products/headphones.png",
        description: "Experience premium sound quality with our state-of-the-art wireless headphones. Featuring advanced noise cancellation, comfortable design, and long-lasting battery life.",
        features: [
            "Active Noise Cancellation (ANC)",
            "40-hour battery life",
            "Premium sound quality",
            "Comfortable over-ear design",
            "Bluetooth 5.0 connectivity"
        ],
        specifications: {
            "Driver Size": "40mm",
            "Frequency Response": "20Hz - 20kHz",
            "Impedance": "32 Ohms",
            "Battery": "40 hours"
        }
    },
    {
        id: 2,
        name: "Smart Watch Pro 2024",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.6,
        reviews: 189,
        category: "Wearables",
        discount: "25% OFF",
        image: "/images/products/smart-watch.png",
        description: "Stay connected and track your fitness with the Smart Watch Pro 2024. Featuring a vivid OLED display and advanced health monitoring sensors.",
        features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "Sleep Tracking"],
        specifications: { "Display": "1.5 inch OLED", "Battery": "3 days", "Water Resistance": "5ATM" }
    },
    {
        id: 3,
        name: "Ergonomic Laptop Stand",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.9,
        reviews: 412,
        category: "Accessories",
        discount: "20% OFF",
        image: "/images/products/laptop-stand.png",
        description: "Improve your posture and productivity with this adjustable aluminum laptop stand.",
        features: ["Adjustable Height", "Aluminum Alloy", "Anti-slip Pads", "Foldable"],
        specifications: { "Material": "Aluminum", "Max Height": "15cm", "Weight Load": "5kg" }
    },
    {
        id: 4,
        name: "USB-C Multi-Port Hub",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.7,
        reviews: 324,
        category: "Accessories",
        discount: "29% OFF",
        image: "/images/products/usb-hub.png",
        description: "Expand your connectivity with this 7-in-1 USB-C hub. Perfect for modern laptops.",
        features: ["4K HDMI", "3x USB 3.0", "SD Card Reader", "PD Charging"],
        specifications: { "Ports": "7", "Output": "4K @ 30Hz", "Material": "Aluminum" }
    },
    {
        id: 5,
        name: "Wireless Charging Pad",
        price: 39.99,
        originalPrice: 59.99,
        rating: 4.5,
        reviews: 198,
        category: "Accessories",
        discount: "33% OFF",
        image: "/images/products/charging-pad.png",
        description: "Fast wireless charging for your smartphone and accessories. Sleek and compact design.",
        features: ["15W Fast Charging", "Qi Certified", "LED Indicator", "Non-slip Surface"],
        specifications: { "Input": "USB-C", "Output": "15W Max", "Compatibility": "Qi-enabled devices" }
    },
    {
        id: 6,
        name: "Portable Bluetooth Speaker",
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.8,
        reviews: 267,
        category: "Audio",
        discount: "31% OFF",
        image: "/images/products/bluetooth-speaker.png",
        description: "Bring the party anywhere with this powerful portable speaker. Waterproof and rugged.",
        features: ["360° Sound", "IPX7 Waterproof", "12-hour Battery", "Stereo Pairing"],
        specifications: { "Power": "20W", "Battery": "4000mAh", "Bluetooth": "5.0" }
    },
    {
        id: 7,
        name: "Mechanical Gaming Keyboard",
        price: 129.99,
        originalPrice: 179.99,
        rating: 4.7,
        reviews: 342,
        category: "Gaming",
        discount: "28% OFF",
        image: "/images/products/laptop-stand.png", // Using fallback image as per previous context
        description: "Dominate your games with our responsive mechanical keyboard. RGB backlighting and durable switches.",
        features: ["RGB Backlight", "Mechanical Switches", "Anti-ghosting", "Macro Keys"],
        specifications: { "Switch Type": "Red/Blue", "Key Life": "50 Million", "Connection": "USB-C" }
    },
    {
        id: 8,
        name: "4K Webcam Pro",
        price: 119.99,
        originalPrice: 159.99,
        rating: 4.6,
        reviews: 213,
        category: "Accessories",
        discount: "25% OFF",
        image: "/images/products/usb-hub.png", // Fallback
        description: "Look your best in every meeting with this crystal clear 4K webcam.",
        features: ["4K Resolution", "Auto-focus", "Built-in Mic", "Privacy Cover"],
        specifications: { "Resolution": "3840x2160", "FPS": "30fps", "FOV": "90°" }
    },
    {
        id: 9,
        name: "Noise Cancelling Earbuds",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.9,
        reviews: 489,
        category: "Audio",
        discount: "20% OFF",
        image: "/images/products/headphones.png", // Fallback
        description: "True wireless freedom with industry-leading noise cancellation.",
        features: ["Active Noise Cancellation", "Transparency Mode", "24h Battery", "IPX4 Water Resistant"],
        specifications: { "Driver": "11mm", "Battery": "6h + 18h case", "Charging": "Wireless" }
    },
    {
        id: 10,
        name: "Smart Home Hub",
        price: 149.99,
        originalPrice: 199.99,
        rating: 4.5,
        reviews: 156,
        category: "Smart Home",
        discount: "25% OFF",
        image: "/images/products/bluetooth-speaker.png", // Fallback
        description: "Control your entire home with one device. Compatible with all major smart home ecosystems.",
        features: ["Voice Control", "Touch Screen", "Zigbee & Z-Wave", "Automation"],
        specifications: { "Screen": "7 inch", "Connectivity": "WiFi, Bluetooth", "Power": "DC 12V" }
    },
    {
        id: 11,
        name: "Portable SSD 1TB",
        price: 99.99,
        originalPrice: 149.99,
        rating: 4.8,
        reviews: 278,
        category: "Storage",
        discount: "33% OFF",
        image: "/images/products/charging-pad.png", // Fallback
        description: "High-speed storage in your pocket. Perfect for creators and professionals.",
        features: ["1050MB/s Read", "Shock Resistant", "USB-C", "Encryption"],
        specifications: { "Capacity": "1TB", "Interface": "USB 3.2 Gen 2", "Weight": "50g" }
    },
    {
        id: 12,
        name: "Wireless Gaming Mouse",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.7,
        reviews: 391,
        category: "Gaming",
        discount: "20% OFF",
        image: "/images/products/usb-hub.png", // Fallback
        description: "Ultra-low latency wireless gaming mouse with high precision sensor.",
        features: ["20K DPI Sensor", "Lightweight", "RGB Lighting", "Programmable Buttons"],
        specifications: { "DPI": "20,000", "Polling Rate": "1000Hz", "Battery": "70 hours" }
    },
];

