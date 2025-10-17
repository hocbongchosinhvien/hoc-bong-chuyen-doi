import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LayoutDashboard, FileText, BarChart3, User, Building2, Mail, Phone, Globe, Edit, Calendar, Eye } from "lucide-react";
import { toast } from "sonner";

const menuItems = [
  { label: "Dashboard", path: "/dashboard/partner", icon: LayoutDashboard },
  { label: "Đăng cơ hội", path: "/dashboard/partner/submit", icon: FileText },
  { label: "Bài đã đăng", path: "/dashboard/partner/submissions", icon: FileText },
  { label: "Thống kê", path: "/dashboard/partner/analytics", icon: BarChart3 },
  { label: "Hồ sơ", path: "/dashboard/partner/profile", icon: User },
];

// Mock partner data
const partnerData = {
  name: "Quỹ Học Bổng Vingroup",
  logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
  description: "Quỹ học bổng hàng đầu Việt Nam, hỗ trợ sinh viên xuất sắc theo đuổi ước mơ học tập.",
  website: "https://vingroup.net",
  email: "contact@vingroup.net",
  phone: "+84 24 3974 9999",
  address: "458 Minh Khai, Hai Bà Trưng, Hà Nội",
  established: "2015",
};

// Mock scholarships posted by partner
const scholarships = [
  {
    id: 1,
    title: "Học bổng STEM toàn phần 2025",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop",
    deadline: "30/12/2025",
    status: "Đang mở",
    views: 2500,
    saves: 340,
  },
  {
    id: 2,
    title: "Học bổng Thạc sĩ Công nghệ",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=200&fit=crop",
    deadline: "15/01/2026",
    status: "Đang mở",
    views: 1800,
    saves: 220,
  },
  {
    id: 3,
    title: "Học bổng Tiến sĩ Khoa học",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
    deadline: "20/11/2025",
    status: "Chờ duyệt",
    views: 450,
    saves: 80,
  },
  {
    id: 4,
    title: "Học bổng Du học Singapore",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop",
    deadline: "01/10/2025",
    status: "Đã đóng",
    views: 5200,
    saves: 890,
  },
];

const PartnerProfile = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSaveProfile = () => {
    toast.success("Đã cập nhật hồ sơ thành công");
    setIsEditDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang mở":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Đang mở</Badge>;
      case "Chờ duyệt":
        return <Badge variant="secondary">Chờ duyệt</Badge>;
      case "Đã đóng":
        return <Badge variant="outline">Đã đóng</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout menuItems={menuItems} role="partner">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hồ sơ đối tác</h1>
            <p className="text-muted-foreground mt-2">Thông tin tổ chức và danh sách cơ hội đã đăng</p>
          </div>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa hồ sơ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Chỉnh sửa hồ sơ đối tác</DialogTitle>
                <DialogDescription>
                  Cập nhật thông tin tổ chức của bạn
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Tên tổ chức</Label>
                  <Input id="edit-name" defaultValue={partnerData.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Mô tả ngắn</Label>
                  <Textarea
                    id="edit-description"
                    defaultValue={partnerData.description}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-website">Website</Label>
                    <Input id="edit-website" defaultValue={partnerData.website} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input id="edit-email" type="email" defaultValue={partnerData.email} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Số điện thoại</Label>
                    <Input id="edit-phone" defaultValue={partnerData.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-established">Năm thành lập</Label>
                    <Input id="edit-established" defaultValue={partnerData.established} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Địa chỉ</Label>
                  <Input id="edit-address" defaultValue={partnerData.address} />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSaveProfile}>Lưu thay đổi</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Partner Info Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  src={partnerData.logo}
                  alt={partnerData.name}
                  className="w-32 h-32 rounded-lg object-cover border"
                />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{partnerData.name}</h2>
                  <p className="text-muted-foreground mt-1">{partnerData.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={partnerData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {partnerData.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${partnerData.email}`} className="text-primary hover:underline">
                      {partnerData.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{partnerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Thành lập năm {partnerData.established}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm col-span-full">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{partnerData.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scholarships Section */}
        <Card>
          <CardHeader>
            <CardTitle>Các học bổng đã đăng</CardTitle>
            <CardDescription>
              Danh sách các cơ hội học tập mà tổ chức của bạn đã đăng tải
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="overflow-hidden">
                  <img
                    src={scholarship.image}
                    alt={scholarship.title}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2">{scholarship.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Hạn nộp: {scholarship.deadline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(scholarship.status)}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{scholarship.views.toLocaleString()} lượt xem</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>💾</span>
                        <span>{scholarship.saves} lượt lưu</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Xem chi tiết
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerProfile;
