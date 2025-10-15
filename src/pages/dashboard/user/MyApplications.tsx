import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LayoutDashboard,
  FileText,
  Heart,
  User,
  Eye,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";

const MyApplications = () => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard/user", icon: LayoutDashboard },
    { label: "Hồ sơ đã nộp", path: "/dashboard/user/applications", icon: FileText },
    { label: "Danh sách đã lưu", path: "/my-list", icon: Heart },
    { label: "Hồ sơ cá nhân", path: "/dashboard/user/profile", icon: User },
  ];

  const applications = [
    {
      id: "1",
      title: "Học bổng Chính phủ Nhật Bản MEXT 2025",
      organization: "Chính phủ Nhật Bản",
      deadline: "31/12/2024",
      status: "submitted" as const,
      progress: 75,
      notes: "Đã nộp hồ sơ, chờ kết quả vòng sơ loại",
      timeline: [
        { step: "Nộp hồ sơ", date: "15/11/2024", completed: true },
        { step: "Sơ loại hồ sơ", date: "10/12/2024", completed: false },
        { step: "Phỏng vấn", date: "15/01/2025", completed: false },
        { step: "Kết quả cuối", date: "31/01/2025", completed: false },
      ],
    },
    {
      id: "2",
      title: "Học bổng VinUni Excellence 2025",
      organization: "VinUniversity",
      deadline: "10/01/2025",
      status: "in-progress" as const,
      progress: 50,
      notes: "Đang chuẩn bị thư giới thiệu",
    },
    {
      id: "3",
      title: "Cuộc thi Khởi nghiệp Quốc gia 2024",
      organization: "Bộ KH&CN",
      deadline: "15/01/2025",
      status: "draft" as const,
      progress: 25,
      notes: "Đã có ý tưởng, đang viết proposal",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Nháp</Badge>;
      case "in-progress":
        return <Badge variant="default">Đang thực hiện</Badge>;
      case "submitted":
        return <Badge className="bg-primary">Đã nộp</Badge>;
      case "result":
        return <Badge className="bg-green-600">Có kết quả</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft":
        return "Nháp";
      case "in-progress":
        return "Đang thực hiện";
      case "submitted":
        return "Đã nộp";
      case "result":
        return "Có kết quả";
      default:
        return status;
    }
  };

  return (
    <DashboardLayout menuItems={menuItems} role="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Hồ sơ đã nộp</h1>
            <p className="text-muted-foreground">
              Theo dõi tiến độ các hồ sơ bạn đã nộp
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">3</div>
              <p className="text-sm text-muted-foreground">Tổng hồ sơ</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <p className="text-sm text-muted-foreground">Đang thực hiện</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">1</div>
              <p className="text-sm text-muted-foreground">Đã nộp</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-muted-foreground">1</div>
              <p className="text-sm text-muted-foreground">Nháp</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cơ hội</TableHead>
                  <TableHead>Tổ chức</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Tiến độ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {app.organization}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {app.deadline}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={app.progress} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">
                          {app.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Chi tiết
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{app.title}</DialogTitle>
                            <DialogDescription>
                              {app.organization}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            {/* Info */}
                            <div className="grid gap-4 rounded-lg border border-border p-4">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Deadline
                                </span>
                                <span className="text-sm font-medium">
                                  {app.deadline}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Trạng thái
                                </span>
                                <span className="text-sm font-medium">
                                  {getStatusLabel(app.status)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Tiến độ
                                </span>
                                <span className="text-sm font-medium">
                                  {app.progress}%
                                </span>
                              </div>
                            </div>

                            {/* Timeline */}
                            {app.timeline && (
                              <div>
                                <h4 className="mb-4 font-semibold">
                                  Timeline dự kiến
                                </h4>
                                <div className="space-y-4">
                                  {app.timeline.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-3"
                                    >
                                      {item.completed ? (
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                                      ) : (
                                        <Circle className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                      )}
                                      <div className="flex-1">
                                        <div
                                          className={`font-medium ${
                                            item.completed
                                              ? "text-foreground"
                                              : "text-muted-foreground"
                                          }`}
                                        >
                                          {item.step}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {item.date}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Notes */}
                            <div>
                              <h4 className="mb-2 font-semibold">Ghi chú</h4>
                              <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                                {app.notes}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button className="flex-1">Cập nhật tiến độ</Button>
                              <Button variant="outline" className="flex-1">
                                Chỉnh sửa ghi chú
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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

export default MyApplications;
