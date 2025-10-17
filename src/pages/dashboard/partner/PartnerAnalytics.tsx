import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutDashboard, FileText, BarChart3, User, Eye, Download, TrendingUp, Bookmark } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const menuItems = [
  { label: "Dashboard", path: "/dashboard/partner", icon: LayoutDashboard },
  { label: "Đăng cơ hội", path: "/dashboard/partner/submit", icon: FileText },
  { label: "Bài đã đăng", path: "/dashboard/partner/submissions", icon: FileText },
  { label: "Thống kê", path: "/dashboard/partner/analytics", icon: BarChart3 },
  { label: "Hồ sơ", path: "/dashboard/partner/profile", icon: User },
];

// Mock data for charts
const viewsOverTime = [
  { date: "01/12", views: 450 },
  { date: "08/12", views: 680 },
  { date: "15/12", views: 920 },
  { date: "22/12", views: 1150 },
  { date: "29/12", views: 1450 },
  { date: "05/01", views: 1680 },
  { date: "12/01", views: 2100 },
];

const savesByScholarship = [
  { name: "Học bổng STEM", saves: 340 },
  { name: "Thạc sĩ CN", saves: 220 },
  { name: "Tiến sĩ KH", saves: 80 },
  { name: "Du học SG", saves: 890 },
];

const statusDistribution = [
  { name: "Đang mở", value: 2, color: "#22c55e" },
  { name: "Đã duyệt", value: 5, color: "#3b82f6" },
  { name: "Chờ duyệt", value: 1, color: "#f59e0b" },
  { name: "Đã đóng", value: 2, color: "#64748b" },
];

const detailedData = [
  {
    id: 1,
    title: "Học bổng STEM toàn phần 2025",
    views: 2500,
    saves: 340,
    approvalRate: "95%",
    postedDate: "01/09/2024",
  },
  {
    id: 2,
    title: "Học bổng Thạc sĩ Công nghệ",
    views: 1800,
    saves: 220,
    approvalRate: "88%",
    postedDate: "15/09/2024",
  },
  {
    id: 3,
    title: "Học bổng Tiến sĩ Khoa học",
    views: 450,
    saves: 80,
    approvalRate: "Chờ duyệt",
    postedDate: "10/12/2024",
  },
  {
    id: 4,
    title: "Học bổng Du học Singapore",
    views: 5200,
    saves: 890,
    approvalRate: "92%",
    postedDate: "20/08/2024",
  },
];

const PartnerAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30");

  const handleExportCSV = () => {
    toast.success("Đang xuất báo cáo CSV...");
  };

  return (
    <DashboardLayout menuItems={menuItems} role="partner">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Thống kê & Phân tích</h1>
            <p className="text-muted-foreground mt-2">
              Theo dõi hiệu quả hoạt động của các bài đăng
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 ngày qua</SelectItem>
                <SelectItem value="30">30 ngày qua</SelectItem>
                <SelectItem value="all">Toàn thời gian</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Xuất CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng lượt xem</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9,950</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+12.5%</span> so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng lượt lưu</CardTitle>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,530</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+8.2%</span> so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bài đang mở</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-1">Đang hoạt động</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã duyệt</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">Tổng bài đã đăng</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Line Chart - Views Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Lượt xem theo thời gian</CardTitle>
              <CardDescription>Xu hướng lượt xem trong {timeRange} ngày qua</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Lượt xem"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart - Saves by Scholarship */}
          <Card>
            <CardHeader>
              <CardTitle>Lượt lưu theo học bổng</CardTitle>
              <CardDescription>So sánh lượt lưu giữa các bài đăng</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={savesByScholarship}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="saves" fill="hsl(var(--primary))" name="Lượt lưu" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart - Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ bài đăng theo trạng thái</CardTitle>
            <CardDescription>Phân bố trạng thái các bài đăng học bổng</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Dữ liệu chi tiết</CardTitle>
            <CardDescription>Thống kê toàn bộ các bài đăng học bổng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[250px]">Tên học bổng</TableHead>
                    <TableHead>Lượt xem</TableHead>
                    <TableHead>Lượt lưu</TableHead>
                    <TableHead>Tỷ lệ duyệt</TableHead>
                    <TableHead>Ngày đăng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.views.toLocaleString()}</TableCell>
                      <TableCell>{item.saves}</TableCell>
                      <TableCell>{item.approvalRate}</TableCell>
                      <TableCell>{item.postedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerAnalytics;
