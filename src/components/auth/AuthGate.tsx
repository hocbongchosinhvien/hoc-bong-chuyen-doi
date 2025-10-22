// src/components/auth/AuthGate.tsx
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/**
 * Hàm đồng bộ thông tin hồ sơ người dùng (tên, ảnh, role)
 * - Khi đăng nhập bằng Google: lấy name / given_name / family_name
 * - Khi đăng ký email: giữ nguyên tên đã nhập ở form signup
 * - Nếu chưa có role: gán mặc định "user"
 */
async function ensureProfileWithRole() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const meta: any = user.user_metadata || {};
  const full_name =
    meta.full_name ||
    meta.name ||
    [meta.given_name, meta.family_name].filter(Boolean).join(" ") ||
    user.email?.split("@")[0] ||
    "";

  const avatar_url = meta.avatar_url || meta.picture || "";
  const role = meta.role || "user";

  // Đồng bộ lại user_metadata trong Supabase Auth
  await supabase.auth.updateUser({
    data: {
      full_name,
      avatar_url,
      role,
    },
  });

  // Nếu bạn có bảng 'profiles' thì có thể thêm vào:
  // await supabase.from("profiles").upsert({ id: user.id, full_name, avatar_url, role });
}

export default function AuthGate() {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) ensureProfileWithRole(); // ✅ tự đồng bộ thông tin mỗi khi login
    const onAuthPages =
      pathname === "/" || pathname === "/login" || pathname === "/signup";
    if (user && onAuthPages) navigate("/dashboard/user", { replace: true });
  }, [user, loading, pathname, navigate]);

  return null;
}
