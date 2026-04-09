import BlogCard from "./BlogCard";
import { Info } from "lucide-react";

function BlogList({ blogs, onDelete, showActions = true }) {
  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100 fade-in">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Blogs Found</h3>
        <p className="text-gray-500 max-w-xs mx-auto">
          Your blog list is currently empty. Start by creating your first story!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard 
          key={blog.id} 
          blog={blog} 
          onDelete={onDelete} 
          showActions={showActions} 
        />
      ))}
    </div>
  );
}

export default BlogList;