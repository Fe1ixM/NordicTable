import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p role="status">Kontrollerer adgang…</p>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
