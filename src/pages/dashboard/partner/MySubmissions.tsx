import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutDashboard, FileText, BarChart3, User, Plus, Eye, Heart, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";

type Submission = {
  id: string;
  partner_id: string | null;
  title: string | null;
  deadline: string | null;   // YYYY-MM-DD
  status: "draft" | "submitted" | "approved" | "rejected";
  views?: number | null;
  saves?: number | null;
  created_at?: string | null;
};

const menuItems = [
  { label: "Dashboard", path: "/dashboard/partner", icon: LayoutDashboard },
  { label: "Đăng cơ hội mới", path: "/dashboard/partner/submit", icon: Plus },
  { label: "Cơ hội đã đăng", path: "/dashboard/partner/submissions", icon: FileText },
  { label: "Phân tích", path: "/dashboard/partner/analytics", icon: BarChart3 },
  { label: "Hồ sơ tổ chức", path: "/dashboard/partner/profile", icon: User },
];

const statusBadge = (status: Submission["status"]) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-600">Đã duyệt</Badge>;
    case "submitted":
      return <Badge variant="secondary">Chờ duyệt</Badge>;
    case "rejected":
      return <Badge variant="destructive">Từ chối</Badge>;
    case "draft":
    default:
      return <Badge variant="outline">Bản nháp</Badge>;
  }
};

const MySubmissions = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [rows, setRows] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<"all" | Submission["status"]>("all");

  // 1) Lấy partner_id mà user thuộc về (chỉ cần tồn tại dòng trong partner_members)
  useEffect(() => {
    (async () => {
      if (!user) {
        setPartnerId(null);
        setRows([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("partner_members")
          .select("partner_id")
          .eq("user_id", user.id)
          .limit(1);

        if (error) throw error;
        setPartnerId(data?.[0]?.partner_id ?? null);
      } catch (e) {
        console.error("fetch partner_id error:", e);
        setPartnerId(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // 2) Load submissions theo partner_id
  useEffect(() => {
    (async () => {
      if (!user) return;
      setLoading(true);
      try {
        let query = supabase
          .from("partner_submissions")
          .select("id, partner_id, title, deadline, status, created_at, views, saves")
          .order("created_at", { ascending: false });
  
        if (partnerId) {
          // Supabase .or() nhận chuỗi filter OR
          query = query.or(
            `partner_id.eq.${partnerId},submitted_by.eq.${user.id}`
          );
        } else {
          // chưa có partner -> vẫn hiển thị những bài chính user đã gửi
          query = query.eq("submitted_by", user.id);
        }
  
        const { data, error } = await query;
        if (error) throw error;
        setRows((data || []) as Submission[]);
      } catch (e) {
        console.error("Load partner_submissions error:", e);
        setRows([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [partnerId, user]);

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    return rows.filter((r) => r.status === filter);
  }, [rows, filter]);

  return (
    <DashboardLayout menuItems={menuItems} role="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Cơ hội đã đăng</h1>
            <p className="text-muted-foreground">Quản lý các cơ hội của tổ chức bạn</p>
          </div>
          <Button asChild>
            <a href="/dashboard/partner/submit" className="gap-2">
              <Plus className="h-4 w-4" />
              Đăng cơ hội mới
            </a>
          </Button>
        </div>

        <div className="flex gap-4">
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Lọc trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
              <SelectItem value="submitted">Chờ duyệt</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
              <SelectItem value="rejected">Từ chối</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-6">
            {loading ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Đang tải danh sách…</div>
            ) : !partnerId ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Bạn chưa thuộc tổ chức nào. Liên hệ admin để được thêm vào partner.
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Chưa có mục nào phù hợp.</div>
            ) : (
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
                  {filtered.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title || "(Chưa có tiêu đề)"}</TableCell>
                      <TableCell>
                        {item.deadline ? new Date(item.deadline).toLocaleDateString("vi-VN") : "—"}
                      </TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell>
                        <Eye className="mr-2 inline h-4 w-4" />
                        {item.views ?? 0}
                      </TableCell>
                      <TableCell>
                        <Heart className="mr-2 inline h-4 w-4" />
                        {item.saves ?? 0}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => (window.location.href = `/dashboard/partner/submit?id=${item.id}`)}
                            title="Sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => alert("Tính năng xoá sẽ thêm sau.")}
                            title="Xoá"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MySubmissions;
