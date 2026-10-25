import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AuthGate = () => {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="animate-pulse text-xl text-rose-brand">နှလုံးသား♡</p>
      </div>
    );
  }
  return <Outlet />;
};

export default AuthGate;
