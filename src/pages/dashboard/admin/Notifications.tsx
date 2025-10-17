import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { LayoutDashboard, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Send, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const { toast } = useToast();
  const [selectedOpportunity, setSelectedOpportunity] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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
    { id: 1, title: "Học bổng Chính phủ Nhật Bản", subscribers: 456 },
    { id: 2, title: "Cuộc thi Lập trình AI", subscribers: 321 },
    { id: 3, title: "Đại sứ Microsoft Learn", subscribers: 298 },
    { id: 4, title: "Thực tập Samsung R&D", subscribers: 234 },
  ];

  const recentNotifications = [
    { id: 1, title: "Học bổng ASEAN mở lại", recipients: 123, sent: "2025-01-14", status: "sent" },
    { id: 2, title: "Cuộc thi AI sắp hết hạn", recipients: 87, sent: "2025-01-13", status: "sent" },
    { id: 3, title: "Cơ hội thực tập mới", recipients: 234, sent: "2025-01-10", status: "sent" },
  ];

  const handleSendNotification = () => {
    if (!selectedOpportunity || !subject || !message) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Đã gửi thông báo",
      description: `Gửi thành công tới ${
        opportunities.find(o => o.id.toString() === selectedOpportunity)?.subscribers || 0
      } người`,
    });

    // Reset form
    setSelectedOpportunity("");
    setSubject("");
    setMessage("");
  };

  return (
    <DashboardLayout menuItems={menuItems} role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gửi thông báo</h1>
          <p className="text-muted-foreground">Gửi email thông báo cho người dùng đã đăng ký nhắc hạn</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Send Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Soạn thông báo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="opportunity">Chọn cơ hội</Label>
                  <Select value={selectedOpportunity} onValueChange={setSelectedOpportunity}>
                    <SelectTrigger id="opportunity">
                      <SelectValue placeholder="Chọn cơ hội để gửi thông báo" />
                    </SelectTrigger>
                    <SelectContent>
                      {opportunities.map((opp) => (
                        <SelectItem key={opp.id} value={opp.id.toString()}>
                          {opp.title} ({opp.subscribers} người đăng ký)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Gửi cho những người đã nhấn "Báo khi mở lại"
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="subject">Tiêu đề email</Label>
                  <Input 
                    id="subject" 
                    placeholder="Nhập tiêu đề email"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Nội dung</Label>
                  <Textarea 
                    id="message"
                    placeholder="Nhập nội dung thông báo..."
                    rows={8}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Hỗ trợ định dạng văn bản cơ bản
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Số người nhận</p>
                      <p className="text-2xl font-bold text-foreground">
                        {selectedOpportunity 
                          ? opportunities.find(o => o.id.toString() === selectedOpportunity)?.subscribers || 0
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full gap-2" 
                  size="lg"
                  onClick={handleSendNotification}
                >
                  <Send className="h-4 w-4" />
                  Gửi thông báo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Xem trước</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border bg-background p-4">
                    <p className="text-xs font-semibold text-muted-foreground">TIÊU ĐỀ</p>
                    <p className="mt-2 font-medium text-foreground">
                      {subject || "Tiêu đề email sẽ hiển thị ở đây"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-4">
                    <p className="text-xs font-semibold text-muted-foreground">NỘI DUNG</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">
                      {message || "Nội dung email sẽ hiển thị ở đây"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thống kê gửi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Đã gửi hôm nay</p>
                    <p className="text-2xl font-bold text-foreground">2</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tổng người nhận</p>
                    <p className="text-2xl font-bold text-foreground">210</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử gửi</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Người nhận</TableHead>
                  <TableHead>Ngày gửi</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentNotifications.map((notif) => (
                  <TableRow key={notif.id}>
                    <TableCell className="font-medium">{notif.title}</TableCell>
                    <TableCell>{notif.recipients} người</TableCell>
                    <TableCell>{new Date(notif.sent).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Đã gửi
                      </span>
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

export default Notifications;
