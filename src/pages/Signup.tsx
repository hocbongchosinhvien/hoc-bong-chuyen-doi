// src/pages/Signup.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { supabase } from "@/lib/supabaseClient";

const Signup = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<"user" | "partner">("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(false);

  const goDashboardByRole = (r?: string | null) => {
    if (r === "admin") navigate("/dashboard/admin");
    else if (r === "partner") navigate("/dashboard/partner");
    else navigate("/dashboard/user");
  };

  const resendConfirmation = async () => {
    setErr(null);
    setInfo(null);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setErr(error.message);
    else setInfo("Đã gửi lại email xác nhận. Vui lòng kiểm tra hộp thư.");
  };

  const onSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setInfo(null);
    setCanResend(false);

    if (!fullName.trim()) return setErr("Vui lòng nhập họ và tên.");
    if (!email.trim()) return setErr("Vui lòng nhập email.");
    if (pw.length < 6) return setErr("Mật khẩu tối thiểu 6 ký tự.");
    if (pw !== pw2) return setErr("Xác nhận mật khẩu không khớp.");

    setSubmitting(true);
    try {
      // 1) Tiền kiểm email tồn tại
      const { data: exists, error: rpcErr } = await supabase.rpc("email_exists", { p_email: email });
      if (rpcErr) throw rpcErr;

      if (exists) {
        setErr("Email này đã có tài khoản, vui lòng đăng nhập.");
        setCanResend(true);
        return;
      }

      // 2) Đăng ký
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pw,
        options: {
          data: {
            full_name: fullName.trim(),
            role,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes("already") || error.message.toLowerCase().includes("exists")) {
          setErr("Email này đã có tài khoản, vui lòng đăng nhập.");
          setCanResend(true);
        } else {
          setErr(error.message);
        }
        return;
      }

      // 3) Nếu có session ngay (thường là OAuth, hoặc email magic link đã xác minh)
      if (data.session) {
        const { data: ures } = await supabase.auth.getUser();
        const u = ures?.user;
        if (u && role === "partner") {
          // Gọi RPC để đảm bảo có partner + membership owner
          await supabase.rpc("ensure_partner_for_user", {
            p_user: u.id,
            p_name: fullName || null,
          });
        }
        goDashboardByRole(role);
        return;
      }

      // 4) Nếu cần xác minh email
      setInfo("Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản.");
    } catch (e: any) {
      setErr(e?.message || "Có lỗi xảy ra.");
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogleSignUp = async () => {
    setErr(null);
    try {
      // Lưu tạm để xử lý tại /auth/callback (và gọi ensure_partner_for_user ở đó)
      localStorage.setItem("pending_role", role);
      localStorage.setItem("pending_full_name", fullName || "");
    } catch {}
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setErr(error.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Link
            to="/"
            className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại màn hình chính
          </Link>
          <CardTitle className="text-2xl font-bold">Đăng ký</CardTitle>
          <CardDescription>
            Tạo tài khoản để bắt đầu kết nối với các cơ hội
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmitEmail}>
            {/* Vai trò */}
            <div className="space-y-2">
              <Label>Bạn là</Label>
              <RadioGroup value={role} onValueChange={(v) => setRole(v as "user" | "partner")}>
                <div className="flex items-center space-x-2 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="flex-1 cursor-pointer">
                    <div className="font-medium">Sinh viên</div>
                    <div className="text-xs text-muted-foreground">Tìm kiếm và nộp hồ sơ các cơ hội</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                  <RadioGroupItem value="partner" id="partner" />
                  <Label htmlFor="partner" className="flex-1 cursor-pointer">
                    <div className="font-medium">Đối tác</div>
                    <div className="text-xs text-muted-foreground">Đăng tin tuyển và quản lý ứng viên</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Họ và tên */}
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ten@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
              />
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
              <Input
                id="confirm-password"
                type="password"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                required
              />
            </div>

            {/* Thông báo */}
            {err && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {err}{" "}
                {canResend && (
                  <Button variant="link" className="ml-1 p-0 h-auto" onClick={resendConfirmation}>
                    (Gửi lại email xác nhận)
                  </Button>
                )}
              </div>
            )}
            {info && (
              <div className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
                {info}
              </div>
            )}

            <Button className="w-full" size="lg" type="submit" disabled={submitting}>
              {submitting ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Hoặc</span>
            </div>
          </div>

          {/* Google */}
          <Button variant="outline" className="w-full" size="lg" onClick={onGoogleSignUp}>
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Đăng ký bằng Google
          </Button>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
