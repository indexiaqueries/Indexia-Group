import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type AdminLoginProps = {
  // Verifies the token against the API. Returns null on success or an
  // error message to display when authentication fails.
  onLogin: (token: string) => Promise<string | null>;
};

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError("");
    const result = await onLogin(token);
    if (result) setError(result);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-display mb-6 text-center text-2xl font-bold text-(--color-ink)">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-token" className="mb-2 block text-sm font-bold text-slate-600">Admin Token</label>
            <input
              id="admin-token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your admin token"
              aria-required="true"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20"
            />
          </div>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full rounded-full bg-(--color-teal) px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-(--color-teal-deep) disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <Link to="/" className="mt-6 flex items-center justify-center gap-2 text-sm text-(--color-muted) hover:text-(--color-teal)">
          <ArrowLeft size={14} /> Back to website
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;