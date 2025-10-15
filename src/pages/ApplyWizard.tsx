import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle, Download, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ApplyWizard = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Kiểm tra điều kiện" },
    { number: 2, title: "Checklist hồ sơ" },
    { number: 3, title: "Nhắc hạn" },
    { number: 4, title: "Xác nhận" },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/opportunities/${id}`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại chi tiết
          </Link>
          <h1 className="mb-2 text-3xl font-bold">Quy trình nộp hồ sơ</h1>
          <p className="text-muted-foreground">
            Học bổng Chính phủ Nhật Bản MEXT 2025
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="mb-4 h-2" />
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`text-center text-sm ${
                  currentStep >= step.number
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`mb-1 flex h-8 w-8 items-center justify-center rounded-full border-2 mx-auto ${
                    currentStep >= step.number
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="hidden md:block">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6 md:p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">
                    Kiểm tra điều kiện
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    Trả lời các câu hỏi sau để xác định mức độ phù hợp của bạn
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      Bạn đã tốt nghiệp đại học chưa?
                    </Label>
                    <RadioGroup defaultValue="yes">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="grad-yes" />
                        <Label htmlFor="grad-yes">Đã tốt nghiệp</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="grad-no" />
                        <Label htmlFor="grad-no">Chưa tốt nghiệp</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      GPA của bạn là bao nhiêu?
                    </Label>
                    <RadioGroup defaultValue="3.5">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3.5" id="gpa-high" />
                        <Label htmlFor="gpa-high">Trên 3.5/4.0</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3.0" id="gpa-mid" />
                        <Label htmlFor="gpa-mid">3.0 - 3.5/4.0</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="below" id="gpa-low" />
                        <Label htmlFor="gpa-low">Dưới 3.0/4.0</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      Bạn có chứng chỉ tiếng Anh/Nhật không?
                    </Label>
                    <RadioGroup defaultValue="yes">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="cert-yes" />
                        <Label htmlFor="cert-yes">Có (IELTS, TOEFL, JLPT...)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="cert-no" />
                        <Label htmlFor="cert-no">Chưa có</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Mức độ phù hợp</span>
                    </div>
                    <div className="mb-2">
                      <Progress value={85} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Bạn phù hợp <strong className="text-primary">85%</strong> với
                      yêu cầu của học bổng này
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">
                    Checklist hồ sơ
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    Đánh dấu các tài liệu bạn đã chuẩn bị
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "Bằng tốt nghiệp và bảng điểm đại học (có dịch công chứng)",
                    "CV và thư động lực bằng tiếng Anh/Nhật",
                    "2 thư giới thiệu từ giảng viên",
                    "Bản sao hộ chiếu",
                    "Giấy khám sức khỏe",
                    "Chứng chỉ tiếng Anh (IELTS/TOEFL) hoặc tiếng Nhật (JLPT)",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                    >
                      <Checkbox id={`doc-${index}`} />
                      <label
                        htmlFor={`doc-${index}`}
                        className="flex-1 cursor-pointer leading-relaxed"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Mẹo:</strong> Chuẩn bị tài liệu sớm để có thời gian
                    kiểm tra và chỉnh sửa nếu cần
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Nhắc hạn</h2>
                  <p className="mb-6 text-muted-foreground">
                    Chọn thời gian nhận nhắc nhở trước deadline
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reminder">Nhắc trước deadline</Label>
                    <Select defaultValue="3">
                      <SelectTrigger id="reminder">
                        <SelectValue placeholder="Chọn thời gian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 ngày</SelectItem>
                        <SelectItem value="3">3 ngày</SelectItem>
                        <SelectItem value="7">7 ngày</SelectItem>
                        <SelectItem value="14">14 ngày</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg border border-border p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <Download className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Tải lịch nhắc nhở</span>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Tải file .ics để thêm vào Google Calendar, Outlook hoặc
                      ứng dụng lịch khác
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Tạo tệp .ics
                    </Button>
                  </div>

                  <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-reminder" defaultChecked />
                      <Label htmlFor="email-reminder">
                        Gửi nhắc nhở qua email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push-reminder" />
                      <Label htmlFor="push-reminder">
                        Nhận thông báo trên trình duyệt
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">
                    Xác nhận và nộp hồ sơ
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    Xem lại thông tin trước khi nộp
                  </p>
                </div>

                <div className="space-y-4 rounded-lg border border-border p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Học bổng Chính phủ Nhật Bản MEXT 2025
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Chính phủ Nhật Bản
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 border-t border-border pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline</span>
                      <span className="font-medium">31/12/2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Mức độ phù hợp
                      </span>
                      <span className="font-medium text-primary">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Tài liệu đã chuẩn bị
                      </span>
                      <span className="font-medium">6/6 tài liệu</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Nhắc hạn
                      </span>
                      <span className="font-medium">3 ngày trước</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Bước tiếp theo</span>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Sau khi xác nhận, bạn sẽ được chuyển đến trang Blogspot chính
                    thức để nộp hồ sơ trực tuyến.
                  </p>
                  <a
                    href="https://example.com/apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="w-full" size="lg">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Mở link nộp hồ sơ
                    </Button>
                  </a>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  Lưu ý: HBCSV không lưu trữ thông tin hồ sơ của bạn. Vui lòng
                  nộp trực tiếp tại trang chính thức.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex justify-between border-t border-border pt-6">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Button>
              {currentStep < totalSteps ? (
                <Button onClick={handleNext}>
                  Tiếp theo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Link to="/my-list">
                  <Button variant="secondary">Hoàn thành</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyWizard;
