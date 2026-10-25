import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthGate from "./comoponents/AuthGate";
import ProtectedRoute from "./comoponents/ProtectedRoute";
import HomePage from "./pages/HomePage";
import StoryDetailPage from "./pages/StoryDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import StoryListPage from "./pages/admin/StoryListPage";
import StoryFormPage from "./pages/admin/StoryFormPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="stories/:id" element={<StoryDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="admin" element={<AuthGate />}>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="stories" element={<StoryListPage />} />
            <Route path="stories/new" element={<StoryFormPage />} />
            <Route path="stories/:id/edit" element={<StoryFormPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
