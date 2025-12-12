"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { User, Camera, Save, ArrowLeft, X, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [preview, setPreview] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    setName(user.name || "");
    setEmail(user.email || "");
    setProfilePicture(user.profilePicture || "");
    setPreview(user.profilePicture || "");
  }, [user, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
        setProfilePicture(imageUrl);
        setPreview(imageUrl);
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    // Check if there are any changes
    const hasNameChange = name.trim() !== (user?.name || '');
    const hasEmailChange = email.trim() !== (user?.email || '');
    const hasImageChange = (preview || profilePicture) !== (user?.profilePicture || '');
    
    if (!hasNameChange && !hasEmailChange && !hasImageChange) {
      alert("No changes to save");
      return;
    }

    // Show confirmation modal
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    if (!updateUser || !user) {
      alert("Error: Cannot update profile");
      return;
    }

    // Get the profile picture - use preview if available, otherwise use profilePicture state
    const finalProfilePicture = preview || profilePicture;
    
    // Create updated user object with all required fields
    const updatedUser: typeof user = {
      id: user.id,
      name: name.trim(),
      email: email.trim(),
      profilePicture: finalProfilePicture || user.profilePicture || '',
      isAdmin: user.isAdmin || false
    };
    
    // Update user in context
    updateUser(updatedUser);
    
    // Also update local state
    setProfilePicture(finalProfilePicture || '');
    setPreview(finalProfilePicture || '');
    
    // Close modal
    setShowConfirmModal(false);
  };

  const handleCancelSave = () => {
    setShowConfirmModal(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          {/* Profile Card */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-white text-3xl mb-8 flex items-center gap-3">
              <User className="w-8 h-8" />
              My Profile
            </h1>

            <div className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500/50 bg-slate-700 flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {name[0]?.toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-slate-400 text-sm mt-4">Click camera icon to upload profile picture</p>
              </div>

              {/* Name Field */}
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-slate-900/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-900/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveClick}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-700 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-white text-xl font-semibold">Confirm Changes</h2>
                </div>
                <button
                  onClick={handleCancelSave}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-300 mb-6">
                Are you sure you want to update your profile? This will change your profile picture and/or name.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelSave}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSave}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Yes, Update
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

