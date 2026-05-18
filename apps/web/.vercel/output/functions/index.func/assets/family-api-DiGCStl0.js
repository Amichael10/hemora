import { Y as useMutation, Z as useQuery, J as supabase } from "./AppRouter-yFV4k-aY.js";
import { u as useQueryClient } from "./router-BY6ex80A.js";
const map = (r) => ({
  id: r.id,
  fullName: r.full_name,
  relationship: r.relationship,
  genotype: r.genotype,
  dateOfBirth: r.date_of_birth,
  notes: r.notes,
  parent1Id: r.parent1_id,
  parent2Id: r.parent2_id,
  isSelf: r.is_self
});
const useFamilyMembers = () => useQuery({
  queryKey: ["family_members"],
  queryFn: async () => {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return [];
    const { data, error } = await supabase.from("family_members").select("*").eq("user_id", u.user.id).order("is_self", { ascending: false }).order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []).map(map);
  }
});
const useCreateFamilyMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { data: row, error } = await supabase.from("family_members").insert({
        user_id: u.user.id,
        full_name: data.fullName,
        relationship: data.relationship ?? null,
        genotype: data.genotype ?? null,
        date_of_birth: data.dateOfBirth ?? null,
        notes: data.notes ?? null,
        parent1_id: data.parent1Id ?? null,
        parent2_id: data.parent2Id ?? null,
        is_self: data.isSelf ?? false
      }).select().single();
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["family_members"] });
      return map(row);
    }
  });
};
const useDeleteFamilyMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("family_members").delete().eq("id", id);
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["family_members"] });
    }
  });
};
export {
  useFamilyMembers as a,
  useDeleteFamilyMember as b,
  useCreateFamilyMember as u
};
