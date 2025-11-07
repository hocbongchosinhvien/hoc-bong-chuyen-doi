// src/pages/MyList.tsx
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell, Heart, Check, Pencil, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function MyList() {
  const [items, setItems] = useState([
    {
      id: "1",
      title: "Học bổng Chính phủ Nhật Bản MEXT 2025",
      organization: "Chính phủ Nhật Bản",
      deadline: "2024-12-31",
      location: "Nhật Bản",
      checklist: [
        { label: "Đọc yêu cầu", done: false },
        { label: "Viết essay", done: false },
        { label: "Chuẩn bị giấy tờ", done: false },
        { label: "Nộp hồ sơ", done: false },
      ],
      note: "",
      reminderSet: false
    },
    {
      id: "2",
      title: "Học bổng VinUni Excellence 2025",
      organization: "VinUniversity",
      deadline: "2025-01-10",
      location: "Hà Nội",
      checklist: [
        { label: "Đọc yêu cầu", done: true },
        { label: "Viết essay", done: false },
        { label: "Chuẩn bị giấy tờ", done: false },
        { label: "Nộp hồ sơ", done: false },
      ],
      note: "Essay nên nhấn mạnh về leadership.",
      reminderSet: true
    }
  ]);
  // Chọn note để edit
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");

  const handleToggleChecklist = (schId, idx) => {
    setItems(items =>
      items.map(item =>
        item.id === schId
          ? {
              ...item,
              checklist: item.checklist.map((step, i) =>
                i === idx ? { ...step, done: !step.done } : step
              )
            }
          : item
      )
    );
  };

  const handleEditNote = schId => {
    setEditingNoteId(schId);
    const item = items.find(item => item.id === schId);
    setNoteDraft(item?.note ?? "");
  };

  const handleSaveNote = schId => {
    setItems(items =>
      items.map(item =>
        item.id === schId ? { ...item, note: noteDraft } : item
      )
    );
    setEditingNoteId(null);
    setNoteDraft("");
  };

  const handleToggleReminder = schId => {
    setItems(items =>
      items.map(item =>
        item.id === schId ? { ...item, reminderSet: !item.reminderSet } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-3xl font-bold">Scholarship Planner</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{item.title}</CardTitle>
                  <div>
                    <Badge variant="outline">{item.organization}</Badge>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Deadline: {item.deadline}
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" />
                    <Button
                      size="icon"
                      variant={item.reminderSet ? "default" : "outline"}
                      onClick={() => handleToggleReminder(item.id)}
                    >
                      {item.reminderSet ? <Check className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Checklist */}
                <div>
                  <div className="font-semibold mb-2">Checklist chuẩn bị</div>
                  <ul>
                    {item.checklist.map((step, idx) => (
                      <li key={idx} className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={step.done}
                          onChange={() => handleToggleChecklist(item.id, idx)}
                          className="accent-primary h-4 w-4"
                        />
                        <span className={step.done ? "line-through text-muted-foreground" : ""}>
                          {step.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Notes */}
                <div className="mt-4">
                  <div className="font-semibold mb-2 flex items-center justify-between">
                    <span>Ghi chú</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditNote(item.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  {editingNoteId === item.id ? (
                    <div>
                      <Textarea
                        value={noteDraft}
                        onChange={e => setNoteDraft(e.target.value)}
                        rows={3}
                        className="resize-none"
                        placeholder="Ghi lại điểm quan trọng hoặc mẹo chuẩn bị hồ sơ..."
                      />
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" onClick={() => handleSaveNote(item.id)}>
                          Lưu
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingNoteId(null)}
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted rounded p-2 min-h-[38px] text-sm">
                      {item.note ? (
                        <span>{item.note}</span>
                      ) : (
                        <span className="text-muted-foreground">Chưa có ghi chú</span>
                      )}
                    </div>
                  )}
                </div>
                {/* Remove Option */}
                <div className="mt-6 flex justify-end">
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
