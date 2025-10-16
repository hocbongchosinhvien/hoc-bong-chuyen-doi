import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { LayoutDashboard, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Eye, Bookmark, Calendar } from "lucide-react";

const Analytics = () => {
  const menuItems = [
    { label: "Tổng quan", path: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Quản lý cơ hội", path: "/dashboard/admin/opportunities", icon: FileText },
    { label: "Duyệt bài đăng", path: "/dashboard/admin/review", icon: AlertCircle },
    { label: "Quản lý đối tác", path: "/dashboard/admin/partners", icon: Users },
    { label: "Thông báo", path: "/dashboard/admin/notifications", icon: CheckCircle },
    { label: "Phân tích", path: "/dashboard/admin/analytics", icon: TrendingUp },
  ];

  const topOpportunities = [
    { rank: 1, title: "Học bổng Chính phủ Nhật Bản", views: 1234, saves: 456, applications: 89 },
    { rank: 2, title: "Cuộc thi Lập trình AI", views: 987, saves: 321, applications: 67 },
    { rank: 3, title: "Đại sứ Microsoft Learn", views: 876, saves: 298, applications: 54 },
    { rank: 4, title: "Thực tập Samsung R&D", views: 765, saves: 234, applications: 45 },
    { rank: 5, title: "Học bổng ASEAN 2025", views: 654, saves: 198, applications: 38 },
  ];

  const topPartners = [
    { rank: 1, name: "Google Vietnam", opportunities: 8, views: 3421, saves: 1245 },
    { rank: 2, name: "Microsoft Vietnam", opportunities: 6, views: 2987, saves: 987 },
    { rank: 3, name: "Quỹ ASEAN", opportunities: 4, views: 2345, saves: 765 },
    { rank: 4, name: "Samsung Vietnam", opportunities: 5, views: 1987, saves: 654 },
  ];

  const trafficSources = [
    { source: "Tìm kiếm trực tiếp", visits: 12450, percentage: 45 },
    { source: "Mạng xã hội", visits: 8320, percentage: 30 },
    { source: "Email marketing", visits: 4160, percentage: 15 },
    { source: "Khác", visits: 2770, percentage: 10 },
  ];

  return (
    <DashboardLayout menuItems={menuItems} role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Phân tích & Báo cáo</h1>
            <p className="text-muted-foreground">Thống kê tổng hợp hoạt động hệ thống</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="7days">
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 ngày qua</SelectItem>
                <SelectItem value="30days">30 ngày qua</SelectItem>
                <SelectItem value="90days">90 ngày qua</SelectItem>
                <SelectItem value="year">Năm nay</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Xuất báo cáo</Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tổng lượt xem</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">27,900</p>
                  <p className="mt-1 text-xs text-green-600">+12.5% so với tuần trước</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lượt lưu</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">4,234</p>
                  <p className="mt-1 text-xs text-green-600">+8.3% so với tuần trước</p>
                </div>
                <div className="rounded-lg bg-pink-50 p-3">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ứng tuyển</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">892</p>
                  <p className="mt-1 text-xs text-green-600">+15.7% so với tuần trước</p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Người dùng mới</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">1,234</p>
                  <p className="mt-1 text-xs text-green-600">+21.4% so với tuần trước</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Placeholder */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Lượt xem theo thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium text-muted-foreground">Biểu đồ lượt xem theo ngày</p>
                  <p className="mt-1 text-xs text-muted-foreground">Chart placeholder - implement with Recharts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lượt lưu theo thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium text-muted-foreground">Biểu đồ lượt lưu theo ngày</p>
                  <p className="mt-1 text-xs text-muted-foreground">Chart placeholder - implement with Recharts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle>Top cơ hội</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topOpportunities.map((opp) => (
                  <div key={opp.rank} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      {opp.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{opp.title}</p>
                      <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                        <span>{opp.views} views</span>
                        <span>💾 {opp.saves}</span>
                        <span>📝 {opp.applications}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Partners */}
          <Card>
            <CardHeader>
              <CardTitle>Top đối tác</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPartners.map((partner) => (
                  <div key={partner.rank} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 font-bold text-secondary">
                      {partner.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{partner.name}</p>
                      <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                        <span>{partner.opportunities} cơ hội</span>
                        <span>{partner.views} views</span>
                        <span>💾 {partner.saves}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Nguồn truy cập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{source.source}</span>
                    <span className="text-muted-foreground">{source.visits.toLocaleString()} lượt ({source.percentage}%)</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
