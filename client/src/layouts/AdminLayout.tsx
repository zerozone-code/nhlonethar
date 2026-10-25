import { Link, NavLink, Outlet } from "react-router-dom";
import { ExternalLink, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ADMIN_LINKS = [
  { label: "Dashboard", to: "/admin", end: true },
  { label: "ဝတ္ထုများ", to: "/admin/stories", end: false },
];

export default function AdminLayout() {
  const admin = useAuthStore((state) => state.admin);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen">
      <header className="border-b border-rose-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-lg font-bold text-rose-brand">
              နှလုံးသား♡
            </Link>
            <nav className="flex items-center gap-4">
              {ADMIN_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? "text-rose-brand" : "hover:text-rose-brand"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden text-sm text-muted md:inline">
              {admin?.email}
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm hover:text-rose-brand"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Website ကြည့်ရန်</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1 rounded-full bg-rose-soft px-4 py-2 text-sm font-medium text-rose-brand transition-colors hover:bg-rose-100"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
