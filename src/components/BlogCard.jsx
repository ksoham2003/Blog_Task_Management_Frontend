import { Link } from "react-router-dom";
import { User, Calendar, Edit2, Trash2 } from "lucide-react";

function BlogCard({ blog, onDelete, showActions = true }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-8 hover:shadow-2xl transition-all group flex flex-col h-full fade-in duration-300">
      <div className="flex flex-wrap gap-2 mb-4">
        {(blog.tags || ["General"]).map((tag, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-muted text-muted-foreground text-[10px] font-bold rounded-full uppercase tracking-wider transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link to={`/blog/${blog.id}`} className="flex-grow">
        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
          {blog.title}
        </h3>
        <p className="text-muted-foreground text-base mb-8 line-clamp-3 leading-relaxed">
          {blog.content}
        </p>
      </Link>

      <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">{blog.author || "Guest Author"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              to={`/dashboard/edit/${blog.id}`}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-full transition-all"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onDelete(blog.id)}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogCard;