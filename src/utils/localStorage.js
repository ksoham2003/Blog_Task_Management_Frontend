// Keys matching the technical reference screenshot
const KEYS = {
    POSTS: "blog_posts",
    USERS: "blog_users",
    CURRENT_USER: "blog_current_user"
};

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

// Post Helpers
export const loadPosts = () => get(KEYS.POSTS, []);
export const savePosts = (posts) => set(KEYS.POSTS, posts);

// User Helpers
export const loadUsers = () => get(KEYS.USERS, []);
export const saveUsers = (users) => set(KEYS.USERS, users);

// Current User Helpers
export const loadCurrentUser = () => get(KEYS.CURRENT_USER, null);
export const saveCurrentUser = (user) => set(KEYS.CURRENT_USER, user);
export const clearCurrentUser = () => localStorage.removeItem(KEYS.CURRENT_USER);
