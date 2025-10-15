import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Bell, Calendar, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const MyList = () => {
  const savedOpportunities = [
    {
      id: "1",
      title: "Học bổng Chính phủ Nhật Bản MEXT 2025",
      organization: "Chính phủ Nhật Bản",
      type: "Học bổng",
      deadline: "31/12/2024",
      location: "Nhật Bản",
      badge: "new" as const,
      daysLeft: 15,
    },
    {
      id: "2",
      title: "Học bổng VinUni Excellence 2025",
      organization: "VinUniversity",
      type: "Học bổng",
      deadline: "10/01/2025",
      location: "Hà Nội",
      badge: "closing-soon" as const,
      daysLeft: 7,
    },
    {
      id: "3",
      title: "Đại sứ Thương hiệu Coca-Cola 2025",
      organization: "Coca-Cola Việt Nam",
      type: "Đại sứ",
      deadline: "20/12/2024",
      location: "Toàn quốc",
      badge: "new" as const,
      daysLeft: 10,
    },
  ];

  const upcomingDeadlines = savedOpportunities
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Danh sách đã lưu</h1>
          <p className="text-muted-foreground">
            Quản lý các cơ hội bạn quan tâm ({savedOpportunities.length} cơ hội)
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main List */}
          <div className="lg:col-span-2">
            {savedOpportunities.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">
                    Chưa có cơ hội nào được lưu
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Khám phá và lưu các cơ hội phù hợp với bạn
                  </p>
                  <Link to="/opportunities">
                    <Button>Khám phá cơ hội</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {savedOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Info */}
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {opportunity.type}
                            </Badge>
                            {opportunity.badge === "new" && (
                              <Badge variant="default">Mới</Badge>
                            )}
                            {opportunity.badge === "closing-soon" && (
                              <Badge variant="destructive">Sắp hết hạn</Badge>
                            )}
                          </div>

                          <Link to={`/opportunities/${opportunity.id}`}>
                            <h3 className="mb-2 text-lg font-semibold transition-colors hover:text-primary">
                              {opportunity.title}
                            </h3>
                          </Link>

                          <p className="mb-3 text-sm text-muted-foreground">
                            {opportunity.organization}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>Hạn: {opportunity.deadline}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>{opportunity.location}</span>
                            </div>
                          </div>

                          <div className="mt-2">
                            <span
                              className={`text-sm font-medium ${
                                opportunity.daysLeft <= 7
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                              }`}
                            >
                              Còn {opportunity.daysLeft} ngày
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 md:flex-col">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Bell className="mr-2 h-4 w-4" />
                            Nhắc hạn
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Bỏ lưu
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {savedOpportunities.length > 0 && (
              <div className="mt-8 text-center">
                <Link to="/apply/1">
                  <Button size="lg">Bắt đầu quy trình nộp hồ sơ</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar - Upcoming Deadlines */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Calendar className="h-5 w-5 text-primary" />
                    Deadline sắp tới
                  </h3>

                  {upcomingDeadlines.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Chưa có deadline nào
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {upcomingDeadlines.map((opp) => (
                        <div
                          key={opp.id}
                          className="rounded-lg border border-border p-4"
                        >
                          <Link to={`/opportunities/${opp.id}`}>
                            <h4 className="mb-2 line-clamp-2 text-sm font-semibold hover:text-primary">
                              {opp.title}
                            </h4>
                          </Link>
                          <p className="mb-2 text-xs text-muted-foreground">
                            {opp.deadline}
                          </p>
                          <div
                            className={`text-xs font-medium ${
                              opp.daysLeft <= 7
                                ? "text-destructive"
                                : "text-primary"
                            }`}
                          >
                            Còn {opp.daysLeft} ngày
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 rounded-lg bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Mẹo:</strong> Đặt nhắc hạn để không bỏ lỡ cơ hội
                      quan trọng!
                    </p>
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

export default MyList;
