// src/components/auth/AuthGate.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";

/**
 * AuthGate
 * - Khi có session, luôn refetch user từ Supabase để lấy metadata mới nhất.
 * - Nếu đang ở trang công khai => điều hướng vào dashboard theo role.
 * - Nếu đang ở /dashboard/* mà role không khớp => điều hướng sang dashboard đúng role.
 * - Không ghi đè role trong metadata.
 */
export default function AuthGate() {
  const { user: cachedUser, loading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;

    (async () => {
      // Luôn lấy user tươi để có role mới nhất sau khi bạn chỉnh trong SQL
      const { data } = await supabase.auth.getUser();
      const freshUser = data.user ?? null;

      // Xoá "pending_role" nếu còn sót từ lần signup Google trước
      try { localStorage.removeItem("pending_role"); } catch {}

      const onPublic =
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/forgot-password" ||
        pathname.startsWith("/auth/callback");

      if (!freshUser) {
        // chưa đăng nhập -> không làm gì ở trang public
        setChecked(true);
        return;
      }

      const meta: any = freshUser.user_metadata || {};
      const role: string = (meta.role as string) || "user";

      // Nếu đang ở trang public => đẩy vào dashboard theo role
      if (onPublic) {
        if (role === "admin") navigate("/dashboard/admin", { replace: true });
        else if (role === "partner") navigate("/dashboard/partner", { replace: true });
        else navigate("/dashboard/user", { replace: true });
        setChecked(true);
        return;
      }

      // Nếu đã ở trong dashboard nhưng nhầm role => sửa lại
      if (pathname.startsWith("/dashboard/")) {
        if (role === "admin" && !pathname.startsWith("/dashboard/admin")) {
          navigate("/dashboard/admin", { replace: true }); setChecked(true); return;
        }
        if (role === "partner" && !pathname.startsWith("/dashboard/partner")) {
          navigate("/dashboard/partner", { replace: true }); setChecked(true); return;
        }
        if (role !== "admin" && role !== "partner" && !pathname.startsWith("/dashboard/user")) {
          navigate("/dashboard/user", { replace: true }); setChecked(true); return;
        }
      }

      setChecked(true);
    })();
  }, [loading, pathname, navigate, cachedUser]);

  return null;
}
