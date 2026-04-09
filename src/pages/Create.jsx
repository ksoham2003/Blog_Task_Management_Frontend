import { useState } from "react";
import { useBlog } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Send, Save, ArrowLeft, X } from "lucide-react";

function Create() {
  const { addBlog } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    addBlog({ ...formData, status: "Published" }, user?.id);
    navigate("/dashboard");
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    addBlog({ ...formData, status: "Draft" }, user?.id);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-28">
      {/* Navigation */}
      <div className="mb-6">
        <Link 
          to="/dashboard" 
          className="text-muted-foreground hover:text-foreground font-bold text-sm inline-flex items-center gap-2 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-card rounded-3xl border border-border shadow-sm p-10 fade-in transition-colors duration-300">
        <h1 className="text-2xl font-bold text-foreground mb-10">Create New Article</h1>

        <form className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-muted-foreground mb-3">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-muted-foreground/30 text-foreground font-medium"
              placeholder="Enter a compelling title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-bold text-muted-foreground mb-3">Excerpt</label>
            <textarea
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-muted-foreground/30 text-foreground font-medium min-h-[100px] resize-none"
              placeholder="Write a brief summary of your article..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
            <p className="mt-2 text-[11px] text-muted-foreground font-medium">A short description that appears on the blog listing</p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-muted-foreground mb-3">Content</label>
            <textarea
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-muted-foreground/30 text-foreground font-mono text-sm min-h-[200px] resize-none"
              placeholder="Write your article content here... (Markdown supported)"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <p className="mt-2 text-[11px] text-muted-foreground font-medium">Supports Markdown: ## for headers, **bold**, *italic*, `code`, etc.</p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-muted-foreground mb-3">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map(tag => (
                <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-muted-foreground/30 text-foreground font-medium"
              placeholder="Add tags (press Enter to add)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <p className="mt-2 text-[11px] text-muted-foreground font-medium">Add up to 5 tags to help readers find your article</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-muted-foreground font-bold text-sm hover:bg-muted transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save as Draft</span>
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Publish</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;