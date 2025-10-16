import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { LayoutDashboard, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Plus, Edit, Ban, Trash2 } from "lucide-react";

const ManagePartners = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const menuItems = [
    { label: "Tổng quan", path: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Quản lý cơ hội", path: "/dashboard/admin/opportunities", icon: FileText },
    { label: "Duyệt bài đăng", path: "/dashboard/admin/review", icon: AlertCircle },
    { label: "Quản lý đối tác", path: "/dashboard/admin/partners", icon: Users },
    { label: "Thông báo", path: "/dashboard/admin/notifications", icon: CheckCircle },
    { label: "Phân tích", path: "/dashboard/admin/analytics", icon: TrendingUp },
  ];

  const partners = [
    { 
      id: 1, 
      name: "Google Vietnam", 
      website: "https://careers.google.com/locations/vietnam/",
      contact: "hr@google.com.vn",
      status: "active",
      opportunitiesCount: 5,
      joinedDate: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Quỹ ASEAN", 
      website: "https://asean.org",
      contact: "nguyen.van.a@asean.org",
      status: "active",
      opportunitiesCount: 3,
      joinedDate: "2024-02-20"
    },
    { 
      id: 3, 
      name: "GreenTech Vietnam", 
      website: "https://greentech.vn",
      contact: "contact@greentech.vn",
      status: "active",
      opportunitiesCount: 2,
      joinedDate: "2024-03-10"
    },
    { 
      id: 4, 
      name: "Amazon Web Services", 
      website: "https://aws.amazon.com",
      contact: "aws@amazon.com",
      status: "blocked",
      opportunitiesCount: 1,
      joinedDate: "2024-01-05"
    },
  ];

  const activeCount = partners.filter(p => p.status === 'active').length;
  const blockedCount = partners.filter(p => p.status === 'blocked').length;

  return (
    <DashboardLayout menuItems={menuItems} role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý đối tác</h1>
            <p className="text-muted-foreground">Quản lý tài khoản và hoạt động của đối tác</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Thêm đối tác
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm đối tác mới</DialogTitle>
                <DialogDescription>
                  Tạo tài khoản đối tác mới trong hệ thống
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Tên tổ chức</Label>
                  <Input id="name" placeholder="Nhập tên tổ chức" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email liên hệ</Label>
                  <Input id="email" type="email" placeholder="contact@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Tạo đối tác</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Đang hoạt động</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{activeCount}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Bị chặn</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{blockedCount}</p>
                </div>
                <div className="rounded-lg bg-red-50 p-3">
                  <Ban className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tổng đối tác</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{partners.length}</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đối tác</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên tổ chức</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cơ hội</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                    <TableCell>
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {partner.website.replace('https://', '')}
                      </a>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{partner.contact}</TableCell>
                    <TableCell>{partner.opportunitiesCount}</TableCell>
                    <TableCell>{new Date(partner.joinedDate).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>
                      <Badge variant={partner.status === 'active' ? 'default' : 'destructive'}>
                        {partner.status === 'active' ? 'Hoạt động' : 'Đã chặn'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Ban className="h-4 w-4 text-amber-600" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
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

export default ManagePartners;
