"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Edit, Trash2, Plus, X, Upload, Image as ImageIcon } from "lucide-react";
import { blogPosts as sharedBlogPosts, featuredPost } from "@/data/blogPosts";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime?: string;
  content?: string;
}

// Convert shared blogs to admin format
const convertToAdminFormat = (post: typeof sharedBlogPosts[0] | typeof featuredPost): BlogPost => {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    category: post.category,
    image: post.image,
    readTime: 'readTime' in post ? post.readTime : undefined,
    content: 'content' in post ? post.content : undefined
  };
};

// Initialize with shared blogs (including featured post)
const initialBlogs: BlogPost[] = [
  convertToAdminFormat(featuredPost),
  ...sharedBlogPosts.map(convertToAdminFormat)
];

export function AdminBlogPage() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "",
    image: "",
    content: "",
    readTime: ""
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleAddNew = () => {
    setEditingBlog(null);
    setFormData({ title: "", excerpt: "", author: "Admin", category: "", image: "", content: "", readTime: "" });
    setImagePreview("");
    setShowEditModal(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      category: blog.category,
      image: blog.image,
      content: blog.content || "",
      readTime: blog.readTime || ""
    });
    setImagePreview(blog.image);
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
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.category.trim() || !formData.image.trim()) {
      alert("Please fill all required fields including image!");
      return;
    }

    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(b =>
        b.id === editingBlog.id
          ? {
            ...b,
            ...formData,
            image: imagePreview || formData.image,
            content: formData.content,
            readTime: formData.readTime
          }
          : b
      ));
      alert("Blog post updated successfully!");
    } else {
      // Add new blog
      const newBlog: BlogPost = {
        id: Math.max(...blogs.map(b => b.id)) + 1,
        ...formData,
        image: imagePreview || formData.image,
        content: formData.content,
        readTime: formData.readTime,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      setBlogs([newBlog, ...blogs]);
      alert("Blog post added successfully!");
    }
    setShowEditModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl mb-2">Manage Blog</h1>
            <p className="text-slate-400 text-sm sm:text-base">{blogs.length} blog posts</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add New Post
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {blogs.map((blog, index) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Blog Image */}
                <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-lg sm:text-xl mb-2">{blog.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base mb-3">{blog.excerpt}</p>

                  {/* Full Content Preview */}
                  {blog.content && (
                    <div className="mb-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700 max-h-32 overflow-y-auto">
                      <div
                        className="text-slate-300 text-sm prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 200) + (blog.content.length > 200 ? '...' : '') }}
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500">
                    <span>By {blog.author}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{blog.date}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-cyan-400">{blog.category}</span>
                    {blog.readTime && (
                      <>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto sm:ml-4 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 sm:p-3 rounded-lg transition-all flex-1 sm:flex-none"
                  >
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  {deleteConfirm === blog.id ? (
                    <>
                      <button onClick={() => setBlogs(blogs.filter(b => b.id !== blog.id))} className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all text-xs sm:text-sm flex-1 sm:flex-none">Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all text-xs sm:text-sm flex-1 sm:flex-none">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(blog.id)} className="bg-red-500 hover:bg-red-600 text-white p-2.5 sm:p-3 rounded-lg transition-all flex-1 sm:flex-none">
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-4 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-white text-xl sm:text-2xl">{editingBlog ? "Edit Blog Post" : "Add New Blog Post"}</h2>
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
                  placeholder="Excerpt *"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Author *"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Category *"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Read Time (e.g., 5 min read)"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <textarea
                  placeholder="Full Content (HTML supported)"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-slate-700 text-white px-4 py-3 rounded-lg w-full h-40 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
                />
                <p className="text-slate-400 text-xs">You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, etc.</p>

                {/* Image Upload Section - Separate Field */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Image *</label>

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
                  <p className="text-slate-400 text-xs">Upload an image file or paste an image URL. Image is separate from title/description.</p>
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
                  onClick={() => setShowEditModal(false)}
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

export default AdminBlogPage;