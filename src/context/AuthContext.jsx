import { createContext, useContext, useState, useEffect } from "react";
import { loadUsers, saveUsers, loadCurrentUser, saveCurrentUser, clearCurrentUser } from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(loadUsers());
    const [currentUser, setCurrentUser] = useState(loadCurrentUser());

    useEffect(() => {
        saveUsers(users);
    }, [users]);

    useEffect(() => {
        if (currentUser) {
            saveCurrentUser(currentUser);
        } else {
            clearCurrentUser();
        }
    }, [currentUser]);

    const login = (userData) => {
        const { email, password } = userData;
        
        // Find existing user in 'db'
        const existingUser = users.find(u => u.email === email);
        
        // Check if user exists and password matches
        if (existingUser && existingUser.password === password) {
            setCurrentUser(existingUser);
            return true;
        }

        // Hardcoded Fallback for initial demo user (Soham)
        if (email === "ksoham2003@gmail.com" && password === "admin123") {
            const adminUser = {
                id: crypto.randomUUID(),
                name: "Soham Dilip Kadam",
                email: "ksoham2003@gmail.com",
                password: "admin123",
                role: "Author",
                createdAt: new Date().toISOString()
            };
            setCurrentUser(adminUser);
            setUsers(prev => {
                if (!prev.find(u => u.email === adminUser.email)) {
                    return [...prev, adminUser];
                }
                return prev;
            });
            return true;
        }
        
        return false;
    };

    const register = (userData) => {
        const newUser = {
            id: crypto.randomUUID(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn: !!currentUser, 
            user: currentUser, 
            users,
            login, 
            register,
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
