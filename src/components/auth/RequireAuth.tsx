import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6 text-sm text-muted-foreground">Đang kiểm tra phiên đăng nhập…</div>;
  return user ? children : <Navigate to="/login" replace />;
}
