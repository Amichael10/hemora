import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FamilyMember {
  id: string;
  fullName: string;
  relationship: string | null;
  genotype: string | null;
  dateOfBirth: string | null;
  notes: string | null;
  parent1Id: string | null;
  parent2Id: string | null;
  isSelf: boolean;
}

const map = (r: any): FamilyMember => ({
  id: r.id,
  fullName: r.full_name,
  relationship: r.relationship,
  genotype: r.genotype,
  dateOfBirth: r.date_of_birth,
  notes: r.notes,
  parent1Id: r.parent1_id,
  parent2Id: r.parent2_id,
  isSelf: r.is_self,
});

export const useFamilyMembers = () =>
  useQuery({
    queryKey: ["family_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("family_members" as any)
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(map);
    },
  });

export const useCreateFamilyMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<FamilyMember>) => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { data: row, error } = await (supabase.from("family_members" as any) as any)
        .insert({
          user_id: u.user.id,
          full_name: data.fullName,
          relationship: data.relationship ?? null,
          genotype: data.genotype ?? null,
          date_of_birth: data.dateOfBirth ?? null,
          notes: data.notes ?? null,
          parent1_id: data.parent1Id ?? null,
          parent2_id: data.parent2Id ?? null,
          is_self: data.isSelf ?? false,
        })
        .select().single();
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["family_members"] });
      return map(row);
    },
  });
};

export const useUpdateFamilyMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<FamilyMember> }) => {
      const patch: any = {};
      if (data.fullName !== undefined) patch.full_name = data.fullName;
      if (data.relationship !== undefined) patch.relationship = data.relationship;
      if (data.genotype !== undefined) patch.genotype = data.genotype;
      if (data.dateOfBirth !== undefined) patch.date_of_birth = data.dateOfBirth;
      if (data.notes !== undefined) patch.notes = data.notes;
      if (data.parent1Id !== undefined) patch.parent1_id = data.parent1Id;
      if (data.parent2Id !== undefined) patch.parent2_id = data.parent2Id;
      const { data: row, error } = await (supabase.from("family_members" as any) as any)
        .update(patch).eq("id", id).select().single();
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["family_members"] });
      return map(row);
    },
  });
};

export const useDeleteFamilyMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from("family_members" as any) as any).delete().eq("id", id);
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["family_members"] });
    },
  });
};