import { useBlog } from "../context/BlogContext";
import BlogList from "../components/BlogList";

function Home() {
  const { blogs } = useBlog();
  const publishedBlogs = blogs.filter(blog => blog.published);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-32">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto fade-in">
        <h1 className="text-6xl font-extrabold text-foreground tracking-tight mb-6">
          Welcome to <span className="text-primary">Inkwell</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium leading-relaxed">
          Discover thoughtful articles on technology, programming, and software engineering from passionate writers.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Latest Articles
          </h2>
        </div>
            {publishedBlogs.length} {publishedBlogs.length === 1 ? "article" : "articles"}
      </div>

      <BlogList blogs={publishedBlogs} showActions={false} />
    </div>
  );
}

export default Home;