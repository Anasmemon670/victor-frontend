"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, X, Cpu, Code, Globe, Shield, Smartphone, Headphones, Zap, Rocket, Image as ImageIcon } from "lucide-react";
import { services as sharedServices } from "@/data/services";
import type { LucideIcon } from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Code,
  Globe,
  Shield,
  Smartphone,
  Headphones,
  Zap,
  Rocket
};

interface Service {
  id: number;
  title: string;
  description: string;
  features?: string[];
  price?: string;
  duration?: string;
  iconName?: string;
  IconComponent?: LucideIcon;
}

// Convert shared services to admin format
const convertToAdminFormat = (service: typeof sharedServices[0]): Service => {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    features: service.features,
    price: "", // Optional field
    duration: "", // Optional field
    iconName: service.iconName || "Cpu",
    IconComponent: service.icon
  };
};

// Initialize with shared services converted to admin format
const initialServices: Service[] = sharedServices.map(convertToAdminFormat);

export function AdminServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
    price: "",
    duration: "",
    iconName: "Cpu"
  });

  const handleAddNew = () => {
    setEditingService(null);
    setFormData({ title: "", description: "", features: "", price: "", duration: "", iconName: "Cpu" });
    setShowEditModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      features: service.features?.join(", ") || "",
      price: service.price || "",
      duration: service.duration || "",
      iconName: service.iconName || "Cpu"
    });
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill all required fields (Title and Description)!");
      return;
    }

    const selectedIcon = iconMap[formData.iconName] || Cpu;

    if (editingService) {
      // Update existing service
      setServices(services.map(s =>
        s.id === editingService.id
          ? { 
              ...s, 
              ...formData,
              features: formData.features ? formData.features.split(",").map(f => f.trim()) : [],
              iconName: formData.iconName,
              IconComponent: selectedIcon
            }
          : s
      ));
      alert("Service updated successfully!");
    } else {
      // Add new service
      const newService: Service = {
        id: Math.max(...services.map(s => s.id)) + 1,
        ...formData,
        features: formData.features ? formData.features.split(",").map(f => f.trim()) : [],
        iconName: formData.iconName,
        IconComponent: selectedIcon
      };
      setServices([...services, newService]);
      alert("Service added successfully!");
    }
    setShowEditModal(false);
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl mb-2">Manage Services</h1>
            <p className="text-slate-400">{services.length} services</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.IconComponent || iconMap[service.iconName || "Cpu"] || Cpu;
            return (
            <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-xl">{service.title}</h3>
              </div>
              <p className="text-slate-400 mb-4">{service.description}</p>
              
              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="mb-4">
                  <p className="text-slate-300 text-sm mb-2">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <span key={i} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {(service.price || service.duration) && (
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  {service.price && <span className="text-cyan-400">{service.price}</span>}
                  {service.price && service.duration && <span>•</span>}
                  {service.duration && <span>Duration: {service.duration}</span>}
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {deleteConfirm === service.id ? (
                  <>
                    <button onClick={() => setServices(services.filter(s => s.id !== service.id))} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all">Confirm</button>
                    <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setDeleteConfirm(service.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
            </motion.div>
          );
          })}
        </div>

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-2xl">{editingService ? "Edit Service" : "Add New Service"}</h2>
                <button onClick={handleCancel} className="text-white hover:text-slate-400 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <textarea
                  placeholder="Description *"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <textarea
                  placeholder="Features (comma separated, e.g., Cloud Computing, IT Infrastructure)"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Price (optional, e.g., $2,999)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Duration (optional, e.g., 4-6 weeks)"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                
                {/* Icon Selection */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Icon</label>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(iconMap).map(([name, IconComponent]) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setFormData({ ...formData, iconName: name })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.iconName === name
                            ? "border-cyan-500 bg-cyan-500/20"
                            : "border-slate-600 bg-slate-700 hover:border-slate-500"
                        }`}
                      >
                        <IconComponent className={`w-6 h-6 mx-auto ${
                          formData.iconName === name ? "text-cyan-400" : "text-slate-400"
                        }`} />
                        <p className={`text-xs mt-1 ${
                          formData.iconName === name ? "text-cyan-400" : "text-slate-500"
                        }`}>{name}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs">Select an icon for this service</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminServicesPage;