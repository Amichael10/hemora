import type { SupabaseClient } from "@supabase/supabase-js";

import { formatShortDateNoYear } from "@/lib/datetime";

export type CareRecordListItem = {
  id: string;
  type: "visit" | "lab" | "doc";
  title: string;
  hospital: string;
  date: string;
  status: string;
};

function mapUiType(dbType: string, fileUrl: string | null): "visit" | "lab" | "doc" {
  const t = (dbType || "").toLowerCase();
  if (t === "visit") return "visit";
  if (t === "lab") return "lab";
  if (t === "imaging" || t === "other" || (fileUrl && fileUrl.length > 0)) return "doc";
  return "doc";
}

type CareRow = {
  id: string;
  type: string;
  status: string;
  title: string;
  hospital_clinic: string | null;
  record_date: string | null;
  date_of_record: string | null;
  created_at: string;
  file_url: string | null;
};

export async function fetchCareRecords(supabase: SupabaseClient, userId: string): Promise<CareRecordListItem[]> {
  const { data, error } = await supabase
    .from("care_records")
    .select("id,type,status,title,hospital_clinic,record_date,date_of_record,created_at,file_url")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((r: CareRow) => {
    const iso = r.record_date || r.date_of_record || r.created_at;
    return {
      id: r.id,
      type: mapUiType(r.type, r.file_url),
      title: r.title?.trim() || "Untitled",
      hospital: r.hospital_clinic?.trim() || "—",
      date: formatShortDateNoYear(iso),
      status: r.status || "saved",
    };
  });
}
