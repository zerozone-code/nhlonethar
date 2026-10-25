import React, { useEffect, useState } from "react";
import type { DashboardStats } from "../../types/admin";
import api from "../../lib/axios";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";
import CategoryBadge from "../../comoponents/CategoryBadge";

const DashboardPage = () => {
  const clearAdmin = useAuthStore((state) => state.clearAdmin);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get<DashboardStats>("/admin/stats");
        setStats(res.data);
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          clearAdmin();
          return;
        }
        setError("စာရင်ဇယား ယူလို့မရသေးပါ");
      }
    };
    loadStats();
  }, [clearAdmin]);
  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-muted">ဝတ္ထု အခြေအနေကို ခြုံကြည့်ရန်</p>
      {error && <p className="mt-8 text-muted">{error}</p>}
      {!error && !stats && (
        <div className="mt-8 h-32 animate-pulse rounded-3xl bg-rose-soft"></div>
      )}
      {stats && (
        <>
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-sm text-muted">ဝတ္ထု စုစုပေါင်း</p>
            <p className="mt-2 text-5xl font-bold text-rose-brand">
              {stats.totalStories}
            </p>
          </div>
          <h2 className="mt-10 text-lg font-bold">အမျိုးအစားအလိုက်</h2>
          {stats.categories.length === 0 ? (
            <p className="mt-4 text-muted">ဝတ္ထု မရှိသေးပါ</p>
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.categories.map((item) => (
                <li className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-sm">
                  <CategoryBadge category={item.category} />
                  <span className="text-xl font-bold">{item.count}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;
