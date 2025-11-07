import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { LayoutDashboard, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Plus, Edit, Trash2, XCircle } from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MultiSelectInput } from "@/components/ui/multi-select-input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type OpportunityType = "scholarship" | "contest" | "ambassador" | "internship" | "grant" | "other";
type OpportunityStatus = "open" | "closed" | "draft";

type OpportunityRow = {
  id: string;
  title: string;
  type: OpportunityType | null;
  deadline: string | null;
  status: OpportunityStatus;
  view_count: number | null;
  save_count: number | null;
  created_at: string;
};

const fieldSuggestions = [
  "CNTT","Kinh tế","Kỹ thuật","Y khoa","Luật","Giáo dục",
  "Nghệ thuật","Khoa học tự nhiên","Khoa học xã hội","Nông nghiệp","Tất cả ngành",
];

const levelSuggestions = [
  "Đại học","Thạc sĩ","Tiến sĩ","Cao đẳng","Trung cấp","Tất cả bậc",
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

export default function ManageOpportunities() {
  // ===== list & stats =====
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<OpportunityRow[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | OpportunityStatus>("all");

  const openCount = useMemo(() => rows.filter(r => r.status === "open").length, [rows]);
  const closedCount = useMemo(() => rows.filter(r => r.status === "closed").length, [rows]);
  const totalCount = rows.length;

  const loadRows = async () => {
    setLoading(true);
    try {
      const query = supabase
        .from("opportunities")
        .select("id,title,type,deadline,status,view_count,save_count,created_at")
        .order("created_at", { ascending: false });
      const { data, error } = await query;
      if (error) throw error;
      setRows((data || []) as any);
    } catch (e: any) {
      alert(e?.message || "Tải danh sách thất bại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, []);

  // ===== modal new =====
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState<OpportunityType | "">("");
  const [formDeadline, setFormDeadline] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [formSummary, setFormSummary] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = !!(formTitle.trim() && formType && formDeadline && formUrl.trim());

  const resetForm = () => {
    setFormTitle("");
    setFormType("");
    setFormDeadline("");
    setFields([]);
    setLevels([]);
    setFormSummary("");
    setFormUrl("");
  };

  const createOpportunity = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const { data: ures, error: uErr } = await supabase.auth.getUser();
      if (uErr) throw uErr;
      const user = ures.user;
      if (!user) throw new Error("Bạn chưa đăng nhập.");

      const payload: any = {
        title: formTitle.trim(),
        type: formType,
        deadline: formDeadline,
        short_summary: formSummary?.trim() || null,
        detail_url: formUrl.trim(),
        created_by: user.id,
        status: "open" as OpportunityStatus, // hoặc "draft"
        eligibility: { majors: fields, degrees: levels },
      };

      const { error } = await supabase.from("opportunities").insert(payload);
      if (error) throw error;

      setIsAddDialogOpen(false);
      resetForm();
      await loadRows();
      alert("Đã tạo cơ hội mới.");
    } catch (e: any) {
      alert(e?.message || "Tạo cơ hội thất bại.");
    } finally {
      setSubmitting(false);
    }
  };

  // ===== actions =====
  const toggleStatus = async (id: string, current: OpportunityStatus) => {
    const next: OpportunityStatus = current === "open" ? "closed" : "open";
    try {
      const { error } = await supabase
        .from("opportunities")
        .update({ status: next })
        .eq("id", id);
      if (error) throw error;
      setRows((prev) => prev.map(r => (r.id === id ? { ...r, status: next } : r)));
    } catch (e: any) {
      alert(e?.message || "Cập nhật trạng thái thất bại.");
    }
  };

  const deleteRow = async (id: string) => {
    if (!confirm("Xóa cơ hội này?")) return;
    try {
      const { error } = await supabase.from("opportunities").delete().eq("id", id);
      if (error) throw error;
      setRows((prev) => prev.filter(r => r.id !== id));
    } catch (e: any) {
      alert(e?.message || "Xóa thất bại.");
    }
  };

  // ===== filtered list =====
  const list = rows.filter(r => (statusFilter === "all" ? true : r.status === statusFilter));

  return (
    <DashboardLayout menuItems={menuItems} role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý cơ hội</h1>
            <p className="text-muted-foreground">Thêm, sửa, xóa và quản lý trạng thái cơ hội</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={(v) => { setIsAddDialogOpen(v); if (!v) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Thêm cơ hội mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm cơ hội mới</DialogTitle>
                <DialogDescription>Điền thông tin để tạo cơ hội mới trong hệ thống</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input id="title" placeholder="Nhập tiêu đề cơ hội" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Loại</Label>
                    <Select value={formType} onValueChange={(v) => setFormType(v as OpportunityType)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scholarship">Học bổng</SelectItem>
                        <SelectItem value="contest">Cuộc thi</SelectItem>
                        <SelectItem value="ambassador">Đại sứ</SelectItem>
                        <SelectItem value="internship">Thực tập</SelectItem>
                        <SelectItem value="grant">Tài trợ/Grant</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Hạn nộp</Label>
                    <Input id="deadline" type="date" value={formDeadline} onChange={(e) => setFormDeadline(e.target.value)} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Ngành học</Label>
                  <MultiSelectInput
                    value={fields}
                    onChange={setFields}
                    placeholder="Chọn hoặc nhập ngành học..."
                    suggestions={fieldSuggestions}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Bậc học</Label>
                  <MultiSelectInput
                    value={levels}
                    onChange={setLevels}
                    placeholder="Chọn hoặc nhập bậc học..."
                    suggestions={levelSuggestions}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Mô tả ngắn</Label>
                  <Textarea placeholder="Mô tả ngắn về cơ hội" rows={3} value={formSummary} onChange={(e) => setFormSummary(e.target.value)} />
                </div>

                <div className="grid gap-2">
                  <Label>Link Blogspot</Label>
                  <Input placeholder="https://..." value={formUrl} onChange={(e) => setFormUrl(e.target.value)} />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
                <Button onClick={createOpportunity} disabled={!canSubmit || submitting}>
                  {submitting ? "Đang tạo..." : "Tạo cơ hội"}
                </Button>
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
                  <p className="mt-2 text-3xl font-bold text-foreground">{openCount}</p>
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
                  <p className="mt-2 text-3xl font-bold text-foreground">{closedCount}</p>
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
                  <p className="mt-2 text-3xl font-bold text-foreground">{totalCount}</p>
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
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Lọc trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="open">Đang mở</SelectItem>
                    <SelectItem value="closed">Đã đóng</SelectItem>
                    <SelectItem value="draft">Nháp</SelectItem>
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
                {!loading && list.length === 0 && (
                  <TableRow><TableCell colSpan={7}>Chưa có dữ liệu.</TableCell></TableRow>
                )}
                {list.map((opp) => (
                  <TableRow key={opp.id}>
                    <TableCell className="font-medium">{opp.title}</TableCell>
                    <TableCell><Badge variant="outline">{opp.type || "—"}</Badge></TableCell>
                    <TableCell>{opp.deadline ? new Date(opp.deadline).toLocaleDateString("vi-VN") : "—"}</TableCell>
                    <TableCell>
                      <Badge variant={opp.status === "open" ? "default" : "secondary"}>
                        {opp.status === "open" ? "Đang mở" : opp.status === "closed" ? "Đã đóng" : "Nháp"}
                      </Badge>
                    </TableCell>
                    <TableCell>{opp.view_count ?? 0}</TableCell>
                    <TableCell>{opp.save_count ?? 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* (Dự phòng) Sửa */}
                        <Button variant="ghost" size="icon" disabled>
                          <Edit className="h-4 w-4" />
                        </Button>

                        {/* Đóng/Mở */}
                        <Button variant="ghost" size="icon" onClick={() => toggleStatus(opp.id, opp.status)}>
                          <XCircle className="h-4 w-4" />
                        </Button>

                        {/* Xóa */}
                        <Button variant="ghost" size="icon" onClick={() => deleteRow(opp.id)}>
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
}
