import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  LayoutDashboard,
  FileText,
  Heart,
  User,
  Upload,
} from "lucide-react";

const UserProfile = () => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard/user", icon: LayoutDashboard },
    { label: "Hồ sơ đã nộp", path: "/dashboard/user/applications", icon: FileText },
    { label: "Danh sách đã lưu", path: "/my-list", icon: Heart },
    { label: "Hồ sơ cá nhân", path: "/dashboard/user/profile", icon: User },
  ];

  return (
    <DashboardLayout menuItems={menuItems} role="user">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin và cài đặt tài khoản
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Avatar Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    NV
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-lg font-semibold">Nguyễn Văn A</h3>
                <p className="text-sm text-muted-foreground">
                  student@email.com
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  <Upload className="mr-2 h-4 w-4" />
                  Thay đổi ảnh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>
                  Cập nhật thông tin để nhận các cơ hội phù hợp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Họ và tên</Label>
                    <Input id="fullname" defaultValue="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="student@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" defaultValue="+84 123 456 789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Ngày sinh</Label>
                    <Input id="dob" type="date" defaultValue="2000-01-01" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="university">Trường học</Label>
                    <Input
                      id="university"
                      defaultValue="Đại học Bách Khoa Hà Nội"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Ngành học</Label>
                    <Input id="major" defaultValue="Khoa học máy tính" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Textarea
                    id="bio"
                    placeholder="Viết vài dòng về bản thân..."
                    rows={4}
                  />
                </div>

                <Button className="w-full md:w-auto">Lưu thay đổi</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Đổi mật khẩu</CardTitle>
                <CardDescription>
                  Đảm bảo tài khoản của bạn an toàn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-full md:w-auto">Đổi mật khẩu</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài đặt thông báo</CardTitle>
                <CardDescription>
                  Quản lý cách bạn nhận thông báo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email nhắc deadline</Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận email nhắc nhở trước deadline
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cơ hội mới phù hợp</Label>
                    <p className="text-sm text-muted-foreground">
                      Thông báo khi có cơ hội phù hợp với bạn
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cập nhật từ hệ thống</Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận tin tức và cập nhật quan trọng
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
