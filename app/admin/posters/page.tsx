"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Trash2, Star, Loader2, AlertCircle, Edit, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define the Project type with external_link
type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  poster_image_url: string;
  is_highlight: boolean;
  external_link: string | null;
  created_at: string;
};

export default function ManagePostersPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Editing State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", category: "", external_link: "" });
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    { id: "poster", label: "Poster Design" },
    { id: "flyer", label: "Flyer Design" },
    { id: "save", label: "Save the Date" },
    { id: "logo", label: "Logo Design" },
    { id: "magazine", label: "Magazine" },
    { id: "bullet", label: "Bulletin" },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (!error) setProjects(data || []);
    setLoading(false);
  };

  const toggleHighlight = async (id: string, currentStatus: boolean) => {
    setActionLoading(id);
    const { error } = await supabase.from("projects").update({ is_highlight: !currentStatus }).eq("id", id);
    if (!error) setProjects(projects.map(p => p.id === id ? { ...p, is_highlight: !currentStatus } : p));
    setActionLoading(null);
  };

  const deleteProject = async (id: string, imageUrl: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setActionLoading(id);
    try {
      const pathMatch = imageUrl.match(/\/portfolio-images\/(.+)$/);
      if (pathMatch && pathMatch[1]) {
        await supabase.storage.from("portfolio-images").remove([pathMatch[1]]);
      }
      await supabase.from("projects").delete().eq("id", id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setEditForm({
      title: project.title,
      description: project.description || "",
      category: project.category,
      external_link: project.external_link || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingProject) return;
    setIsSaving(true);
    try {
      const isReadType = editForm.category === 'magazine' || editForm.category === 'bullet';
      const updatedData = {
        title: editForm.title,
        description: editForm.description,
        category: editForm.category,
        external_link: isReadType ? editForm.external_link : null,
      };

      const { error } = await supabase.from("projects").update(updatedData).eq("id", editingProject.id);
      if (error) throw error;

      // Update local state
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...updatedData } : p));
      setEditingProject(null);
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to update project.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-10 h-10 text-brand-orange animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Posters</h1>
          <p className="text-brand-muted">View, highlight, edit, or remove artworks.</p>
        </div>
        <div className="text-sm font-medium text-brand-muted bg-brand-surface px-4 py-2 rounded-lg border border-white/10">
          Total: <span className="text-white">{projects.length}</span>
        </div>
      </motion.div>

      {projects.length === 0 ? (
        <div className="bg-brand-surface border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-brand-muted mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={project.id} className="bg-brand-surface border border-white/10 rounded-xl overflow-hidden flex flex-col group relative">

                {/* Image */}
                <div className="relative aspect-[4/5] w-full bg-brand-dark overflow-hidden border-b border-white/10">
                  <Image src={project.poster_image_url} alt={project.title} fill className="object-cover" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-accent uppercase border border-white/10">
                    {project.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{project.title}</h3>
                    <p className="text-sm text-brand-muted line-clamp-2">{project.description || "No description."}</p>
                    {project.external_link && <p className="text-xs text-brand-orange mt-2 truncate">🔗 {project.external_link}</p>}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <button
                      onClick={() => toggleHighlight(project.id, project.is_highlight)}
                      disabled={actionLoading === project.id}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors ${project.is_highlight ? "text-brand-orange" : "text-gray-400 hover:text-white"}`}
                    >
                      {actionLoading === project.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Star className={`w-5 h-5 ${project.is_highlight ? "fill-current" : ""}`} />}
                    </button>

                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(project)} className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10" title="Edit Details">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => deleteProject(project.id, project.poster_image_url)} disabled={actionLoading === project.id} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Modal Overlay */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-surface border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative"
            >
              <button onClick={() => setEditingProject(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">Edit Project Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Title</label>
                  <input type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Category</label>
                  <select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>

                {(editForm.category === 'magazine' || editForm.category === 'bullet') && (
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Read Link (URL)</label>
                    <input type="url" value={editForm.external_link} onChange={e => setEditForm({...editForm, external_link: e.target.value})} placeholder="https://..." className="w-full bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none" />
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Description</label>
                  <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} rows={3} className="w-full bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent outline-none resize-none" />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button onClick={() => setEditingProject(null)} className="px-5 py-2 rounded-lg text-gray-300 hover:text-white transition-colors">Cancel</button>
                <button onClick={handleSaveEdit} disabled={isSaving} className="bg-brand-accent text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-orange transition-colors">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}