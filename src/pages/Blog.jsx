import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { User, Calendar, Clock, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

function Blog() {
  const { id } = useParams();
  const { getBlogById } = useBlog();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getBlogById(id);
    if (data) {
      setBlog(data);
    } else {
      navigate("/");
    }
  }, [id, getBlogById, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-32 mb-20 fade-in transition-colors duration-300">
      {/* Back button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold text-sm mb-12 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Articles</span>
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(blog.tags || ["Technology"]).map((tag, index) => (
          <span 
            key={index}
            className="px-4 py-1.5 bg-muted text-muted-foreground text-[10px] font-bold rounded-full uppercase tracking-widest border border-border"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Header */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-8">
        {blog.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-12 pb-12 border-b border-border">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span className="font-semibold text-foreground">{blog.author || "Soham Kadam"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Calendar className="w-5 h-5" />
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="w-5 h-5" />
          <span>{blog.readTime || "3 min read"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed font-medium">
        {blog.content.split('\n').map((paragraph, index) => (
           paragraph.trim() ? (
             <p key={index} className="mb-6">
               {paragraph}
             </p>
           ) : null
        ))}
      </div>
    </div>
  );
}

export default Blog;