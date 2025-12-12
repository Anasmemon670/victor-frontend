"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, X, Upload } from "lucide-react";
import { projects as sharedProjects } from "@/data/projects";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

interface Project {
  id: number;
  title: string;
  description: string;
  client: string;
  date: string;
  status: string;
  image?: string;
  features?: string[];
  year?: string;
}

// Convert shared projects to admin format
const convertToAdminFormat = (project: typeof sharedProjects[0]): Project => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    client: project.client,
    date: project.year || new Date().getFullYear().toString(),
    status: project.status,
    image: project.image,
    features: project.features,
    year: project.year
  };
};

// Initialize with shared projects converted to admin format
const initialProjects: Project[] = sharedProjects.map(convertToAdminFormat);

export function AdminProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    status: "Completed",
    image: "",
    features: "",
    year: ""
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  const getStatusColor = (status: string) => status === "Completed" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30";

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData({ title: "", description: "", client: "", status: "Completed", image: "", features: "", year: "" });
    setImagePreview("");
    setShowEditModal(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      client: project.client,
      status: project.status,
      image: project.image || "",
      features: project.features?.join(", ") || "",
      year: project.year || project.date
    });
    setImagePreview(project.image || "");
    setShowEditModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For local file preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Store file path or URL (in real app, you'd upload to server)
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.client.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    const finalImage = imagePreview || formData.image;

    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { 
              ...p, 
              ...formData,
              image: finalImage,
              features: formData.features ? formData.features.split(",").map(f => f.trim()) : [],
              date: formData.year || p.date
            }
          : p
      ));
      alert("Project updated successfully!");
    } else {
      // Add new project
      const newProject: Project = {
        id: Math.max(...projects.map(p => p.id)) + 1,
        ...formData,
        image: finalImage,
        features: formData.features ? formData.features.split(",").map(f => f.trim()) : [],
        date: formData.year || new Date().getFullYear().toString(),
        year: formData.year || new Date().getFullYear().toString()
      };
      setProjects([newProject, ...projects]);
      alert("Project added successfully!");
    }
    setShowEditModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl mb-2">Manage Projects</h1>
            <p className="text-slate-400">{projects.length} projects</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-start justify-between gap-4">
                {/* Project Image */}
                {project.image && (
                  <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white text-xl">{project.title}</h3>
                    <span className={`px-3 py-1 border rounded-full text-sm ${getStatusColor(project.status)}`}>{project.status}</span>
                  </div>
                  <p className="text-slate-400 mb-3">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Client: {project.client}</span>
                    <span>•</span>
                    <span>{project.year || project.date}</span>
                  </div>
                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.features.map((feature, i) => (
                        <span key={i} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg transition-all"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  {deleteConfirm === project.id ? (
                    <>
                      <button onClick={() => setProjects(projects.filter(p => p.id !== project.id))} className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all text-sm">Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-3 rounded-lg transition-all text-sm">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(project.id)} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl">{editingProject ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={() => setShowEditModal(false)} className="text-white hover:text-slate-400 transition-colors">
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
              <input
                type="text"
                placeholder="Client *"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="text"
                placeholder="Year (e.g., 2024)"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {/* Image Upload Section */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Image</label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-2 border border-slate-600">
                    <ImageWithFallback
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Image Upload Options */}
                <div className="flex gap-4">
                  {/* File Upload */}
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2 border border-slate-600">
                      <Upload className="w-5 h-5" />
                      Upload Image
                    </div>
                  </label>
                  
                  {/* URL Input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Or enter image URL"
                      value={formData.image}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
                <p className="text-slate-400 text-xs">Upload an image file or paste an image URL</p>
              </div>
              <textarea
                placeholder="Features (comma separated, e.g., Web Development, Mobile Apps)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminProjectsPage;