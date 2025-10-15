import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  User,
  Plus,
  Save,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SubmitOpportunity = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard/partner", icon: LayoutDashboard },
    { label: "Đăng cơ hội mới", path: "/dashboard/partner/submit", icon: Plus },
    { label: "Cơ hội đã đăng", path: "/dashboard/partner/submissions", icon: FileText },
    { label: "Phân tích", path: "/dashboard/partner/analytics", icon: BarChart3 },
    { label: "Hồ sơ tổ chức", path: "/dashboard/partner/profile", icon: User },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cơ hội đã được gửi! Đang chờ admin duyệt.");
    setTimeout(() => navigate("/dashboard/partner/submissions"), 1500);
  };

  return (
    <DashboardLayout menuItems={menuItems} role="partner">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">Đăng cơ hội mới</h1>
          <p className="text-muted-foreground">
            Tạo và đăng cơ hội học bổng, cuộc thi, hoặc thực tập
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>
                Điền đầy đủ thông tin để thu hút ứng viên
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Tiêu đề <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="VD: Học bổng Toàn phần VinUni Excellence 2025"
                  required
                />
              </div>

              {/* Type and Category */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="type">
                    Loại <span className="text-destructive">*</span>
                  </Label>
                  <Select required>
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

                <div className="space-y-2">
                  <Label htmlFor="field">Ngành học</Label>
                  <Select>
                    <SelectTrigger id="field">
                      <SelectValue placeholder="Chọn ngành" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">CNTT</SelectItem>
                      <SelectItem value="business">Kinh tế</SelectItem>
                      <SelectItem value="engineering">Kỹ thuật</SelectItem>
                      <SelectItem value="medicine">Y khoa</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Bậc học</Label>
                  <Select>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Chọn bậc" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">Đại học</SelectItem>
                      <SelectItem value="master">Thạc sĩ</SelectItem>
                      <SelectItem value="phd">Tiến sĩ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location and Deadline */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">
                    Khu vực <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="VD: Hà Nội, Việt Nam"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">
                    Hạn nộp <span className="text-destructive">*</span>
                  </Label>
                  <Input id="deadline" type="date" required />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <Label htmlFor="short-desc">
                  Mô tả ngắn <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="short-desc"
                  placeholder="Tóm tắt ngắn gọn về cơ hội (tối đa 200 ký tự)"
                  rows={3}
                  maxLength={200}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Mô tả này sẽ hiển thị trên thẻ cơ hội
                </p>
              </div>

              {/* Detailed Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Mô tả chi tiết <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Mô tả chi tiết về cơ hội, yêu cầu, quyền lợi..."
                  rows={8}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Hãy viết chi tiết để sinh viên hiểu rõ về cơ hội
                </p>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label htmlFor="requirements">Yêu cầu ứng viên</Label>
                <Textarea
                  id="requirements"
                  placeholder="VD: GPA tối thiểu 3.0/4.0, có chứng chỉ tiếng Anh..."
                  rows={4}
                />
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <Label htmlFor="benefits">Quyền lợi</Label>
                <Textarea
                  id="benefits"
                  placeholder="VD: Học phí toàn phần, trợ cấp sinh hoạt..."
                  rows={4}
                />
              </div>

              {/* Application Process */}
              <div className="space-y-2">
                <Label htmlFor="process">Quy trình nộp hồ sơ</Label>
                <Textarea
                  id="process"
                  placeholder="VD: Bước 1: Nộp hồ sơ online, Bước 2: Phỏng vấn..."
                  rows={4}
                />
              </div>

              {/* External Link */}
              <div className="space-y-2">
                <Label htmlFor="link">Link Blogspot/Website chính thức</Label>
                <Input
                  id="link"
                  type="url"
                  placeholder="https://example.blogspot.com/scholarship"
                />
                <p className="text-xs text-muted-foreground">
                  Link này sẽ hiển thị khi sinh viên nhấn "Apply"
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
                <Input
                  id="tags"
                  placeholder="VD: toàn phần, quốc tế, công nghệ"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Lưu nháp
                </Button>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Gửi duyệt
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Info Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold">💡 Lưu ý quan trọng</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Cơ hội của bạn sẽ được admin xem xét và duyệt trong vòng 24-48h
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Hãy cung cấp thông tin chính xác, đầy đủ để tăng tỷ lệ được duyệt
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Link Blogspot/Website sẽ được thêm sau khi admin duyệt
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SubmitOpportunity;
