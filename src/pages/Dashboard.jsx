import { useState, useRef, useEffect } from "react";
import { useBlog } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import { Plus, MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function DashboardCard({ title, value, colorClass = "text-foreground" }) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col gap-2 transition-colors duration-300">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <span className={`text-4xl font-bold ${colorClass}`}>{value}</span>
    </div>
  );
}

function ArticleActionMenu({ blog, onTogglePublish, onOpenDeleteModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-card rounded-xl shadow-xl border border-border py-2 z-10 fade-in">
          <button
            onClick={() => {
              navigate(`/dashboard/edit/${blog.id}`);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-muted"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              onTogglePublish(blog.id);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-muted"
          >
            <Eye className="w-4 h-4" />
            <span>{blog.published ? "Unpublish" : "Publish"}</span>
          </button>
          <div className="h-px bg-border my-1"></div>
          <button
            onClick={() => {
              onOpenDeleteModal(blog);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

function DeleteModal({ blog, onConfirm, onCancel }) {
    if (!blog) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-background/40 backdrop-blur-sm fade-in" 
                onClick={onCancel}
            ></div>

            {/* Modal Card */}
            <div className="relative bg-card w-full max-w-md rounded-2xl shadow-2xl p-8 scale-in-center border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Delete Article</h3>
                <p className="text-muted-foreground font-medium mb-8 leading-relaxed">
                    Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-lg border border-border text-muted-foreground font-bold text-sm hover:bg-muted transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(blog.id)}
                        className="px-6 py-2.5 rounded-lg bg-destructive text-white font-bold text-sm hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-destructive/20"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

function Dashboard() {
  const { blogs, togglePublish, deleteBlog } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [blogToDelete, setBlogToDelete] = useState(null);

  const publishedCount = blogs.filter(b => b.published).length;
  const draftsCount = blogs.filter(b => !b.published).length;

  const handleDeleteConfirm = (id) => {
    deleteBlog(id);
    setBlogToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-28">
      {/* Delete Confirmation Modal */}
      <DeleteModal 
        blog={blogToDelete} 
        onConfirm={handleDeleteConfirm} 
        onCancel={() => setBlogToDelete(null)} 
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-1">Dashboard</h1>
          <p className="text-muted-foreground font-medium">Manage your articles, {user?.name}</p>
        </div>
        <Link
          to="/dashboard/new"
          className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/10"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <DashboardCard title="Total Articles" value={blogs.length} />
        <DashboardCard title="Published" value={publishedCount} colorClass="text-green-500" />
        <DashboardCard title="Drafts" value={draftsCount} />
      </div>

      {/* Your Articles Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Your Articles</h2>
      </div>

      <div className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group flex justify-between items-start"
            >
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <span className={`px-3 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                    blog.published 
                      ? "bg-primary text-white" 
                      : "bg-muted text-muted-foreground border border-border"
                  }`}>
                    {blog.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm font-medium mb-3 line-clamp-1 max-w-2xl">
                    {blog.excerpt || blog.content?.substring(0, 100)}
                </p>
                <p className="text-[11px] text-muted-foreground font-medium">
                    Last updated: {blog.lastUpdated}
                </p>
              </div>
              
              <ArticleActionMenu 
                blog={blog} 
                onTogglePublish={togglePublish} 
                onOpenDeleteModal={setBlogToDelete} 
              />
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
            <p className="text-muted-foreground font-medium italic">No articles yet. Start by creating your first piece!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;