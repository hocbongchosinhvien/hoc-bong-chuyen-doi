import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { LayoutDashboard, FileText, Users, Eye, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const menuItems = [
    { label: "Tổng quan", path: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Quản lý cơ hội", path: "/dashboard/admin/opportunities", icon: FileText },
    { label: "Duyệt bài đăng", path: "/dashboard/admin/review", icon: AlertCircle },
    { label: "Quản lý đối tác", path: "/dashboard/admin/partners", icon: Users },
    { label: "Thông báo", path: "/dashboard/admin/notifications", icon: CheckCircle },
    { label: "Phân tích", path: "/dashboard/admin/analytics", icon: TrendingUp },
  ];

  const stats = [
    { label: "Tổng lượt xem", value: "24,532", icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Cơ hội đang mở", value: "48", icon: FileText, color: "text-primary", bg: "bg-pink-50" },
    { label: "Đối tác hoạt động", value: "12", icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Chờ duyệt", value: "7", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const recentSubmissions = [
    { id: 1, title: "Học bổng ASEAN 2025", partner: "Quỹ ASEAN", status: "pending", date: "2 giờ trước" },
    { id: 2, title: "Cuộc thi Khởi nghiệp Xanh", partner: "GreenTech Vietnam", status: "pending", date: "5 giờ trước" },
    { id: 3, title: "Thực tập Google Summer", partner: "Google Vietnam", status: "approved", date: "1 ngày trước" },
  ];

  const topOpportunities = [
    { title: "Học bổng Chính phủ Nhật Bản", views: 1234, saves: 456 },
    { title: "Cuộc thi Lập trình AI", views: 987, saves: 321 },
    { title: "Đại sứ Microsoft Learn", views: 876, saves: 298 },
    { title: "Thực tập Samsung R&D", views: 765, saves: 234 },
  ];

  return (
    <DashboardLayout menuItems={menuItems} role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tổng quan quản trị</h1>
          <p className="text-muted-foreground">Theo dõi hoạt động hệ thống và quản lý nội dung</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`rounded-lg p-3 ${stat.bg}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Submissions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Bài đăng gần đây</CardTitle>
              <Link to="/dashboard/admin/review">
                <Button variant="ghost" size="sm">Xem tất cả</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSubmissions.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.partner}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === 'pending' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.status === 'pending' ? 'Chờ duyệt' : 'Đã duyệt'}
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Opportunities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Cơ hội hàng đầu</CardTitle>
              <Link to="/dashboard/admin/analytics">
                <Button variant="ghost" size="sm">Phân tích</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topOpportunities.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views} lượt xem
                        </span>
                        <span>💾 {item.saves} lưu</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Link to="/dashboard/admin/review">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <div className="text-left">
                    <p className="font-medium">Duyệt bài đăng</p>
                    <p className="text-xs text-muted-foreground">7 bài chờ duyệt</p>
                  </div>
                </Button>
              </Link>
              <Link to="/dashboard/admin/opportunities">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Quản lý cơ hội</p>
                    <p className="text-xs text-muted-foreground">48 cơ hội đang mở</p>
                  </div>
                </Button>
              </Link>
              <Link to="/dashboard/admin/notifications">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium">Gửi thông báo</p>
                    <p className="text-xs text-muted-foreground">Thông báo người dùng</p>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
