import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const admin = useAuthStore((state) => state.admin);
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (admin) return <Navigate to={"/admin"} replace />;
  const handleSubmit = async (envent: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const isSuccess = await login(email, password);
    if (isSuccess) {
      return navigate(redirectTo, { replace: true });
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="animate-fade-up w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-rose-brand/10 sm:px-10">
        <div className="text-center">
          <p className="text-2xl font-bold text-rose-brand">နှလုံးသား♡</p>
          <h1 className="mt-2 text-lg font-semibold">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="mt-2 w-full rounded-xl border border-rose-100 bg-cream px-4 py-3 outline-none transition focus:border-rose-brand focus:ring-2 focus:ring-rose-brand/20"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative mt-2">
              <input
                required
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                typeof={showPassword ? "text" : "password"}
                className=" w-full rounded-xl border pr-12 border-rose-100 bg-cream px-4 py-3 outline-none transition focus:border-rose-brand focus:ring-2 focus:ring-rose-brand/20"
                type="text"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-rose-brand"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-brand py-3 font-medium text-white shadow-lg shadow-rose-brand/30 transitioin-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disable:hover:translate-y-0 transitin"
          >
            {isLoggingIn && <Loader2 size={18} className="animate-spin" />}
            {isLoggingIn ? "ဝင်နေပါတယ်..." : "Login ဝင်မယ်"}
          </button>
        </form>
      </div>
    </div>
  );
}
