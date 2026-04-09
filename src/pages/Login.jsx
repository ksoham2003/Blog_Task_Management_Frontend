import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Pen } from "lucide-react";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login({ 
      email: formData.email,
      password: formData.password
    }); 
    
    if (success) {
      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20 pt-28 transition-colors duration-300">
      <div className="max-w-lg w-full bg-card rounded-2xl shadow-sm border border-border p-12 fade-in">
        {/* Logo Circle */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
            <Pen className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground font-medium tracking-tight">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-muted-foreground/30 text-foreground"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-muted-foreground/30 text-foreground"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-medium text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;