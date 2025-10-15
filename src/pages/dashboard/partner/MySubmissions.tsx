import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutDashboard, FileText, BarChart3, User, Plus, Eye, Heart, Edit, Trash2 } from "lucide-react";

const MySubmissions = () => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard/partner", icon: LayoutDashboard },
    { label: "Đăng cơ hội mới", path: "/dashboard/partner/submit", icon: Plus },
    { label: "Cơ hội đã đăng", path: "/dashboard/partner/submissions", icon: FileText },
    { label: "Phân tích", path: "/dashboard/partner/analytics", icon: BarChart3 },
    { label: "Hồ sơ tổ chức", path: "/dashboard/partner/profile", icon: User },
  ];

  const submissions = [
    { id: "1", title: "Học bổng ABC 2025", deadline: "31/12/2024", status: "approved", views: 1245, saves: 89 },
    { id: "2", title: "Cuộc thi XYZ Innovation", deadline: "15/01/2025", status: "pending", views: 0, saves: 0 },
    { id: "3", title: "Thực tập hè Data Science", deadline: "28/12/2024", status: "approved", views: 567, saves: 34 },
    { id: "4", title: "Đại sứ thương hiệu", deadline: "20/12/2024", status: "rejected", views: 0, saves: 0 },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: <Badge className="bg-green-600">Đã duyệt</Badge>,
      pending: <Badge variant="secondary">Chờ duyệt</Badge>,
      rejected: <Badge variant="destructive">Từ chối</Badge>,
    };
    return variants[status as keyof typeof variants];
  };

  return (
    <DashboardLayout menuItems={menuItems} role="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Cơ hội đã đăng</h1>
            <p className="text-muted-foreground">Quản lý các cơ hội bạn đã tạo</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="rejected">Từ chối</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Lượt xem</TableHead>
                  <TableHead>Lượt lưu</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.deadline}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell><Eye className="mr-2 inline h-4 w-4" />{item.views}</TableCell>
                    <TableCell><Heart className="mr-2 inline h-4 w-4" />{item.saves}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MySubmissions;
