// src/pages/dashboard/partner/SubmitOpportunity.tsx
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelectInput } from "@/components/ui/multi-select-input";
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
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";

type OppType = "scholarship" | "contest" | "ambassador" | "internship";

const SubmitOpportunity = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState<OppType | undefined>(undefined);
  const [fields, setFields] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState(""); // yyyy-mm-dd
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  // loading
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // partner id
  const [partnerId, setPartnerId] = useState<string | null>(null);

  const menuItems = [
    { label: "Dashboard", path: "/dashboard/partner", icon: LayoutDashboard },
    { label: "Đăng cơ hội mới", path: "/dashboard/partner/submit", icon: Plus },
    { label: "Cơ hội đã đăng", path: "/dashboard/partner/submissions", icon: FileText },
    { label: "Phân tích", path: "/dashboard/partner/analytics", icon: BarChart3 },
    { label: "Hồ sơ tổ chức", path: "/dashboard/partner/profile", icon: User },
  ];

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
  ];

  const levelSuggestions = ["Đại học", "Thạc sĩ", "Tiến sĩ", "Cao đẳng", "Trung cấp"];

  // Helper tạo slug ngẫu nhiên ngắn
  const makeSlug = () => `partner-${Math.random().toString(36).slice(2, 8)}`;

  // Đảm bảo có partner (nếu role=partner) → nếu chưa có thì tự tạo rồi set partnerId
  // Lấy/đảm bảo partner_id dựa theo owner_id = user.id (RPC bypass RLS)
  // Lấy/đảm bảo partner_id dựa theo owner_id = user.id (RPC bypass RLS)
  useEffect(() => {
    (async () => {
      if (!user) return setPartnerId(null);
      try {
        const displayName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          (user.email ? user.email.split("@")[0] : "Đối tác");

        const { data, error } = await supabase.rpc("ensure_partner_for", {
          uid: user.id,
          name_in: displayName,
        });

        if (error) throw error;
        setPartnerId(data as string);
      } catch (e) {
        console.error("ensure_partner_for error:", e);
        setPartnerId(null);
        // Gợi ý hiển thị cho người dùng:
        // toast.error("Không thể khởi tạo tổ chức. Vui lòng thử lại hoặc liên hệ admin.");
      }
    })();
  }, [user]);



  const validateRequired = () => {
    if (!title.trim()) return "Vui lòng nhập tiêu đề.";
    if (!type) return "Vui lòng chọn loại cơ hội.";
    if (!location.trim()) return "Vui lòng nhập khu vực.";
    if (!deadline) return "Vui lòng chọn hạn nộp.";
    if (!shortDesc.trim()) return "Vui lòng nhập mô tả ngắn.";
    if (!description.trim()) return "Vui lòng nhập mô tả chi tiết.";
    return null;
  };

  const insertSubmission = async (status: "draft" | "submitted") => {
    if (!user) {
      toast.error("Bạn chưa đăng nhập.");
      return;
    }

    // Nếu gửi duyệt thì bắt buộc phải có partner_id
    if (status === "submitted" && !partnerId) {
      toast.error("Tài khoản của bạn chưa có tổ chức. Vui lòng thử lại sau.");
      return;
    }

    // Nếu status=submitted thì check đủ bắt buộc
    if (status === "submitted") {
      const msg = validateRequired();
      if (msg) {
        toast.error(msg);
        return;
      }
    }

    // Payload theo schema partner_submissions (có created_by NOT NULL)
    const payload: any = {
      title: title?.trim() || null,
      type: type || null,
      deadline: deadline || null, // YYYY-MM-DD
      description: description?.trim() || null,
      short_description: shortDesc?.trim() || null,
      location: location?.trim() || null,
      status,
      created_by: user.id, // NOT NULL theo schema của bạn
      submitted_by: status === "submitted" ? user.id : null,
      partner_id: partnerId, // draft có thể null; submitted cần có (đã chặn ở trên)
    };

    // Mảng/json
    if (fields?.length) payload.fields = fields;
    if (levels?.length) payload.levels = levels;
    const tagArr = (tags || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (tagArr.length) payload.tags = tagArr;

    const { error } = await supabase.from("partner_submissions").insert(payload);

    if (error) {
      console.error(error);
      toast.error(error.message || "Lỗi tạo bài đăng.");
      return;
    }

    if (status === "draft") {
      toast.success("Đã lưu nháp.");
    } else {
      toast.success("Đã gửi duyệt. Admin sẽ xem xét trong thời gian sớm nhất.");
    }
    setTimeout(() => navigate("/dashboard/partner/submissions"), 700);
  };

  const onSaveDraft = async () => {
    setSavingDraft(true);
    try {
      await insertSubmission("draft");
    } finally {
      setSavingDraft(false);
    }
  };

  const onSubmitForReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await insertSubmission("submitted");
    } finally {
      setSubmitting(false);
    }
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

        <form onSubmit={onSubmitForReview}>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Điền đầy đủ thông tin để thu hút ứng viên</CardDescription>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">
                  Loại <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={type}
                  onValueChange={(v) => setType(v as OppType)}
                  required
                >
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

              {/* Fields */}
              <div className="space-y-2">
                <Label htmlFor="field">Ngành học</Label>
                <MultiSelectInput
                  value={fields}
                  onChange={setFields}
                  placeholder="Chọn hoặc nhập ngành học..."
                  suggestions={fieldSuggestions}
                />
              </div>

              {/* Levels */}
              <div className="space-y-2">
                <Label htmlFor="level">Bậc học</Label>
                <MultiSelectInput
                  value={levels}
                  onChange={setLevels}
                  placeholder="Chọn hoặc nhập bậc học..."
                  suggestions={levelSuggestions}
                />
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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">
                    Hạn nộp <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
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
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Hãy viết chi tiết để sinh viên hiểu rõ về cơ hội
                </p>
              </div>

              {/* External Link - Disabled */}
              <div className="space-y-2">
                <Label htmlFor="link" className="text-muted-foreground">
                  Link Blogspot/Website chính thức
                </Label>
                <Input
                  id="link"
                  type="url"
                  placeholder="Sẽ được thêm sau khi admin duyệt"
                  disabled
                  className="cursor-not-allowed opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                  Link này sẽ được admin thêm sau khi duyệt
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
                <Input
                  id="tags"
                  placeholder="VD: toàn phần, quốc tế, công nghệ"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={onSaveDraft} disabled={savingDraft}>
                  <Save className="mr-2 h-4 w-4" />
                  {savingDraft ? "Đang lưu..." : "Lưu nháp"}
                </Button>
                <Button type="submit" disabled={submitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {submitting ? "Đang gửi..." : "Gửi duyệt"}
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
                <span>Cơ hội của bạn sẽ được admin xem xét và duyệt.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Hãy cung cấp thông tin chính xác, đầy đủ để tăng tỷ lệ được duyệt.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Link Blogspot/Website sẽ được admin thêm sau khi duyệt.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SubmitOpportunity;
