import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  MapPin,
  Building2,
  Heart,
  Bell,
  ExternalLink,
  Users,
  DollarSign,
  GraduationCap,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ScholarshipCard from "@/components/scholarship/ScholarshipCard";

const OpportunityDetail = () => {
  const { id } = useParams();

  // Mock data
  const opportunity = {
    id: "1",
    title: "Học bổng Chính phủ Nhật Bản MEXT 2025",
    organization: "Chính phủ Nhật Bản",
    type: "scholarship" as const,
    deadline: "31/12/2024",
    location: "Nhật Bản",
    tags: ["Toàn phần", "Thạc sĩ", "Tiến sĩ"],
    badge: "new" as const,
    description:
      "Học bổng MEXT là chương trình học bổng toàn phần của Chính phủ Nhật Bản dành cho sinh viên quốc tế theo học chương trình Thạc sĩ và Tiến sĩ tại các trường đại học Nhật Bản.",
    eligibility: "Sinh viên đã tốt nghiệp đại học, có thành tích học tập tốt",
    benefits: "Học phí toàn phần, chi phí sinh hoạt 147,000 - 148,000 yên/tháng, vé máy bay",
    process: "Nộp hồ sơ qua Đại sứ quán → Thi tuyển → Phỏng vấn → Nhận kết quả",
    blogUrl: "https://example.com/mext-scholarship-2025",
  };

  const checklist = [
    "Bằng tốt nghiệp và bảng điểm đại học (có dịch công chứng)",
    "CV và thư động lực bằng tiếng Anh/Nhật",
    "2 thư giới thiệu từ giảng viên",
    "Bản sao hộ chiếu",
    "Giấy khám sức khỏe",
    "Chứng chỉ tiếng Anh (IELTS/TOEFL) hoặc tiếng Nhật (JLPT)",
  ];

  const similarOpportunities = [
    {
      id: "2",
      title: "Học bổng Chính phủ Hàn Quốc GKS 2025",
      organization: "Chính phủ Hàn Quốc",
      type: "scholarship" as const,
      deadline: "15/01/2025",
      location: "Hàn Quốc",
      tags: ["Toàn phần", "Thạc sĩ", "Tiến sĩ"],
    },
    {
      id: "3",
      title: "Học bổng Chính phủ Australia AAS",
      organization: "Chính phủ Australia",
      type: "scholarship" as const,
      deadline: "20/01/2025",
      location: "Australia",
      tags: ["Toàn phần", "Thạc sĩ"],
      badge: "new" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span>/</span>
          <Link to="/opportunities" className="hover:text-primary">
            Cơ hội
          </Link>
          <span>/</span>
          <span className="text-foreground">Chi tiết</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                      <span className="text-2xl font-bold text-primary">
                        {opportunity.organization.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {opportunity.organization}
                      </p>
                      <Badge variant="outline" className="mt-1">
                        Học bổng
                      </Badge>
                    </div>
                  </div>
                  {opportunity.badge && (
                    <Badge variant="default">Mới</Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="mb-6 text-3xl font-bold">{opportunity.title}</h1>

                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {opportunity.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Summary Section */}
                <div className="mb-8 space-y-4 rounded-lg border border-border bg-muted/30 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="mb-1 text-sm font-semibold">Hạn nộp</p>
                        <p className="text-sm text-muted-foreground">
                          {opportunity.deadline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="mb-1 text-sm font-semibold">Địa điểm</p>
                        <p className="text-sm text-muted-foreground">
                          {opportunity.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="mb-1 text-sm font-semibold">Đối tượng</p>
                        <p className="text-sm text-muted-foreground">
                          {opportunity.eligibility}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <DollarSign className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="mb-1 text-sm font-semibold">Quyền lợi</p>
                        <p className="text-sm text-muted-foreground">
                          {opportunity.benefits}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 md:col-span-2">
                      <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="mb-1 text-sm font-semibold">Quy trình</p>
                        <p className="text-sm text-muted-foreground">
                          {opportunity.process}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <a
                      href={opportunity.blogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      Xem chi tiết đầy đủ tại Blogspot
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-semibold">Giới thiệu</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {opportunity.description}
                  </p>
                </div>

                {/* Checklist */}
                <div>
                  <h2 className="mb-4 text-xl font-semibold">
                    Chuẩn bị hồ sơ
                  </h2>
                  <div className="space-y-3 rounded-lg border border-border p-6">
                    {checklist.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Checkbox id={`checklist-${index}`} />
                        <label
                          htmlFor={`checklist-${index}`}
                          className="cursor-pointer text-sm leading-relaxed"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Opportunities */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold">Cơ hội tương tự</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {similarOpportunities.map((opp) => (
                  <ScholarshipCard key={opp.id} {...opp} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Action Buttons */}
              <Card>
                <CardContent className="space-y-3 p-6">
                  <Button className="w-full" size="lg">
                    <Heart className="mr-2 h-5 w-5" />
                    Lưu vào danh sách
                  </Button>
                  <Button className="w-full" variant="outline" size="lg">
                    <Bell className="mr-2 h-5 w-5" />
                    Đặt nhắc hạn
                  </Button>
                  <Link to="/apply/1">
                    <Button
                      className="w-full"
                      variant="secondary"
                      size="lg"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Bắt đầu nộp hồ sơ
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Organization Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-semibold">
                        {opportunity.organization}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Tổ chức uy tín
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
