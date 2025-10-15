import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface ScholarshipCardProps {
  id: string;
  title: string;
  organization: string;
  logo?: string;
  type: "scholarship" | "contest" | "ambassador" | "internship";
  deadline: string;
  location: string;
  tags: string[];
  badge?: "new" | "closing-soon" | "closed";
  isSaved?: boolean;
}

const typeLabels = {
  scholarship: "Học bổng",
  contest: "Cuộc thi",
  ambassador: "Đại sứ",
  internship: "Thực tập",
};

const badgeVariants = {
  new: { label: "Mới", variant: "default" as const },
  "closing-soon": { label: "Sắp hết hạn", variant: "destructive" as const },
  closed: { label: "Đã đóng", variant: "secondary" as const },
};

const ScholarshipCard = ({
  id,
  title,
  organization,
  logo,
  type,
  deadline,
  location,
  tags,
  badge,
  isSaved = false,
}: ScholarshipCardProps) => {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        {/* Header with Logo and Badge */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {logo ? (
              <img
                src={logo}
                alt={organization}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <span className="text-lg font-bold text-primary">
                  {organization.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">{organization}</p>
              <Badge variant="outline" className="mt-1 text-xs">
                {typeLabels[type]}
              </Badge>
            </div>
          </div>
          {badge && (
            <Badge variant={badgeVariants[badge].variant}>
              {badgeVariants[badge].label}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
          {title}
        </h3>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Hạn nộp: {deadline}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 border-t border-border p-4">
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          className="flex-1"
        >
          <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          {isSaved ? "Đã lưu" : "Lưu"}
        </Button>
        <Link to={`/opportunities/${id}`} className="flex-1">
          <Button size="sm" className="w-full" variant="secondary">
            Chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ScholarshipCard;
