import { createContext, useContext, useState, useEffect } from "react";
import { loadPosts, savePosts } from "../utils/localStorage";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState(loadPosts());

    useEffect(() => {
        savePosts(blogs);
    }, [blogs]);

    const addBlog = (blogData, authorId) => {
        const isPublished = blogData.status === "Published";
        const newPost = {
            id: crypto.randomUUID(),
            title: blogData.title,
            content: blogData.content,
            excerpt: blogData.excerpt || (blogData.content || "").substring(0, 100),
            authorId: authorId || "unknown",
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: blogData.status || "Published",
            published: isPublished,
            tags: blogData.tags || ["General"]
        };
        setBlogs([newPost, ...blogs]);
    };

    const updateBlog = (id, updatedData) => {
        const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        setBlogs(blogs.map((blog) => (
            blog.id === id ? { 
                ...blog, 
                ...updatedData, 
                lastUpdated: now,
                excerpt: updatedData.content ? updatedData.content.substring(0, 100) : blog.excerpt 
            } : blog
        )));
    };

    const togglePublish = (id) => {
        const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        setBlogs(blogs.map((blog) => {
            if (blog.id === id) {
                const newPublished = !blog.published;
                return {
                    ...blog,
                    published: newPublished,
                    status: newPublished ? "Published" : "Draft",
                    lastUpdated: now
                };
            }
            return blog;
        }));
    };

    const deleteBlog = (id) => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
    };

    const getBlogById = (id) => {
        return blogs.find((blog) => blog.id === id);
    };

    return (
        <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, togglePublish, getBlogById }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    return context;
};
