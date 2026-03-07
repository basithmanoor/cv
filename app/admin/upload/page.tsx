"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { UploadCloud, Image as ImageIcon, Loader2, CheckCircle2, X, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("poster");
  const [externalLink, setExternalLink] = useState("");
  const [isHighlight, setIsHighlight] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: "poster", label: "Poster Design" },
    { id: "flyer", label: "Flyer Design" },
    { id: "save", label: "Save the Date" },
    { id: "logo", label: "Logo Design" },
    { id: "magazine", label: "Magazine" },
    { id: "bullet", label: "Bulletin" },
  ];

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setStatus({ type: "error", message: "Please upload a valid image file." });
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setStatus(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: "error", message: "Please select an image to upload." });
      return;
    }
    if (!title) {
      setStatus({ type: "error", message: "Please enter a project title." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("projects").insert([
        {
          title,
          description,
          category,
          poster_image_url: publicUrl,
          is_highlight: isHighlight,
          external_link: (category === 'magazine' || category === 'bullet') ? externalLink : null,
        },
      ]);

      if (dbError) throw dbError;

      setStatus({ type: "success", message: "Project uploaded successfully!" });
      setTitle("");
      setDescription("");
      setCategory("poster");
      setExternalLink("");
      setIsHighlight(false);
      handleRemoveFile();

    } catch (error: any) {
      console.error("Upload error:", error);
      setStatus({ type: "error", message: error.message || "Failed to upload project." });
    } finally {
      setLoading(false);
    }
  };

  const needsLink = category === 'magazine' || category === 'bullet';

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload New Work</h1>
        <p className="text-brand-muted">Add a new poster or design to your portfolio.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column: Image Upload Area */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-accent" /> Project Image
            </h3>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex-1 min-h-[300px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all relative overflow-hidden ${
                isDragging ? "border-brand-accent bg-brand-accent/5" : "border-white/20 hover:border-white/40 bg-brand-dark/50"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFileSelection(e.target.files[0])}
                accept="image/*"
                className="hidden"
              />

              <AnimatePresence>
                {previewUrl ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-2"
                  >
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-md transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-muted group-hover:text-brand-accent transition-colors">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <p className="font-semibold text-white mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-brand-muted">SVG, PNG, JPG or WEBP (Max 5MB)</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Details Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
          <div className="bg-brand-surface border border-white/10 rounded-2xl p-6">

            {status && (
              <div className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-3 ${
                status.type === "success" ? "bg-green-500/10 border border-green-500/50 text-green-400" : "bg-red-500/10 border border-red-500/50 text-red-400"
              }`}>
                {status.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <X className="w-5 h-5 shrink-0" />}
                {status.message}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="e.g. MSF Thavanur Poster"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-accent transition-colors appearance-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Conditional External Link Input */}
              <AnimatePresence>
                {needsLink && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" /> Read Link (Drive, PDF, etc.)
                    </label>
                    <input
                      type="url"
                      required={needsLink}
                      value={externalLink}
                      onChange={(e) => setExternalLink(e.target.value)}
                      className="w-full bg-brand-dark border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="https://..."
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-accent transition-colors resize-none"
                  placeholder="Brief details about this project..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsHighlight(!isHighlight)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isHighlight ? "bg-brand-orange" : "bg-gray-600"}`}
                >
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isHighlight ? "translate-x-6" : "translate-x-0"}`} />
                </button>
                <span className="text-sm font-medium text-gray-300">Highlight on Homepage</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-accent text-black font-bold py-4 rounded-xl hover:bg-brand-orange transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Upload Project"}
          </button>
        </motion.div>

      </form>
    </div>
  );
}