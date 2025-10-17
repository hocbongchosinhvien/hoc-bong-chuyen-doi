import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { LayoutDashboard, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProfile = () => {
  const { toast } = useToast();

  const menuItems = [
    { label: "Tổng quan", path: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Quản lý cơ hội", path: "/dashboard/admin/opportunities", icon: FileText },
    { label: "Duyệt bài đăng", path: "/dashboard/admin/review", icon: AlertCircle },
    { label: "Quản lý đối tác", path: "/dashboard/admin/partners", icon: Users },
    { label: "Quản lý người dùng", path: "/dashboard/admin/users", icon: Users },
    { label: "Thông báo", path: "/dashboard/admin/notifications", icon: CheckCircle },
    { label: "Phân tích", path: "/dashboard/admin/analytics", icon: TrendingUp },
    { label: "Hồ sơ", path: "/dashboard/admin/profile", icon: Users },
  ];

  const handleSaveProfile = () => {
    toast({
      title: "Đã lưu",
      description: "Thông tin cá nhân đã được cập nhật",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Đã đổi mật khẩu",
      description: "Mật khẩu mới đã được lưu",
    });
  };

  return (
    <DashboardLayout menuItems={menuItems} role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hồ sơ quản trị viên</h1>
          <p className="text-muted-foreground">Quản lý thông tin cá nhân và cài đặt bảo mật</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                      NV
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Tải ảnh lên
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      JPG, PNG tối đa 2MB
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" defaultValue="Nguyễn Văn A" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@hbcsv.vn" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" defaultValue="+84 123 456 789" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="role">Vai trò</Label>
                    <div className="flex items-center gap-2">
                      <Input id="role" value="Quản trị viên" disabled />
                      <Badge>Admin</Badge>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveProfile}>Lưu thay đổi</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Đổi mật khẩu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <Button onClick={handleChangePassword}>Đổi mật khẩu</Button>
              </CardContent>
            </Card>
          </div>

          {/* Activity & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 border-b pb-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Duyệt 3 bài đăng</p>
                      <p className="text-xs text-muted-foreground">2 giờ trước</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-b pb-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Thêm 2 cơ hội mới</p>
                      <p className="text-xs text-muted-foreground">1 ngày trước</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Thêm đối tác mới</p>
                      <p className="text-xs text-muted-foreground">2 ngày trước</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thống kê cá nhân</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Bài duyệt tháng này</p>
                    <p className="text-2xl font-bold text-foreground">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cơ hội đã tạo</p>
                    <p className="text-2xl font-bold text-foreground">15</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Thông báo đã gửi</p>
                    <p className="text-2xl font-bold text-foreground">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfile;
