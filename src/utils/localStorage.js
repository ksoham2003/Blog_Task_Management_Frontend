// Keys matching the technical reference screenshot
const KEYS = {
    POSTS: "blog_posts",
    USERS: "blog_users",
    CURRENT_USER: "blog_current_user"
};

// Default seed data as per user requirements
const DEFAULT_POSTS = [
    {
        id: "1",
        title: "Getting Started with React Hooks",
        author: "Sarah Chen",
        authorId: "author-1",
        content: "React Hooks revolutionized the way we write React components. Introduced in React 16.8, Hooks allow you to use state and other React features without writing a class. This blog covers the most important Hooks like useState, useEffect, and useContext.",
        excerpt: "Learn how React Hooks can simplify your component logic and make your code more reusable.",
        createdAt: "2024-01-15T10:30:00Z",
        lastUpdated: "Jan 15, 2024",
        published: true,
        status: "Published",
        tags: ["React", "JavaScript", "Web Development"]
    },
    {
        id: "2",
        title: "Building Scalable APIs with Node.js",
        author: "Sarah Chen",
        authorId: "author-1",
        content: "Creating scalable APIs is crucial for modern web applications. Node.js provides excellent tools for building fast, efficient backends using Express and other middleware. In this guide, we'll walk through setting up a basic API with error handling and modular routing.",
        excerpt: "Explore best practices for creating robust and scalable REST APIs using Node.js and Express.",
        createdAt: "2024-01-20T14:00:00Z",
        lastUpdated: "Jan 22, 2024",
        published: true,
        status: "Published",
        tags: ["Node.js", "API", "Backend"]
    },
    {
        id: "3",
        title: "The Art of Clean Code",
        author: "Marcus Johnson",
        authorId: "author-2",
        content: "Writing clean code is more than just making it work—it's about making it understandable and maintainable.\n\n## Principles of Clean Code\n1. Name things properly.\n2. Keep functions small.\n3. Don't repeat yourself (DRY).\n\nDiscover the principles and practices that separate good code from great code.",
        excerpt: "Discover the principles and practices that separate good code from great code.",
        createdAt: "2024-02-01T08:45:00Z",
        lastUpdated: "Feb 1, 2024",
        published: true,
        status: "Published",
        tags: ["Programming", "Best Practices", "Software Engineering"]
    }
];

// Generic storage helpers
const get = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error(`Error loading ${key} from storage:`, e);
        return defaultValue;
    }
};

const set = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error saving ${key} to storage:`, e);
    }
};

// Post Helpers - Returns defaults if storage is empty
export const loadPosts = () => get(KEYS.POSTS, DEFAULT_POSTS);
export const savePosts = (posts) => set(KEYS.POSTS, posts);

// User Helpers
export const loadUsers = () => get(KEYS.USERS, []);
export const saveUsers = (users) => set(KEYS.USERS, users);

// Current User Helpers
export const loadCurrentUser = () => get(KEYS.CURRENT_USER, null);
export const saveCurrentUser = (user) => set(KEYS.CURRENT_USER, user);
export const clearCurrentUser = () => localStorage.removeItem(KEYS.CURRENT_USER);
