import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Bell, Search, Activity, Pill, ShieldAlert, ChevronRight, TrendingUp, Calendar, User, Users, HeartPulse } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { formatDistanceToNow, format } from "date-fns";

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [lastCrisis, setLastCrisis] = useState<any>(null);
  const [nextMeds, setNextMeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();
      setProfile(profileData);

      // 2. Fetch Last Crisis
      const { data: crisisData } = await supabase
        .from("crisis_logs")
        .select("*")
        .eq("user_id", user?.id)
        .order("occurred_at", { ascending: false })
        .limit(1);
      setLastCrisis(crisisData?.[0]);

      // 3. Fetch Next Meds (today's schedule)
      const { data: medsData } = await supabase
        .from("medications")
        .select("*")
        .eq("user_id", user?.id)
        .eq("status", "ongoing")
        .limit(2);
      setNextMeds(medsData || []);

    } catch (e) {
      console.error("Dashboard data fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-6 pt-16 pb-6 flex-row items-center justify-between">
        <View>
          <Text className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Good morning</Text>
          <Text className="text-3xl font-serif text-secondary">{profile?.full_name?.split(' ')[0] || "Friend"}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push("/profile")}
          className="w-12 h-12 bg-card rounded-full items-center justify-center border border-muted shadow-sm"
        >
          <User size={22} color="#a8324a" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="py-20">
          <ActivityIndicator size="large" color="#a8324a" />
        </View>
      ) : (
        <>
          {/* Hero Card - Crisis Status */}
          <View className="px-6 mt-4">
            <LinearGradient
              colors={["#1f3c3d", "#132629"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-[32px] p-8 shadow-xl shadow-secondary/20 overflow-hidden relative"
            >
              <View className="flex-row justify-between items-start mb-8">
                <View className="w-14 h-14 bg-white/10 rounded-2xl items-center justify-center border border-white/10">
                  <ShieldAlert size={32} color="#c9a35a" />
                </View>
                <View className="bg-accent/20 px-4 py-1.5 rounded-full border border-accent/30">
                  <Text className="text-accent font-bold text-[10px] uppercase tracking-widest">
                    {lastCrisis ? "Managing" : "Steady"}
                  </Text>
                </View>
              </View>
              
              <Text className="text-white text-3xl font-serif mb-2 leading-tight">
                {lastCrisis ? "Checking in..." : "Feeling steady"}
              </Text>
              <Text className="text-white/70 text-base leading-6">
                {lastCrisis 
                  ? `Your last logged crisis was ${formatDistanceToNow(new Date(lastCrisis.occurred_at))} ago. Stay hydrated and rested.`
                  : "Everything looks good today. Remember to track any changes in your energy levels."}
              </Text>
              
              <TouchableOpacity 
                onPress={() => router.push("/crisis")}
                activeOpacity={0.9}
                className="mt-8 bg-primary py-4 rounded-2xl items-center shadow-lg shadow-primary/30"
              >
                <Text className="text-white font-bold text-base">Log a crisis</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Quick Stats */}
          <View className="px-6 mt-8 flex-row gap-4">
            <View className="flex-1 bg-card p-6 rounded-[28px] border border-muted shadow-sm">
              <View className="w-10 h-10 bg-accent/10 rounded-xl items-center justify-center mb-4">
                <TrendingUp size={20} color="#c9a35a" />
              </View>
              <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Genotype</Text>
              <Text className="text-2xl font-bold text-secondary">{profile?.genotype || "--"}</Text>
            </View>
            <View className="flex-1 bg-card p-6 rounded-[28px] border border-muted shadow-sm">
              <View className="w-10 h-10 bg-primary/10 rounded-xl items-center justify-center mb-4">
                <Activity size={20} color="#a8324a" />
              </View>
              <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Status</Text>
              <Text className="text-2xl font-bold text-secondary">Active</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="px-6 mt-10">
            <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-4 ml-2">Personalized Tools</Text>
            <View className="flex-row gap-4">
              <TouchableOpacity 
                onPress={() => router.push("/directory")}
                className="flex-1 bg-card p-6 rounded-[32px] border border-muted shadow-sm"
              >
                <View className="w-10 h-10 bg-primary/10 rounded-xl items-center justify-center mb-4">
                  <Search size={20} color="#a8324a" />
                </View>
                <Text className="text-secondary font-bold text-sm">Care Directory</Text>
                <Text className="text-muted-foreground text-[10px] mt-1">Find specialists</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => router.push("/family")}
                className="flex-1 bg-card p-6 rounded-[32px] border border-muted shadow-sm"
              >
                <View className="w-10 h-10 bg-accent/10 rounded-xl items-center justify-center mb-4">
                  <Users size={20} color="#c9a35a" />
                </View>
                <Text className="text-secondary font-bold text-sm">Family Sync</Text>
                <Text className="text-muted-foreground text-[10px] mt-1">Kindred insights</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Upcoming Meds */}
          <View className="px-6 mt-10">
            <View className="flex-row justify-between items-end mb-6">
              <View>
                <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Today's plan</Text>
                <Text className="text-2xl font-serif text-secondary">Medications</Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/meds")}>
                <Text className="text-primary font-bold text-sm">View routine</Text>
              </TouchableOpacity>
            </View>
            
            <View className="gap-4">
              {nextMeds.length > 0 ? (
                nextMeds.map(med => (
                  <MedicationCard 
                    key={med.id}
                    name={med.name} 
                    dose={med.dosage}
                    time={med.schedule_time?.slice(0, 5) || "--:--"}
                    status="Ongoing"
                  />
                ))
              ) : (
                <View className="bg-card p-6 rounded-[24px] border border-muted border-dashed items-center">
                  <Text className="text-muted-foreground text-xs italic">No upcoming medications listed.</Text>
                </View>
              )}
            </View>
          </View>
        </>
      )}

      <View className="h-20" />
    </ScrollView>
  );
}

function MedicationCard({ name, dose, time, status }: { name: string, dose: string, time: string, status: string }) {
  const isTaken = status === "Taken";
  return (
    <View className="bg-card p-5 rounded-[24px] border border-muted shadow-sm flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <View className={`w-12 h-12 rounded-2xl items-center justify-center ${isTaken ? 'bg-accent/10' : 'bg-muted/30'}`}>
          <Pill size={24} color={isTaken ? '#c9a35a' : '#425f61'} />
        </View>
        <View>
          <Text className="text-base font-bold text-secondary">{name}</Text>
          <Text className="text-muted-foreground text-xs font-medium">{dose}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="font-bold text-secondary text-sm">{time}</Text>
        <Text className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isTaken ? 'text-accent' : 'text-primary'}`}>{status}</Text>
      </View>
    </View>
  );
}
