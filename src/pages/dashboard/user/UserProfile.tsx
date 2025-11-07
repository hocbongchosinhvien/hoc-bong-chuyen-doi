import { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  LayoutDashboard,
  FileText,
  Heart,
  User,
  Upload,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type ProfileForm = {
  full_name: string;
  email: string;
  phone?: string;
  dob?: string; // yyyy-mm-dd
  university?: string;
  major?: string;
  bio?: string;
  avatar_url?: string;
};

const toYmd = (d?: string | Date | null) => {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toISOString().slice(0, 10);
};

const initialsFrom = (name?: string) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const UserProfile = () => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard/user", icon: LayoutDashboard },
    { label: "Hồ sơ đã nộp", path: "/dashboard/user/applications", icon: FileText },
    { label: "Danh sách đã lưu", path: "/my-list", icon: Heart },
    { label: "Hồ sơ cá nhân", path: "/dashboard/user/profile", icon: User },
  ];

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [pwNew, setPwNew] = useState("");
  const [pwNew2, setPwNew2] = useState("");

  const [form, setForm] = useState<ProfileForm>({
    full_name: "",
    email: "",
    phone: "",
    dob: "",
    university: "",
    major: "",
    bio: "",
    avatar_url: "",
  });

  // ===== Load profile: ưu tiên bảng user_profiles, thiếu thì fallback metadata
  useEffect(() => {
    (async () => {
      try {
        const { data: ures, error: uErr } = await supabase.auth.getUser();
        if (uErr) throw uErr;
        const user = ures.user;
        if (!user) {
          setLoading(false);
          return;
        }

        const meta: any = user.user_metadata || {};
        // base theo metadata trước:
        let next: ProfileForm = {
          full_name:
            meta.full_name ||
            meta.name ||
            [meta.given_name, meta.family_name].filter(Boolean).join(" ") ||
            "",
          email: user.email || "",
          phone: meta.phone || "",
          dob: toYmd(meta.dob) || "",
          university: meta.university || "",
          major: meta.major || "",
          bio: meta.bio || "",
          avatar_url: meta.avatar_url || meta.picture || "",
        };

        // đọc từ bảng user_profiles để override
        const { data: p, error: pErr } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!pErr && p) {
          next = {
            ...next,
            full_name: p.full_name ?? next.full_name,
            phone: p.phone ?? next.phone,
            dob: toYmd(p.dob) || next.dob,
            university: p.university ?? next.university,
            major: p.major ?? next.major,
            bio: p.bio ?? next.bio,
            avatar_url: p.avatar_url ?? next.avatar_url,
          };
        }

        setForm(next);
      } catch (e) {
        console.error("Load profile error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const initials = initialsFrom(form.full_name || form.email);

  // ===== Helpers
  const onChange =
    (key: keyof ProfileForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  // ===== Save profile (metadata + bảng SQL + email nếu đổi)
  const saveProfile = async () => {
    setSaving(true);
    try {
      const { data: { user }, error: uErr } = await supabase.auth.getUser();
      if (uErr) throw uErr;
      if (!user) throw new Error("Bạn chưa đăng nhập.");

      // 1) Cập nhật vào Auth.user_metadata (để Topbar, avatar... đọc nhanh) + email nếu đổi
      const metaUpdate: any = {
        full_name: form.full_name,
        phone: form.phone,
        dob: form.dob,          // yyyy-mm-dd
        university: form.university,
        major: form.major,
        bio: form.bio,
      };
      if (form.avatar_url?.trim()) metaUpdate.avatar_url = form.avatar_url.trim();

      const updatePayload: any = { data: metaUpdate };
      if (form.email && form.email !== user.email) {
        updatePayload.email = form.email; // sẽ yêu cầu xác minh email mới
      }

      const { error: mErr } = await supabase.auth.updateUser(updatePayload);
      if (mErr) throw mErr;

      // 2) Upsert vào bảng SQL public.user_profiles (để bạn thấy trong Tables)
      const row: any = {
        user_id: user.id,
        full_name: form.full_name?.trim() || null,
        phone: form.phone?.trim() || null,
        dob: form.dob ? toYmd(form.dob) : null,
        university: form.university?.trim() || null,
        major: form.major?.trim() || null,
        bio: form.bio?.trim() || null,
      };
      if (form.avatar_url?.trim()) row.avatar_url = form.avatar_url.trim();

      const { error: pErr } = await supabase
        .from("user_profiles")
        .upsert(row, { onConflict: "user_id" });
      if (pErr) throw pErr;

      // 3) Refetch user để UI cập nhật ngay
      await supabase.auth.getUser();

      alert("Đã lưu thay đổi hồ sơ.");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Lưu hồ sơ thất bại.");
    } finally {
      setSaving(false);
    }
  };



  const changePassword = async () => {
    if (pwNew.length < 6) return alert("Mật khẩu tối thiểu 6 ký tự.");
    if (pwNew !== pwNew2) return alert("Xác nhận mật khẩu không khớp.");
    setChangingPw(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pwNew });
      if (error) throw error;
      setPwNew("");
      setPwNew2("");
      alert("Đổi mật khẩu thành công.");
    } catch (e: any) {
      alert(e?.message || "Đổi mật khẩu thất bại.");
    } finally {
      setChangingPw(false);
    }
  };

  // ===== Upload avatar to Supabase Storage (bucket 'avatars')
  const onPickAvatar = () => fileInputRef.current?.click();

  const onAvatarSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview tạm (local)
    const localUrl = URL.createObjectURL(file);
    setForm((f) => ({ ...f, avatar_url: localUrl }));

    try {
      // Cần có bucket 'avatars' (Public hoặc Signed URL)
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (upErr) throw upErr;

      // Public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      // Cập nhật metadata ngay để topbar dùng được
      const { error: metaErr } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });
      if (metaErr) throw metaErr;

      setForm((f) => ({ ...f, avatar_url: publicUrl }));
      alert("Đã cập nhật ảnh đại diện.");
    } catch (e: any) {
      alert(e?.message || "Tải ảnh thất bại. Bạn đã tạo bucket 'avatars' chưa?");
    } finally {
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <DashboardLayout menuItems={menuItems} role="user">
        <div className="space-y-6">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-64 rounded-lg bg-muted animate-pulse" />
            <div className="lg:col-span-2 h-64 rounded-lg bg-muted animate-pulse" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menuItems={menuItems} role="user">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground">Quản lý thông tin và cài đặt tài khoản</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Avatar Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  {form.avatar_url?.trim() ? (
                    <AvatarImage src={form.avatar_url} alt={form.full_name} />
                  ) : (
                    <AvatarImage src="" />
                  )}
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-lg font-semibold">
                  {form.full_name || "Chưa có tên"}
                </h3>
                <p className="text-sm text-muted-foreground">{form.email}</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={onPickAvatar}>
                  <Upload className="mr-2 h-4 w-4" />
                  Thay đổi ảnh
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onAvatarSelected}
                />
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Cập nhật thông tin để nhận các cơ hội phù hợp</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Họ và tên</Label>
                    <Input id="fullname" value={form.full_name} onChange={onChange("full_name")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={onChange("email")} />
                    <p className="text-xs text-muted-foreground">
                      Đổi email có thể yêu cầu xác minh qua hộp thư mới.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" value={form.phone} onChange={onChange("phone")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Ngày sinh</Label>
                    <Input id="dob" type="date" value={form.dob} onChange={onChange("dob")} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="university">Trường học</Label>
                    <Input id="university" value={form.university} onChange={onChange("university")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Ngành học</Label>
                    <Input id="major" value={form.major} onChange={onChange("major")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Textarea
                    id="bio"
                    placeholder="Viết vài dòng về bản thân..."
                    rows={4}
                    value={form.bio}
                    onChange={onChange("bio")}
                  />
                </div>

                <Button className="w-full md:w-auto" onClick={saveProfile} disabled={saving}>
                  {saving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Đổi mật khẩu</CardTitle>
                <CardDescription>Đảm bảo tài khoản của bạn an toàn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={pwNew}
                    onChange={(e) => setPwNew(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={pwNew2}
                    onChange={(e) => setPwNew2(e.target.value)}
                  />
                </div>
                <Button className="w-full md:w-auto" onClick={changePassword} disabled={changingPw}>
                  {changingPw ? "Đang đổi..." : "Đổi mật khẩu"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài đặt thông báo</CardTitle>
                <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email nhắc deadline</Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận email nhắc nhở trước deadline
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cơ hội mới phù hợp</Label>
                    <p className="text-sm text-muted-foreground">
                      Thông báo khi có cơ hội phù hợp với bạn
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cập nhật từ hệ thống</Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận tin tức và cập nhật quan trọng
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
