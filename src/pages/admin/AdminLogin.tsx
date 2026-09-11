import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { API_BASE } from "../../lib/api";

// Standalone login page at /admin/login.
//
// The password is POSTed once to the backend; the server decides whether it
// is correct and, on success, sets an HTTP-only session cookie. The password
// is never stored anywhere and the frontend never makes authentication
// decisions of its own.
const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setTouched(true);
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        credentials: "include", // send/receive the session cookie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        // Clear the password from state immediately, then enter the dashboard.
        setPassword("");
        navigate("/admin", { replace: true });
        return;
      }

      // Backend errors are already generic; fall back to an equally generic
      // message for anything unexpected. Never surface raw errors.
      setError(
        data.error ||
          (res.status >= 500
            ? "Server error. Please try again later."
            : "Invalid credentials.")
      );
      setPassword(""); // clear the input after a failed attempt
    } catch {
      setError("Cannot reach the server. Please try again.");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const invalid = touched && !password.trim();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07141D] px-5">
      <div className="absolute inset-0 opacity-[.035]" style={{
        backgroundImage:
          "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
        backgroundSize: "72px 72px",
      }} />
      <div className="absolute -left-40 -top-40 h-130 w-130 rounded-full bg-[--color-teal]/10 blur-[110px]" />
      <div className="absolute -bottom-52 -right-40 h-150 w-150 rounded-full bg-[#0878A8]/10 blur-[130px]" />

      <div className="relative w-full max-w-105">
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl sm:p-8">
          <div className="mb-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[--color-teal]/10 text-[--color-teal]">
              <ShieldCheck size={20} />
            </div>
            <h1 className="font-display text-[22px] font-semibold text-[--color-ink]">
              Admin Login
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Enter your administrator password to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-500"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={16}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    invalid ? "text-red-400" : "text-slate-400"
                  }`}
                />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onBlur={() => setTouched(true)}
                  placeholder="Enter your admin password"
                  autoFocus
                  autoComplete="current-password"
                  className={`h-12 w-full rounded-xl border bg-slate-50 pl-11 pr-4 text-sm outline-none transition ${
                    invalid
                      ? "border-red-300 bg-red-50/50"
                      : "border-slate-200 focus:border-[--color-teal] focus:bg-white focus:ring-4 focus:ring-[--color-teal]/10"
                  }`}
                />
              </div>

              {invalid && (
                <p className="mt-2 text-xs text-red-500">Password is required.</p>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="h-12 w-full rounded-xl bg-[--color-teal] text-sm font-semibold text-white transition hover:bg-[--color-teal-deep] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-7 border-t border-slate-100 pt-5">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-[--color-teal]"
            >
              <ArrowLeft size={14} />
              Back to website
            </Link>
          </div>
        </section>

        <p className="mt-5 text-center text-[10px] uppercase tracking-wider text-white/25">
          <ShieldCheck size={12} className="mr-1 inline" />
          Restricted access · Authorized personnel only
        </p>
      </div>
    </main>
  );
};

export default AdminLogin;
