import { useState, useEffect } from "react";
import { PenTool, Check } from "lucide-react";

function BlogForm({ onSubmit, initialData = null, buttonText = "Submit" }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        content: initialData.content || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 bg-[#0052CC]/10 rounded-lg">
          <PenTool className="w-5 h-5 text-[#0052CC]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {initialData ? "Edit Blog" : "Create New Blog"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a catchy title..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0052CC] focus:ring-4 focus:ring-[#0052CC]/10 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Share your thoughts..."
            rows="8"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0052CC] focus:ring-4 focus:ring-[#0052CC]/10 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium resize-none"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0047b3] active:scale-[0.98] transition-all shadow-lg shadow-[#0052CC]/20"
        >
          <Check className="w-5 h-5" />
          <span>{buttonText}</span>
        </button>
      </form>
    </div>
  );
}

export default BlogForm;