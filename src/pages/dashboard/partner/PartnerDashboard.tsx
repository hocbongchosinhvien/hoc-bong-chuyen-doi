import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  User,
  Eye,
  Heart,
  Send,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const PartnerDashboard = () => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard/partner", icon: LayoutDashboard },
    { label: "Đăng cơ hội mới", path: "/dashboard/partner/submit", icon: Plus },
    { label: "Cơ hội đã đăng", path: "/dashboard/partner/submissions", icon: FileText },
    { label: "Phân tích", path: "/dashboard/partner/analytics", icon: BarChart3 },
    { label: "Hồ sơ tổ chức", path: "/dashboard/partner/profile", icon: User },
  ];

  const recentSubmissions = [
    {
      id: "1",
      title: "Học bổng ABC 2025",
      status: "approved",
      views: 1245,
      saves: 89,
    },
    {
      id: "2",
      title: "Cuộc thi XYZ Innovation",
      status: "pending",
      views: 0,
      saves: 0,
    },
    {
      id: "3",
      title: "Thực tập hè Data Science",
      status: "approved",
      views: 567,
      saves: 34,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            Đã duyệt
          </span>
        );
      case "pending":
        return (
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
            Chờ duyệt
          </span>
        );
      case "rejected":
        return (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
            Từ chối
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout menuItems={menuItems} role="partner">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Chào mừng bạn trở lại, VinUniversity
            </p>
          </div>
          <Link to="/dashboard/partner/submit">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Đăng cơ hội mới
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tổng lượt xem
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-green-600" />
                +12% so với tháng trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Lượt lưu
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">890</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-green-600" />
                +8% so với tháng trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cơ hội đang hoạt động
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 cơ hội đang chờ duyệt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tỷ lệ chuyển đổi
              </CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.2%</div>
              <p className="text-xs text-muted-foreground">
                Từ lượt xem sang apply
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Cơ hội gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h4 className="font-semibold">{submission.title}</h4>
                      {getStatusBadge(submission.status)}
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {submission.views} lượt xem
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {submission.saves} lượt lưu
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Chi tiết
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Hành động nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/dashboard/partner/submit">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Đăng cơ hội mới
                </Button>
              </Link>
              <Link to="/dashboard/partner/submissions">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Xem tất cả cơ hội
                </Button>
              </Link>
              <Link to="/dashboard/partner/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Xem phân tích chi tiết
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mẹo tối ưu hóa</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    Cập nhật thông tin định kỳ để tăng độ tin cậy
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    Sử dụng tiêu đề rõ ràng, mô tả chi tiết để thu hút ứng viên
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    Đăng cơ hội sớm để có thời gian tiếp cận ứng viên tốt hơn
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PartnerDashboard;
