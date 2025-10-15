import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScholarshipCard from "@/components/scholarship/ScholarshipCard";
import { Search, Award, Trophy, Users, Briefcase } from "lucide-react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { value: "all", label: "Tất cả", icon: Award },
    { value: "scholarship", label: "Học bổng", icon: Award },
    { value: "contest", label: "Cuộc thi", icon: Trophy },
    { value: "ambassador", label: "Đại sứ", icon: Users },
    { value: "internship", label: "Thực tập", icon: Briefcase },
  ];

  // Sample data
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
      isSaved: false,
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
      isSaved: true,
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
      isSaved: false,
    },
    {
      id: "4",
      title: "Thực tập sinh Data Science",
      organization: "FPT Software",
      type: "internship" as const,
      deadline: "28/12/2024",
      location: "Hà Nội, HCM",
      tags: ["AI/ML", "Python", "6 tháng"],
      isSaved: false,
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
      isSaved: true,
    },
    {
      id: "6",
      title: "Cuộc thi Lập trình ACM ICPC 2024",
      organization: "ACM",
      type: "contest" as const,
      deadline: "05/01/2025",
      location: "Online + Offline",
      tags: ["Lập trình", "Thuật toán", "Quốc tế"],
      isSaved: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-20 text-primary-foreground">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Kết nối cơ hội,
              <br />
              Kiến tạo tương lai
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              Tìm kiếm học bổng, cuộc thi, vị trí đại sứ và thực tập phù hợp với
              bạn từ hàng trăm tổ chức uy tín
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/opportunities">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Tìm cơ hội ngay
                </Button>
              </Link>
              <Link to="/partners">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 sm:w-auto"
                >
                  Dành cho đối tác
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />
      </section>

      {/* Categories & Featured Opportunities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Cơ hội nổi bật</h2>
            <p className="text-muted-foreground">
              Khám phá các cơ hội mới nhất và phù hợp nhất với bạn
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 gap-2 bg-muted/50 p-1 lg:flex lg:justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.label.split(" ")[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {scholarships
                  .filter(
                    (s) => activeTab === "all" || s.type === activeTab
                  )
                  .map((scholarship) => (
                    <ScholarshipCard key={scholarship.id} {...scholarship} />
                  ))}
              </div>

              <div className="mt-10 text-center">
                <Link to="/opportunities">
                  <Button size="lg" variant="outline">
                    Xem tất cả cơ hội
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Partners Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">Đối tác của chúng tôi</h2>
            <p className="text-muted-foreground">
              Tin cậy bởi hàng trăm tổ chức uy tín
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-lg bg-background p-6 transition-all hover:shadow-md"
              >
                <div className="h-12 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Cơ hội</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">10,000+</div>
              <div className="text-muted-foreground">Sinh viên</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">200+</div>
              <div className="text-muted-foreground">Đối tác</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
