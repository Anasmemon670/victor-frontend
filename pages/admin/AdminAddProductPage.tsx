"use client";

import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ArrowLeft, Upload, Package, X } from "lucide-react";

export function AdminAddProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    discount: "",
    onOffer: false,
    bigOffer: false,
    productType: "internal",
    externalUrl: "",
    supplier: "no-supplier",
    supplierProductId: "",
    autoOrder: false
  });

  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load product data when editing
  useEffect(() => {
    if (isEdit && id && typeof window !== 'undefined') {
      let existingProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
      
      // If no products in localStorage, initialize with empty array (products should be added via AdminProductsPage)
      if (existingProducts.length === 0) {
        console.warn('No products found in localStorage. Please add products first.');
        return;
      }
      
      const productId = parseInt(id as string);
      const product = existingProducts.find((p: any) => p.id === productId);
      
      if (product) {
        setFormData({
          name: product.name || "",
          price: product.price?.toString() || "",
          category: product.category || "",
          description: product.description || "",
          discount: product.discount?.toString() || "0",
          onOffer: product.onOffer || false,
          bigOffer: product.bigOffer || false,
          productType: "internal",
          externalUrl: "",
          supplier: "no-supplier",
          supplierProductId: "",
          autoOrder: false
        });
        if (product.image) {
          setImages([product.image]);
        }
      } else {
        console.error(`Product with ID ${productId} not found`);
        alert(`Product with ID ${productId} not found. Redirecting to products page.`);
        router.push('/admin/products');
      }
    }
  }, [isEdit, id, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.productType === "external" && !formData.externalUrl.trim()) {
      newErrors.externalUrl = "External URL is required for external products";
    }
    if (formData.supplier !== "no-supplier" && !formData.supplierProductId.trim()) {
      newErrors.supplierProductId = "Supplier Product ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Get existing products from localStorage
    const existingProducts = typeof window !== 'undefined' 
      ? JSON.parse(localStorage.getItem('adminProducts') || '[]')
      : [];

    if (isEdit && id) {
      const productId = parseInt(id as string);
      // Find existing product to preserve its image if no new images added
      const existingProduct = existingProducts.find((p: any) => p.id === productId);
      
      if (!existingProduct) {
        alert(`Product with ID ${productId} not found. Please try again.`);
        router.push('/admin/products');
        return;
      }
      
      // Get image URL (use first image if available, otherwise use existing or generate one)
      const productImage = images.length > 0 
        ? images[0] 
        : (existingProduct?.image || `https://source.unsplash.com/400x300/?product,tech,${formData.name}`);

      // Update existing product
      const updatedProducts = existingProducts.map((p: any) => 
        p.id === productId
          ? {
              ...p,
              name: formData.name,
              price: parseFloat(formData.price),
              category: formData.category,
              description: formData.description,
              discount: formData.discount ? parseInt(formData.discount) : 0,
              onOffer: formData.onOffer,
              bigOffer: formData.bigOffer,
              image: productImage
            }
          : p
      );
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      alert("Product updated successfully!");
    } else {
      // Add new product
      const newId = existingProducts.length > 0 
        ? Math.max(...existingProducts.map((p: any) => p.id)) + 1 
        : 1;
      
      // Get image URL for new product
      const productImage = images.length > 0 
        ? images[0] 
        : `https://source.unsplash.com/400x300/?product,tech,${formData.name}`;
      
      const newProduct = {
        id: newId,
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        discount: formData.discount ? parseInt(formData.discount) : 0,
        onOffer: formData.onOffer,
        bigOffer: formData.bigOffer,
        image: productImage
      };

      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      alert("Product added successfully!");
    }

    router.push("/admin/products");
  };

  const handleImageAdd = () => {
    // Trigger file input click
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      // Convert file to base64 data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImages([...images, imageUrl]);
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
    
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    console.log("Image removed at index:", index);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/admin/products")}
            className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-lg border border-slate-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white text-3xl">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-slate-400">Fill in the product details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-white text-xl mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  className={`w-full px-4 py-3 bg-slate-700 border ${errors.name ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Category *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Electronics, Home & Kitchen"
                  className={`w-full px-4 py-3 bg-slate-700 border ${errors.category ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
                {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
              </div>
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className={`w-full px-4 py-3 bg-slate-700 border ${errors.price ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
                {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Discount (%)</label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  placeholder="0"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-slate-300 text-sm mb-2 block">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
                rows={4}
                className={`w-full px-4 py-3 bg-slate-700 border ${errors.description ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Checkboxes */}
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.onOffer}
                  onChange={(e) => setFormData({ ...formData, onOffer: e.target.checked })}
                  className="w-5 h-5 text-cyan-500 bg-slate-700 border-slate-600 rounded focus:ring-2 focus:ring-cyan-500"
                />
                <span className="text-slate-300">Mark as On Offer</span>
              </label>
            </div>
          </div>

          {/* Images */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-white text-xl mb-4">Product Images</h2>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={handleImageAdd}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Add Image
            </button>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Type */}
          <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-6 h-6 text-green-400" />
              <h2 className="text-white text-xl">Product Type</h2>
            </div>

            <div className="mb-4">
              <label className="text-slate-300 text-sm mb-2 block">Type</label>
              <select
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="internal">Internal Product (API)</option>
                <option value="external">External Product</option>
              </select>
            </div>

            {formData.productType === "external" && (
              <div className="mb-4">
                <label className="text-slate-300 text-sm mb-2 block">External URL *</label>
                <input
                  type="url"
                  value={formData.externalUrl}
                  onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                  placeholder="https://example.com/product"
                  className={`w-full px-4 py-3 bg-slate-700 border ${errors.externalUrl ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
                {errors.externalUrl && <p className="text-red-400 text-xs mt-1">{errors.externalUrl}</p>}
              </div>
            )}

            {/* Big Offer Checkbox */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.bigOffer}
                  onChange={(e) => setFormData({ ...formData, bigOffer: e.target.checked })}
                  className="w-5 h-5 mt-1 text-cyan-500 bg-slate-700 border-slate-600 rounded focus:ring-2 focus:ring-cyan-500"
                />
                <div>
                  <span className="text-white">Big Offer</span>
                  <p className="text-slate-400 text-sm mt-1">
                    Mark this product as a "Big Offer". It will be featured in the Big Offers section on the home page. Maximum 4 products can be marked as big offers.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Supplier Integration */}
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-400 text-xl">🔗</span>
              <h2 className="text-white text-xl">Supplier Integration</h2>
            </div>

            <div className="mb-4">
              <label className="text-slate-300 text-sm mb-2 block">Supplier</label>
              <select
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="no-supplier">No Supplier Integration</option>
                <option value="supplier-1">Supplier 1 - TechDistributor Inc.</option>
                <option value="supplier-2">Supplier 2 - GlobalWholesale Co.</option>
                <option value="supplier-3">Supplier 3 - DirectSource Ltd.</option>
              </select>
            </div>

            {formData.supplier !== "no-supplier" && (
              <>
                <div className="mb-4">
                  <label className="text-slate-300 text-sm mb-2 block">Supplier Product ID *</label>
                  <input
                    type="text"
                    value={formData.supplierProductId}
                    onChange={(e) => setFormData({ ...formData, supplierProductId: e.target.value })}
                    placeholder="e.g., SKU-ABC12345"
                    className={`w-full px-4 py-3 bg-slate-700 border ${errors.supplierProductId ? 'border-red-500' : 'border-slate-600'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  {errors.supplierProductId && <p className="text-red-400 text-xs mt-1">{errors.supplierProductId}</p>}
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.autoOrder}
                      onChange={(e) => setFormData({ ...formData, autoOrder: e.target.checked })}
                      className="w-5 h-5 text-cyan-500 bg-slate-700 border-slate-600 rounded focus:ring-2 focus:ring-cyan-500"
                    />
                    <span className="text-slate-300">Auto Order Enabled</span>
                  </label>
                  <p className="text-slate-400 text-sm mt-2 ml-8">
                    Automatically place order with supplier when customer orders this product
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all border border-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-all shadow-lg"
            >
              {isEdit ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminAddProductPage;