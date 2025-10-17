import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Vui lòng nhập địa chỉ email");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Địa chỉ email không hợp lệ");
      return;
    }

    // Simulate sending reset email
    toast.success("Đã gửi liên kết khôi phục đến email của bạn");
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại trang chính
        </Link>

        <Card className="shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-2">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Khôi phục mật khẩu</CardTitle>
            <CardDescription>
              {isSubmitted
                ? "Kiểm tra email của bạn để tiếp tục"
                : "Nhập email để nhận liên kết khôi phục"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Địa chỉ email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={error ? "border-destructive" : ""}
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <Button type="submit" className="w-full">
                  Gửi liên kết khôi phục
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-primary hover:underline"
                  >
                    Quay lại đăng nhập
                  </Link>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-center">
                  <p className="text-sm text-green-800 dark:text-green-100">
                    Đã gửi liên kết khôi phục đến email của bạn.
                    <br />
                    Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Không nhận được email?{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary hover:underline font-medium"
                  >
                    Gửi lại
                  </button>
                </p>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Quay lại đăng nhập
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Cần hỗ trợ?{" "}
          <Link to="/#contact" className="text-primary hover:underline font-medium">
            Liên hệ với chúng tôi
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
