import { supabase } from "@/lib/supabaseClient";

export type SubmissionPayload = {
  id?: string;
  partner_id?: string | null;
  title: string;
  type: string;
  deadline?: string | null;           // 'YYYY-MM-DD'
  fields?: string[];
  levels?: string[];
  short_description?: string;
  description_html?: string;
  source_link?: string;
};

export async function saveDraft(payload: SubmissionPayload) {
  // upsert: nếu có id thì update; chưa có thì insert
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Chưa đăng nhập");

  const row: any = {
    ...payload,
    created_by: user.id,
    status: "draft",
  };
  if (!payload.id) delete row.id;

  const { data, error } = await supabase
    .from("partner_submissions")
    .upsert(row)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function submitForReview(id: string) {
  const { data, error } = await supabase
    .from("partner_submissions")
    .update({ status: "submitted", submitted_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function listMySubmissions() {
  const { data, error } = await supabase
    .from("partner_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function listSubmittedForAdmin() {
  const { data, error } = await supabase
    .from("partner_submissions")
    .select("*")
    .eq("status", "submitted")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function adminApprove(id: string, reviewNotes?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("partner_submissions")
    .update({
      status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: user?.id ?? null,
      review_notes: reviewNotes ?? null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminReject(id: string, reviewNotes?: string) {
  const { data, error } = await supabase
    .from("partner_submissions")
    .update({
      status: "rejected",
      rejected_at: new Date().toISOString(),
      review_notes: reviewNotes ?? null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
