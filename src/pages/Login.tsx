import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/lib/supabaseClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});
type FormValues = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Đăng nhập bằng Email/Password
  const onSubmit = async (values: FormValues) => {
    try {
      setErrMsg(null);
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      // TODO: có thể chuyển hướng theo role. Tạm thời vào dashboard user:
      navigate("/dashboard/user", { replace: true });
    } catch (e: any) {
      setErrMsg(e?.message || "Đăng nhập thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Đăng nhập bằng Google OAuth
  const handleGoogleLogin = async () => {
    try {
      setErrMsg(null);
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin, // sau đăng nhập quay lại trang chủ (hoặc /dashboard/user)
        },
      });
      if (error) throw error;
      // Với OAuth, Supabase sẽ redirect – không cần navigate ở đây.
    } catch (e: any) {
      setErrMsg(e?.message || "Không thể đăng nhập Google.");
      setLoading(false);
    }
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
          <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
          <CardDescription>
            Đăng nhập để quản lý cơ hội và hồ sơ của bạn
          </CardDescription>
          {errMsg && (
            <p className="mt-2 text-sm text-destructive">{errMsg}</p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Form Email/Password */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ten@email.com"
                {...register("email")}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button className="w-full" size="lg" type="submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Hoặc
              </span>
            </div>
          </div>

          {/* Google OAuth */}
          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Đăng nhập bằng Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
