// src/pages/dashboard/admin/ReviewQueue.tsx
import { useEffect, useMemo, useState, useCallback } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LayoutDashboard, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Eye, Check, X,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";

type SubmissionStatus = "draft" | "submitted" | "approved" | "rejected";
type OppType = "scholarship" | "contest" | "ambassador" | "internship";

type Submission = {
  id: string;
  partner_id: string | null;
  title: string | null;
  type: OppType | null;
  deadline: string | null; // YYYY-MM-DD
  description: string | null;
  blogspot_url?: string | null;
  status: SubmissionStatus;
  submitted_by: string;
  submitted_at?: string | null;
  created_at?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  review_note?: string | null;
};

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

const statusBadge = (status: SubmissionStatus) => {
  switch (status) {
    case "submitted":
      return <Badge variant="secondary">Chờ duyệt</Badge>;
    case "approved":
      return <Badge>Đã duyệt</Badge>;
    case "rejected":
      return <Badge variant="destructive">Từ chối</Badge>;
    case "draft":
    default:
      return <Badge variant="outline">Bản nháp</Badge>;
  }
};

const typeLabel = (t: OppType | null) =>
  t === "scholarship"
    ? "Học bổng"
    : t === "contest"
    ? "Cuộc thi"
    : t === "ambassador"
    ? "Đại sứ"
    : t === "internship"
    ? "Thực tập"
    : "—";

const ReviewQueue = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const [previewId, setPreviewId] = useState<string | null>(null);
  const [approveId, setApproveId] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);

  const [blogspotLink, setBlogspotLink] = useState("");
  const [rejectNote, setRejectNote] = useState("");

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("partner_submissions")
        .select(
          "id, partner_id, title, type, deadline, description, blogspot_url, status, submitted_by, submitted_at, created_at, reviewed_by, reviewed_at, review_note"
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      setRows((data || []) as Submission[]);
    } catch (e) {
      console.error("Load submissions error:", e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const counts = useMemo(() => {
    return {
      submitted: rows.filter((r) => r.status === "submitted").length,
      approved: rows.filter((r) => r.status === "approved").length,
      rejected: rows.filter((r) => r.status === "rejected").length,
    };
  }, [rows]);

  const pickRow = (id: string | null) => rows.find((r) => r.id === id) || null;

  const isValidUrl = (s: string) => {
    if (!s) return true; // cho phép bỏ trống
    try {
      new URL(s);
      return true;
    } catch {
      return false;
    }
  };

  // PHÊ DUYỆT: cập nhật submission + tạo cơ hội ở bảng opportunities (status=open)
  const doApprove = async () => {
    if (!approveId || !user) return;
    const sub = pickRow(approveId);
    if (!sub) return;
  
    try {
      // 1) Update submission
      const { error: e1 } = await supabase
        .from("partner_submissions")
        .update({
          status: "approved",
          blogspot_url: blogspotLink || null,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", approveId);
      if (e1) throw e1;
  
      // 2) Tạo cơ hội theo schema hiện có
      const shortSummary =
        (sub.description || "").trim().slice(0, 300); // tùy ý giới hạn
  
      const oppInsert: any = {
        title: sub.title,
        type: sub.type,                 // enum opportunity_type của bạn
        deadline: sub.deadline,         // date
        short_summary: shortSummary,    // mô tả ngắn -> short_summary
        detail_url: blogspotLink || null, // link blogspot -> detail_url
        location: (sub as any).location || null, // nếu submission có location
        status: "approved",             // enum opportunity_status hiện có
        created_by: user.id,            // admin id (FK)
        partner_id: sub.partner_id || null,
        // KHÔNG set description / blogspot_url / submission_id vì schema chưa có
      };
  
      const { error: e2 } = await supabase
        .from("opportunities")
        .insert(oppInsert);
      if (e2) throw e2;
  
      // 3) Cập nhật UI
      setRows(prev =>
        prev.map(r => (r.id === sub.id
          ? { ...r, status: "approved", blogspot_url: blogspotLink || null }
          : r))
      );
  
      setApproveId(null);
      setBlogspotLink("");
      alert("Đã phê duyệt và đăng cơ hội.");
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Phê duyệt thất bại.");
    }
  };
  

  // TỪ CHỐI: chỉ đổi trạng thái + ghi chú
  const doReject = async () => {
    if (!rejectId || !user) return;
    const sub = pickRow(rejectId);
    if (!sub) return;
    if (sub.status !== "submitted") {
      alert("Chỉ có thể từ chối bài ở trạng thái CHỜ DUYỆT.");
      return;
    }

    try {
      const { error } = await supabase
        .from("partner_submissions")
        .update({
          status: "rejected",
          review_note: rejectNote || null,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", sub.id);

      if (error) throw error;

      setRejectId(null);
      setRejectNote("");
      await fetchRows();
      alert("Đã từ chối bài đăng.");
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Từ chối thất bại.");
    }
  };

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
                  <p className="mt-2 text-3xl font-bold text-foreground">{counts.submitted}</p>
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
                  <p className="mt-2 text-3xl font-bold text-foreground">{counts.approved}</p>
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
                  <p className="mt-2 text-3xl font-bold text-foreground">{counts.rejected}</p>
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
            {loading ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Đang tải…</div>
            ) : rows.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Chưa có bài nào.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.title || "(Chưa có tiêu đề)"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{typeLabel(sub.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        {sub.deadline ? new Date(sub.deadline).toLocaleDateString("vi-VN") : "—"}
                      </TableCell>
                      <TableCell>{statusBadge(sub.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setPreviewId(sub.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {sub.status === "submitted" && (
                            <>
                              <Button variant="ghost" size="icon" onClick={() => setApproveId(sub.id)}>
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => setRejectId(sub.id)}>
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
            )}
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={!!previewId} onOpenChange={() => setPreviewId(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Xem trước bài đăng</DialogTitle>
              <DialogDescription>Chi tiết đầy đủ về cơ hội</DialogDescription>
            </DialogHeader>
            {(() => {
              const sub = pickRow(previewId);
              if (!sub) return null;
              return (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold">Tiêu đề</Label>
                    <p className="mt-1">{sub.title}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold">Loại</Label>
                      <p className="mt-1">{typeLabel(sub.type)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Hạn nộp</Label>
                      <p className="mt-1">
                        {sub.deadline ? new Date(sub.deadline).toLocaleDateString("vi-VN") : "—"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Mô tả</Label>
                    <p className="mt-1 text-sm text-muted-foreground whitespace-pre-line">
                      {sub.description || "—"}
                    </p>
                  </div>
                  {sub.blogspot_url ? (
                    <div>
                      <Label className="text-sm font-semibold">Blogspot</Label>
                      <p className="mt-1 text-sm">
                        <a className="text-primary underline" href={sub.blogspot_url} target="_blank" rel="noreferrer">
                          {sub.blogspot_url}
                        </a>
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })()}
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewId(null)}>
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Approve Dialog */}
        <Dialog open={!!approveId} onOpenChange={() => setApproveId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Phê duyệt bài đăng</DialogTitle>
              <DialogDescription>Nhập link Blogspot trước khi xuất bản (không bắt buộc)</DialogDescription>
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
                  Link này sẽ lưu vào submission và đồng bộ sang cơ hội được xuất bản.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setApproveId(null)}>
                Hủy
              </Button>
              <Button onClick={doApprove}>Phê duyệt & Đăng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={!!rejectId} onOpenChange={() => setRejectId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Từ chối bài đăng</DialogTitle>
              <DialogDescription>Tuỳ chọn nhập lý do từ chối</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="note">Ghi chú (không bắt buộc)</Label>
                <Input
                  id="note"
                  placeholder="Lý do từ chối…"
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectId(null)}>
                Hủy
              </Button>
              <Button variant="destructive" onClick={doReject}>
                Từ chối
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ReviewQueue;
