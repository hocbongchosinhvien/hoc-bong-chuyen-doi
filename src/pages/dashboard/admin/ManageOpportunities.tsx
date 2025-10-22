import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MultiSelectInput } from "@/components/ui/multi-select-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { LayoutDashboard, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Plus, Edit, Trash2, XCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const ManageOpportunities = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);

  const fieldSuggestions = [
    "CNTT",
    "Kinh tế",
    "Kỹ thuật",
    "Y khoa",
    "Luật",
    "Giáo dục",
    "Nghệ thuật",
    "Khoa học tự nhiên",
    "Khoa học xã hội",
    "Nông nghiệp",
    "Tất cả ngành",
  ];

  const levelSuggestions = [
    "Đại học",
    "Thạc sĩ",
    "Tiến sĩ",
    "Cao đẳng",
    "Trung cấp",
    "Tất cả bậc",
  ];

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

  const opportunities = [
    { id: 1, title: "Học bổng Chính phủ Nhật Bản", type: "Học bổng", deadline: "2025-12-31", status: "open", views: 1234, saves: 456 },
    { id: 2, title: "Cuộc thi Lập trình AI", type: "Cuộc thi", deadline: "2025-11-15", status: "open", views: 987, saves: 321 },
    { id: 3, title: "Đại sứ Microsoft Learn", type: "Đại sứ", deadline: "2025-10-30", status: "open", views: 876, saves: 298 },
    { id: 4, title: "Thực tập Samsung R&D", type: "Thực tập", deadline: "2025-09-20", status: "closed", views: 765, saves: 234 },
    { id: 5, title: "Học bổng ASEAN 2024", type: "Học bổng", deadline: "2025-08-15", status: "closed", views: 654, saves: 198 },
  ];

  return (
    <DashboardLayout menuItems={menuItems} role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý cơ hội</h1>
            <p className="text-muted-foreground">Thêm, sửa, xóa và quản lý trạng thái cơ hội</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Thêm cơ hội mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm cơ hội mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin để tạo cơ hội mới trong hệ thống
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input id="title" placeholder="Nhập tiêu đề cơ hội" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Loại</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scholarship">Học bổng</SelectItem>
                        <SelectItem value="contest">Cuộc thi</SelectItem>
                        <SelectItem value="ambassador">Đại sứ</SelectItem>
                        <SelectItem value="internship">Thực tập</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Hạn nộp</Label>
                    <Input id="deadline" type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="field">Ngành học</Label>
                  <MultiSelectInput
                    value={fields}
                    onChange={setFields}
                    placeholder="Chọn hoặc nhập ngành học..."
                    suggestions={fieldSuggestions}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="level">Bậc học</Label>
                  <MultiSelectInput
                    value={levels}
                    onChange={setLevels}
                    placeholder="Chọn hoặc nhập bậc học..."
                    suggestions={levelSuggestions}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Mô tả ngắn</Label>
                  <Textarea id="description" placeholder="Mô tả ngắn về cơ hội" rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="link">Link Blogspot</Label>
                  <Input id="link" placeholder="https://..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Tạo cơ hội</Button>
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
                  <p className="text-sm font-medium text-muted-foreground">Đang mở</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">48</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Đã đóng</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">12</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <XCircle className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tổng cơ hội</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">60</p>
                </div>
                <div className="rounded-lg bg-pink-50 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Danh sách cơ hội</CardTitle>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Lọc trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="open">Đang mở</SelectItem>
                    <SelectItem value="closed">Đã đóng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Hạn nộp</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Lượt xem</TableHead>
                  <TableHead>Lưu</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map((opp) => (
                  <TableRow key={opp.id}>
                    <TableCell className="font-medium">{opp.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{opp.type}</Badge>
                    </TableCell>
                    <TableCell>{new Date(opp.deadline).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>
                      <Badge variant={opp.status === 'open' ? 'default' : 'secondary'}>
                        {opp.status === 'open' ? 'Đang mở' : 'Đã đóng'}
                      </Badge>
                    </TableCell>
                    <TableCell>{opp.views}</TableCell>
                    <TableCell>{opp.saves}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingId(opp.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <XCircle className="h-4 w-4" />
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

export default ManageOpportunities;
