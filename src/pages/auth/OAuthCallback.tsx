// src/pages/auth/OAuthCallback.tsx
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // Sau khi Supabase xử lý OAuth, session đã có trong cookie
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return navigate("/login", { replace: true });

        // Lấy role/name tạm lưu trước khi redirect từ trang signup
        const pendingRole = localStorage.getItem("pending_role") || "user";
        const pendingName = localStorage.getItem("pending_full_name") || "";
        localStorage.removeItem("pending_role");
        localStorage.removeItem("pending_full_name");

        const meta: any = user.user_metadata || {};
        const alreadyHasRole = !!meta.role;

        // Nếu user CHƯA có role -> set theo lựa chọn ở signup
        if (!alreadyHasRole) {
          await supabase.auth.updateUser({
            data: {
              role: pendingRole,
              full_name:
                meta.full_name ||
                pendingName ||
                meta.name ||
                user.email?.split("@")[0] ||
                "",
            },
          });
          // làm mới user để lấy metadata mới nhất
          await supabase.auth.getUser();
        }

        // Role cuối cùng để định tuyến & hậu xử lý
        const finalRole = (alreadyHasRole ? meta.role : pendingRole) as string;

        // Nếu là partner: đảm bảo có partner + membership (idempotent)
        if (finalRole === "partner") {
          try {
            await supabase.rpc("ensure_partner_for_user", {
              p_user: user.id,
              p_name:
                meta.org_name ||
                meta.full_name ||
                pendingName ||
                meta.name ||
                user.email?.split("@")[0] ||
                null,
            });
          } catch (rpcErr) {
            // Không chặn điều hướng, nhưng log để kiểm tra nếu cần
            console.error("ensure_partner_for_user RPC error:", rpcErr);
          }
        }

        // Điều hướng theo role
        if (finalRole === "partner") {
          navigate("/dashboard/partner", { replace: true });
        } else if (finalRole === "admin") {
          navigate("/dashboard/admin", { replace: true });
        } else {
          navigate("/dashboard/user", { replace: true });
        }
      } catch (e) {
        console.error("OAuth callback error:", e);
        navigate("/", { replace: true });
      }
    })();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center text-muted-foreground">
      Đang xác thực tài khoản Google, vui lòng chờ...
    </div>
  );
}
