import { useState } from "react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, SlidersHorizontal } from "lucide-react";

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
      title: "Cuộc thi Khởi nghiệp Quốc gia 2024",
      organization: "Bộ KH&CN",
      type: "contest" as const,
      deadline: "15/01/2025",
      location: "Hà Nội",
      tags: ["Startup", "Công nghệ", "500 triệu"],
      badge: "closing-soon" as const,
    },
    {
      id: "3",
      title: "Đại sứ Thương hiệu Coca-Cola 2025",
      organization: "Coca-Cola Việt Nam",
      type: "ambassador" as const,
      deadline: "20/12/2024",
      location: "Toàn quốc",
      tags: ["Marketing", "Bán thời gian", "5-10tr/tháng"],
      badge: "new" as const,
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
    {
      id: "5",
      title: "Học bổng VinUni Excellence 2025",
      organization: "VinUniversity",
      type: "scholarship" as const,
      deadline: "10/01/2025",
      location: "Hà Nội",
      tags: ["100%", "Đại học", "Ưu tú"],
      badge: "closing-soon" as const,
    },
    {
      id: "6",
      title: "Cuộc thi Lập trình ACM ICPC 2024",
      organization: "ACM",
      type: "contest" as const,
      deadline: "05/01/2025",
      location: "Online + Offline",
      tags: ["Lập trình", "Thuật toán", "Quốc tế"],
    },
  ];

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block text-sm font-semibold">Loại cơ hội</Label>
        <div className="space-y-2">
          {["Học bổng", "Cuộc thi", "Đại sứ", "Thực tập"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <label htmlFor={type} className="text-sm">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold">Ngành học</Label>
        <div className="space-y-2">
          {["CNTT", "Kinh tế", "Kỹ thuật", "Y khoa", "Khác"].map((field) => (
            <div key={field} className="flex items-center space-x-2">
              <Checkbox id={field} />
              <label htmlFor={field} className="text-sm">
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
              <Checkbox id={level} />
              <label htmlFor={level} className="text-sm">
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
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Khám phá cơ hội</h1>
          <p className="text-muted-foreground">
            Tìm kiếm và lưu các cơ hội phù hợp với bạn
          </p>
        </div>

        {/* Search and Sort */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
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
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="deadline">Sắp hết hạn</SelectItem>
                <SelectItem value="popular">Phổ biến</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Toggle */}
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
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-20 rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Bộ lọc</h3>
              <FilterSidebar />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              Tìm thấy {scholarships.length} cơ hội
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {scholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} {...scholarship} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Sau
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
