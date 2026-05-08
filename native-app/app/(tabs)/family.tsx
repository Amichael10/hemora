import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, ActivityIndicator, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Users, UserPlus, Heart, Info, ChevronRight, Trash2, ShieldCheck, Activity } from "lucide-react-native";
import { useState, useEffect, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

const RELATIONSHIPS = ["Partner", "Child", "Mother", "Father", "Sibling", "Grandparent"];
const GENOTYPES = ["AA", "AS", "SS", "SC", "CC", "AC"];

type FamilyMember = {
  id: string;
  full_name: string;
  relationship: string;
  genotype: string;
  is_self: boolean;
  date_of_birth: string | null;
};

export default function FamilyScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("tree");
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Add Form State
  const [newName, setNewName] = useState("");
  const [newRel, setNewRel] = useState("Child");
  const [newGen, setNewGen] = useState("AS");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFamily();
    }
  }, [user]);

  const fetchFamily = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("family_members")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (e) {
      Alert.alert("Error", "Could not load family circle.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!newName.trim()) {
      Alert.alert("Missing Info", "Please enter a name.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("family_members")
        .insert({
          user_id: user?.id,
          full_name: newName.trim(),
          relationship: newRel,
          genotype: newGen,
          is_self: false
        });

      if (error) throw error;

      Alert.alert("Success", "Family member added.");
      setAddModalVisible(false);
      setNewName("");
      fetchFamily();
    } catch (e) {
      Alert.alert("Error", "Could not add family member.");
    } finally {
      setSubmitting(false);
    }
  };

  const self = useMemo(() => members.find(m => m.is_self), [members]);
  const partner = useMemo(() => members.find(m => m.relationship === "Partner"), [members]);
  const children = useMemo(() => members.filter(m => m.relationship === "Child"), [members]);

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-6 pt-16 pb-6">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Kindred Sync</Text>
            <Text className="text-3xl font-serif text-secondary">Family Circle</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setAddModalVisible(true)}
            className="w-12 h-12 bg-card rounded-full items-center justify-center border border-muted shadow-sm"
          >
            <UserPlus size={22} color="#a8324a" />
          </TouchableOpacity>
        </View>

        {/* Tab Switcher */}
        <View className="bg-card p-1.5 rounded-2xl border border-muted flex-row">
          <TouchableOpacity 
            onPress={() => setActiveTab("tree")}
            className={`flex-1 py-3 rounded-[14px] items-center ${activeTab === 'tree' ? 'bg-secondary shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-xs uppercase tracking-wider ${activeTab === 'tree' ? 'text-white' : 'text-muted-foreground'}`}>Family Tree</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab("risk")}
            className={`flex-1 py-3 rounded-[14px] items-center ${activeTab === 'risk' ? 'bg-secondary shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-xs uppercase tracking-wider ${activeTab === 'risk' ? 'text-white' : 'text-muted-foreground'}`}>Risk Checker</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {loading ? (
          <View className="py-20">
            <ActivityIndicator size="large" color="#a8324a" />
          </View>
        ) : activeTab === "tree" ? (
          <View className="gap-6">
            {/* Visual Tree Section */}
            <View className="bg-secondary/5 rounded-[40px] p-8 items-center border border-secondary/10">
              <View className="items-center gap-4">
                {/* Parents Row */}
                <View className="flex-row gap-6 items-center">
                  <TreeNode name={self?.full_name || "Self"} role="Self" genotype={self?.genotype || "??"} isSelf />
                  <Heart size={20} color="#c9a35a" fill="#c9a35a" />
                  <TreeNode 
                    name={partner?.full_name || "Partner"} 
                    role="Partner" 
                    genotype={partner?.genotype || "??"} 
                  />
                </View>
                
                {/* Connection Line */}
                <View className="w-px h-8 bg-muted" />
                
                {/* Children Row */}
                <View className="flex-row gap-4 flex-wrap justify-center">
                  {children.length > 0 ? (
                    children.map(child => (
                      <TreeNode key={child.id} name={child.full_name} role="Child" genotype={child.genotype} />
                    ))
                  ) : (
                    <Text className="text-muted-foreground text-[10px] uppercase font-bold">No children added</Text>
                  )}
                </View>
              </View>
            </View>

            {/* Members List */}
            <View>
              <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-4 ml-2">Family Members</Text>
              {members.length > 0 ? (
                members.map(member => (
                  <MemberCard key={member.id} member={member} />
                ))
              ) : (
                <View className="py-10 items-center bg-card rounded-3xl border border-muted border-dashed">
                  <Text className="text-muted-foreground font-medium">Add members to see them here.</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View className="gap-6">
            <LinearGradient
              colors={["#a8324a", "#8a293d"]}
              className="rounded-[32px] p-8 shadow-xl shadow-primary/20"
            >
              <View className="w-12 h-12 bg-white/20 rounded-2xl items-center justify-center mb-6">
                <ShieldCheck size={24} color="#fff" />
              </View>
              <Text className="text-white text-2xl font-serif mb-2">Genotype Insight</Text>
              <Text className="text-white/80 text-sm leading-5">Understand the genetic probability for future generations based on family genotypes.</Text>
            </LinearGradient>

            <View className="bg-card rounded-[32px] p-6 border border-muted shadow-sm">
              <Text className="text-secondary font-bold text-xs uppercase tracking-widest mb-6">Active Pair</Text>
              
              <View className="flex-row gap-4 mb-8">
                <View className="flex-1">
                  <Text className="text-muted-foreground text-[10px] font-bold uppercase mb-2">Self</Text>
                  <View className="bg-background h-14 rounded-2xl border border-muted px-4 justify-center">
                    <Text className="text-secondary font-bold">{self?.full_name || "User"} ({self?.genotype || "??"})</Text>
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-muted-foreground text-[10px] font-bold uppercase mb-2">Partner</Text>
                  <View className="bg-background h-14 rounded-2xl border border-muted px-4 justify-center">
                    <Text className="text-secondary font-bold">{partner?.full_name || "Partner"} ({partner?.genotype || "??"})</Text>
                  </View>
                </View>
              </View>

              {self && partner ? (
                <>
                  <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-4">Probability Analysis</Text>
                  <View className="flex-row gap-2">
                    <Text className="text-muted-foreground text-xs italic">Inheritance insights coming soon based on {self.genotype} + {partner.genotype}</Text>
                  </View>
                </>
              ) : (
                <Text className="text-muted-foreground text-xs italic">Add a partner and set genotypes to see insights.</Text>
              )}
            </View>

            <View className="bg-accent/5 rounded-3xl p-6 border border-accent/20 flex-row gap-4 items-center">
              <Info size={24} color="#c9a35a" />
              <Text className="flex-1 text-secondary text-xs leading-5">These results are based on Mendelian inheritance patterns. Always consult a genetic counsellor for clinical decisions.</Text>
            </View>
          </View>
        )}
        
        <View className="h-24" />
      </ScrollView>

      {/* Add Member Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background rounded-t-[40px] p-8 min-h-[70%]">
            <View className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-8" />
            
            <Text className="text-2xl font-serif text-secondary mb-2">Add to Circle</Text>
            <Text className="text-muted-foreground mb-8">Connect a family member to your health profile for synchronized insights.</Text>
            
            <View className="space-y-6 mb-10">
              <View>
                <Text className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 ml-1">Full Name</Text>
                <TextInput 
                  placeholder="e.g. Leo Scott" 
                  className="bg-card h-14 rounded-2xl px-4 border border-muted"
                  value={newName}
                  onChangeText={setNewName}
                />
              </View>
              <View>
                <Text className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 ml-1">Relationship</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                  {RELATIONSHIPS.map(rel => (
                    <TouchableOpacity 
                      key={rel} 
                      onPress={() => setNewRel(rel)}
                      className={`px-6 py-3 rounded-2xl mr-2 border ${newRel === rel ? 'bg-secondary border-secondary' : 'bg-card border-muted'}`}
                    >
                      <Text className={`font-bold text-[10px] uppercase ${newRel === rel ? 'text-white' : 'text-muted-foreground'}`}>{rel}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View>
                <Text className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 ml-1">Genotype</Text>
                <View className="flex-row flex-wrap gap-2">
                  {GENOTYPES.map(gen => (
                    <TouchableOpacity 
                      key={gen} 
                      onPress={() => setNewGen(gen)}
                      className={`w-14 h-14 rounded-2xl items-center justify-center border ${newGen === gen ? 'bg-secondary border-secondary' : 'bg-card border-muted'}`}
                    >
                      <Text className={`font-bold ${newGen === gen ? 'text-white' : 'text-secondary'}`}>{gen}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleAddMember}
              disabled={submitting}
              className={`bg-primary py-5 rounded-2xl items-center shadow-lg shadow-primary/30 ${submitting ? 'opacity-70' : ''}`}
            >
              <Text className="text-white font-bold text-lg">{submitting ? "Adding..." : "Add Family Member"}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setAddModalVisible(false)}
              className="mt-4 py-4 items-center"
            >
              <Text className="text-muted-foreground font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function TreeNode({ name, role, genotype, isSelf }: { name: string, role: string, genotype: string, isSelf?: boolean }) {
  return (
    <View className={`p-4 rounded-3xl items-center min-w-[100px] border ${isSelf ? 'bg-secondary border-secondary shadow-md' : 'bg-card border-muted'}`}>
      <Text className={`font-bold text-sm ${isSelf ? 'text-white' : 'text-secondary'}`}>{name}</Text>
      <Text className={`text-[10px] uppercase tracking-tighter ${isSelf ? 'text-white/60' : 'text-muted-foreground'}`}>{role}</Text>
      <View className={`mt-2 px-2 py-0.5 rounded-md ${isSelf ? 'bg-white/20' : 'bg-primary/10'}`}>
        <Text className={`text-[10px] font-bold ${isSelf ? 'text-white' : 'text-primary'}`}>{genotype}</Text>
      </View>
    </View>
  );
}

function MemberCard({ member }: { member: FamilyMember }) {
  return (
    <View className="bg-card p-5 rounded-[28px] border border-muted shadow-sm flex-row items-center justify-between mb-3">
      <View className="flex-row items-center gap-4">
        <View className="w-12 h-12 bg-secondary/10 rounded-2xl items-center justify-center">
          <Users size={24} color="#1f3c3d" />
        </View>
        <View>
          <Text className="text-base font-bold text-secondary">{member.full_name}</Text>
          <Text className="text-muted-foreground text-xs">{member.relationship}</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="bg-primary/10 px-3 py-1 rounded-lg">
          <Text className="text-primary font-bold text-xs">{member.genotype}</Text>
        </View>
        <TouchableOpacity>
          <ChevronRight size={20} color="#667f81" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
