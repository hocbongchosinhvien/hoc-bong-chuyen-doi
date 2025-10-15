import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ScholarshipCard from "@/components/scholarship/ScholarshipCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutDashboard,
  FileText,
  Heart,
  User,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const UserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { label: "Dashboard", path: "/dashboard/user", icon: LayoutDashboard },
    { label: "Hồ sơ đã nộp", path: "/dashboard/user/applications", icon: FileText },
    { label: "Danh sách đã lưu", path: "/my-list", icon: Heart },
    { label: "Hồ sơ cá nhân", path: "/dashboard/user/profile", icon: User },
  ];

  const scholarships = [
    {
      id: "1",
      title: "Học bổng Chính phủ Nhật Bản MEXT 2025",
      organization: "Chính phủ Nhật Bản",
      type: "scholarship" as const,
      deadline: "31/12/2024",
      location: "Nhật Bản",
      tags: ["Toàn phần", "Thạc sĩ", "Tiến sĩ"],
      badge: "new" as const,
    },
    {
      id: "2",
      title: "Học bổng VinUni Excellence 2025",
      organization: "VinUniversity",
      type: "scholarship" as const,
      deadline: "10/01/2025",
      location: "Hà Nội",
      tags: ["100%", "Đại học", "Ưu tú"],
      badge: "closing-soon" as const,
    },
    {
      id: "3",
      title: "Cuộc thi Khởi nghiệp Quốc gia 2024",
      organization: "Bộ KH&CN",
      type: "contest" as const,
      deadline: "15/01/2025",
      location: "Hà Nội",
      tags: ["Startup", "Công nghệ", "500 triệu"],
      badge: "closing-soon" as const,
    },
    {
      id: "4",
      title: "Thực tập sinh Data Science",
      organization: "FPT Software",
      type: "internship" as const,
      deadline: "28/12/2024",
      location: "Hà Nội, HCM",
      tags: ["AI/ML", "Python", "6 tháng"],
    },
  ];

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block text-sm font-semibold">Loại cơ hội</Label>
        <div className="space-y-2">
          {["Học bổng", "Cuộc thi", "Đại sứ", "Thực tập"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`sidebar-${type}`} />
              <label htmlFor={`sidebar-${type}`} className="text-sm">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold">Ngành học</Label>
        <div className="space-y-2">
          {["CNTT", "Kinh tế", "Kỹ thuật", "Y khoa"].map((field) => (
            <div key={field} className="flex items-center space-x-2">
              <Checkbox id={`sidebar-${field}`} />
              <label htmlFor={`sidebar-${field}`} className="text-sm">
                {field}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold">Khu vực</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Chọn khu vực" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hn">Hà Nội</SelectItem>
            <SelectItem value="hcm">TP.HCM</SelectItem>
            <SelectItem value="dn">Đà Nẵng</SelectItem>
            <SelectItem value="other">Khác</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold">Bậc học</Label>
        <div className="space-y-2">
          {["Đại học", "Thạc sĩ", "Tiến sĩ"].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox id={`sidebar-${level}`} />
              <label htmlFor={`sidebar-${level}`} className="text-sm">
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full" variant="outline">
        Xóa bộ lọc
      </Button>
    </div>
  );

  return (
    <DashboardLayout menuItems={menuItems} role="user">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Tìm kiếm và khám phá các cơ hội phù hợp
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-sm text-muted-foreground">Cơ hội đã lưu</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">5</div>
              <p className="text-sm text-muted-foreground">Hồ sơ đã nộp</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-sm text-muted-foreground">Deadline sắp tới</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, tổ chức..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="deadline">Sắp hết hạn</SelectItem>
                <SelectItem value="popular">Phổ biến</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Bộ lọc</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden w-64 shrink-0 md:block">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Bộ lọc</h3>
                <FilterSidebar />
              </CardContent>
            </Card>
          </aside>

          {/* Scholarship Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              Tìm thấy {scholarships.length} cơ hội
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {scholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} {...scholarship} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
