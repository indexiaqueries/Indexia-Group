import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

type AdminLoginProps = {
  onLogin: (token: string) => Promise<string | null>;
};

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setTouched(true);
      setError("Please enter your admin token.");
      return;
    }
    setTouched(false);
    setLoading(true);
    setError("");
    const result = await onLogin(token.trim());
    if (result) setError(result);
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 15% 10%, rgba(38,174,144,0.18), transparent 28rem), radial-gradient(circle at 85% 20%, rgba(6,106,156,0.18), transparent 26rem), linear-gradient(135deg, #02101a 0%, #0c3652 52%, #122029 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "linear-gradient(rgba(38,174,144,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(38,174,144,0.08) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-(--color-teal) flex items-center justify-center text-black shadow-lg shadow-teal/20">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[--color-ink] leading-tight">Admin Console</h1>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide">INDEXIA GROUP</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-token" className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <Lock size={12} className="text-(--color-teal)" />
                Admin Token
              </label>
              <input
                id="admin-token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="Enter your admin token"
                aria-required="true"
                autoFocus
                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-all ${
                  touched && !token.trim() ? "border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-red-200" : "border-slate-200 bg-white focus:border-(--color-teal) focus:ring-(--color-teal)/20"
                }`}
              />
              {touched && !token.trim() && <p className="mt-1.5 text-xs text-red-500">Token is required.</p>}
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600 leading-relaxed">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !token.trim()}
              className="w-full rounded-full bg-(--color-teal) px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-(--color-teal-deep) hover:shadow-lg hover:shadow-teal/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <Link to="/" className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-(--color-teal)">
              <ArrowLeft size={14} />
              Back to website
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-black/40">
          Restricted access · Authorized personnel only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
