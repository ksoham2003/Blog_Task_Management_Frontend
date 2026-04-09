import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pen, Moon, Sun, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border shadow-sm fixed top-0 w-full z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg transition-transform group-hover:scale-105">
              <Pen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight italic">Inkwell</span>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-full transition-all"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {!isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login"
                  className="text-muted-foreground hover:text-primary font-bold text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/10"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-full hover:bg-muted transition-all border border-transparent hover:border-border"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-foreground hidden sm:block">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-card rounded-2xl shadow-2xl border border-border py-3 scale-in-center">
                    <div className="px-5 py-3 border-b border-border mb-2">
                        <p className="text-sm font-bold text-foreground">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium truncate">{user.email}</p>
                        <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-widest">{user.role}</p>
                    </div>

                    {user.role !== "Reader" && (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-muted transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;