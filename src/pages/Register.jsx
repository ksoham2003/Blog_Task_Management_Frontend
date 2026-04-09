import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Pen } from "lucide-react";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("Reader");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: accountType
    }); 
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20 pt-28 transition-colors duration-300">
      <div className="max-w-xl w-full bg-card rounded-2xl shadow-sm border border-border p-12 fade-in">
        {/* Logo Circle */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
            <Pen className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create an Account</h1>
          <p className="text-muted-foreground font-medium tracking-tight">Join Inkwell to start reading or writing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-muted-foreground mb-2">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-muted-foreground/30 text-foreground"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-muted-foreground mb-2">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-muted-foreground/30 text-foreground"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          {/* Account Type Toggle */}
          <div>
            <label className="block text-sm font-bold text-muted-foreground mb-3">Account Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAccountType("Reader")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  accountType === "Reader"
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-transparent hover:border-muted-foreground/50"
                }`}
              >
                <span className={`text-sm font-bold ${accountType === "Reader" ? "text-foreground" : "text-muted-foreground"}`}>Reader</span>
                <span className="text-[10px] text-muted-foreground/60 font-medium">Read articles</span>
              </button>
              <button
                type="button"
                onClick={() => setAccountType("Author")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  accountType === "Author"
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-transparent hover:border-muted-foreground/50"
                }`}
              >
                <span className={`text-sm font-bold ${accountType === "Author" ? "text-foreground" : "text-muted-foreground"}`}>Author</span>
                <span className="text-[10px] text-muted-foreground/60 font-medium">Write & publish</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all mt-4 shadow-lg shadow-primary/10"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-medium text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;