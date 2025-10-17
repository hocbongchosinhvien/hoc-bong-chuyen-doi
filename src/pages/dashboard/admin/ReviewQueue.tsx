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
} from "@/components/ui/dialog";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { LayoutDashboard, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Eye, Check, X } from "lucide-react";

const ReviewQueue = () => {
  const [previewDialog, setPreviewDialog] = useState<number | null>(null);
  const [approveDialog, setApproveDialog] = useState<number | null>(null);
  const [blogspotLink, setBlogspotLink] = useState("");

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

  const submissions = [
    { 
      id: 1, 
      title: "Học bổng ASEAN 2025", 
      partner: "Quỹ ASEAN",
      submittedBy: "nguyen.van.a@asean.org",
      type: "Học bổng",
      deadline: "2025-12-31",
      status: "pending", 
      submittedDate: "2025-01-15",
      description: "Học bổng toàn phần cho sinh viên ASEAN xuất sắc trong lĩnh vực khoa học và công nghệ."
    },
    { 
      id: 2, 
      title: "Cuộc thi Khởi nghiệp Xanh", 
      partner: "GreenTech Vietnam",
      submittedBy: "contact@greentech.vn",
      type: "Cuộc thi",
      deadline: "2025-11-20",
      status: "pending", 
      submittedDate: "2025-01-14",
      description: "Cuộc thi dành cho các dự án khởi nghiệp trong lĩnh vực công nghệ xanh và bảo vệ môi trường."
    },
    { 
      id: 3, 
      title: "Thực tập Google Summer", 
      partner: "Google Vietnam",
      submittedBy: "hr@google.com.vn",
      type: "Thực tập",
      deadline: "2025-10-15",
      status: "approved", 
      submittedDate: "2025-01-10",
      description: "Chương trình thực tập mùa hè tại Google Vietnam cho sinh viên IT."
    },
    { 
      id: 4, 
      title: "Đại sứ AWS Educate", 
      partner: "Amazon Web Services",
      submittedBy: "aws@amazon.com",
      type: "Đại sứ",
      deadline: "2025-09-30",
      status: "rejected", 
      submittedDate: "2025-01-08",
      description: "Chương trình đại sứ AWS Educate cho sinh viên đam mê cloud computing."
    },
  ];

  const pendingCount = submissions.filter(s => s.status === 'pending').length;

  return (
    <DashboardLayout menuItems={menuItems} role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Duyệt bài đăng</h1>
          <p className="text-muted-foreground">Xem xét và phê duyệt cơ hội từ đối tác</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Chờ duyệt</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{pendingCount}</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Đã duyệt</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {submissions.filter(s => s.status === 'approved').length}
                  </p>
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
                  <p className="text-sm font-medium text-muted-foreground">Từ chối</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {submissions.filter(s => s.status === 'rejected').length}
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 p-3">
                  <X className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách bài đăng</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Đối tác</TableHead>
                  <TableHead>Người gửi</TableHead>
                  <TableHead>Ngày gửi</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.title}</TableCell>
                    <TableCell>{sub.partner}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{sub.submittedBy}</TableCell>
                    <TableCell>{new Date(sub.submittedDate).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          sub.status === 'pending' ? 'secondary' : 
                          sub.status === 'approved' ? 'default' : 
                          'destructive'
                        }
                      >
                        {sub.status === 'pending' ? 'Chờ duyệt' : 
                         sub.status === 'approved' ? 'Đã duyệt' : 
                         'Từ chối'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setPreviewDialog(sub.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {sub.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setApproveDialog(sub.id)}
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={previewDialog !== null} onOpenChange={() => setPreviewDialog(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Xem trước bài đăng</DialogTitle>
              <DialogDescription>
                Chi tiết đầy đủ về cơ hội này
              </DialogDescription>
            </DialogHeader>
            {previewDialog && submissions.find(s => s.id === previewDialog) && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold">Tiêu đề</Label>
                  <p className="mt-1">{submissions.find(s => s.id === previewDialog)?.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Đối tác</Label>
                    <p className="mt-1">{submissions.find(s => s.id === previewDialog)?.partner}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Loại</Label>
                    <p className="mt-1">{submissions.find(s => s.id === previewDialog)?.type}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Hạn nộp</Label>
                  <p className="mt-1">
                    {new Date(submissions.find(s => s.id === previewDialog)?.deadline || '').toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Mô tả</Label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {submissions.find(s => s.id === previewDialog)?.description}
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewDialog(null)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Approve Dialog */}
        <Dialog open={approveDialog !== null} onOpenChange={() => setApproveDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Phê duyệt bài đăng</DialogTitle>
              <DialogDescription>
                Nhập link Blogspot để hoàn tất phê duyệt
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="blogspot">Link Blogspot</Label>
                <Input 
                  id="blogspot"
                  placeholder="https://hbcsv.blogspot.com/..."
                  value={blogspotLink}
                  onChange={(e) => setBlogspotLink(e.target.value)}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Link này sẽ được đồng bộ với cơ hội sau khi duyệt
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setApproveDialog(null)}>Hủy</Button>
              <Button onClick={() => {
                setApproveDialog(null);
                setBlogspotLink("");
              }}>
                Phê duyệt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ReviewQueue;
