import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Pill, Plus, ChevronRight, Clock, Calendar, CheckCircle2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { format } from "date-fns";

type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  schedule_time: string;
  status: string;
  notes: string;
  takenToday?: boolean;
};

export default function MedsScreen() {
  const { user } = useAuth();
  const [meds, setMeds] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, taken: 0 });

  useEffect(() => {
    if (user) {
      fetchMeds();
    }
  }, [user]);

  const fetchMeds = async () => {
    setLoading(true);
    try {
      // Fetch medications
      const { data: medsData, error: medsError } = await supabase
        .from("medications")
        .select("*")
        .eq("user_id", user?.id)
        .eq("status", "ongoing");

      if (medsError) throw medsError;

      // Fetch logs for today to see what was taken
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const { data: logsData, error: logsError } = await supabase
        .from("medication_logs")
        .select("medication_id")
        .eq("user_id", user?.id)
        .gte("taken_at", startOfDay.toISOString())
        .lte("taken_at", endOfDay.toISOString());

      if (logsError) throw logsError;

      const takenIds = new Set(logsData?.map(l => l.medication_id));
      
      const combinedMeds = (medsData || []).map(m => ({
        ...m,
        takenToday: takenIds.has(m.id)
      }));

      setMeds(combinedMeds);
      setStats({
        total: combinedMeds.length,
        taken: combinedMeds.filter(m => m.takenToday).length
      });
    } catch (e) {
      console.error("Error fetching meds:", e);
      Alert.alert("Error", "Could not load medications.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkTaken = async (med: Medication) => {
    if (med.takenToday) return;

    try {
      const { error } = await supabase
        .from("medication_logs")
        .insert({
          user_id: user?.id,
          medication_id: med.id,
          status: "taken",
          taken_at: new Date().toISOString()
        });

      if (error) throw error;

      setMeds(prev => prev.map(m => 
        m.id === med.id ? { ...m, takenToday: true } : m
      ));
      setStats(prev => ({ ...prev, taken: prev.taken + 1 }));
    } catch (e) {
      Alert.alert("Error", "Could not mark medication as taken.");
    }
  };

  const progress = stats.total > 0 ? (stats.taken / stats.total) * 100 : 0;

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      
      <View className="px-8 pt-16 pb-8 flex-row justify-between items-end">
        <View>
          <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-[2px] mb-2">Pharmacy</Text>
          <Text className="text-[44px] font-serif text-secondary leading-[50px]">Daily {"\n"}<Text className="italic text-primary">Routine.</Text></Text>
        </View>
        <TouchableOpacity className="w-14 h-14 bg-primary rounded-2xl items-center justify-center shadow-lg shadow-primary/20">
          <Plus size={28} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="py-20 items-center">
          <ActivityIndicator size="large" color="#a8324a" />
        </View>
      ) : (
        <>
          {/* Progress Card */}
          <View className="px-8 mt-6">
            <View className="bg-secondary rounded-[32px] p-8 overflow-hidden relative">
              <LinearGradient
                colors={["rgba(168, 50, 74, 0.3)", "transparent"]}
                className="absolute inset-0"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View className="flex-row justify-between items-center mb-6">
                <View className="w-12 h-12 bg-white/10 rounded-2xl items-center justify-center border border-white/10">
                  <Calendar size={24} color="#fbf5e7" />
                </View>
                <View className="px-3 py-1 bg-accent/20 rounded-full border border-accent/20">
                  <Text className="text-accent text-xs font-bold">{Math.round(progress)}% Today's Goal</Text>
                </View>
              </View>
              <Text className="text-white text-3xl font-serif mb-2">
                {progress === 100 ? "Great job!" : "Keep it up!"}
              </Text>
              <Text className="text-white/60 text-lg mb-8 font-medium">
                You've taken {stats.taken} of {stats.total} doses today.
              </Text>
              
              <View className="h-2 bg-white/10 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-accent" 
                  style={{ width: `${progress}%` }} 
                />
              </View>
            </View>
          </View>

          {/* Today's Schedule */}
          <View className="px-8 mt-12">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-secondary">Today's Schedule</Text>
              <TouchableOpacity>
                <Text className="text-primary text-sm font-bold">View History</Text>
              </TouchableOpacity>
            </View>
            
            <View className="gap-6">
              {meds.length > 0 ? (
                meds.sort((a, b) => a.schedule_time.localeCompare(b.schedule_time)).map((med) => (
                  <MedsItem 
                    key={med.id}
                    name={med.name}
                    time={med.schedule_time.slice(0, 5)}
                    dosage={med.dosage}
                    taken={!!med.takenToday}
                    onPress={() => handleMarkTaken(med)}
                  />
                ))
              ) : (
                <View className="py-10 items-center bg-card rounded-3xl border border-muted border-dashed">
                  <Pill size={32} color="#667f81" className="mb-2" />
                  <Text className="text-muted-foreground font-medium">No medications scheduled.</Text>
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

function MedsItem({ name, time, dosage, taken, onPress }: { name: string, time: string, dosage: string, taken: boolean, onPress: () => void }) {
  // Convert HH:mm to 12h format
  const formatTime = (t: string) => {
    const [h, m] = t.split(':');
    const hours = parseInt(h);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    return { h12, ampm };
  };
  
  const { h12, ampm } = formatTime(time);

  return (
    <View className="flex-row items-center gap-5">
      <View className="items-center w-12">
        <Text className="text-secondary font-bold text-xs">{h12}:{time.split(':')[1]}</Text>
        <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">{ampm}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={onPress}
        disabled={taken}
        className={`flex-1 p-5 rounded-[28px] border flex-row items-center justify-between shadow-sm ${
          taken ? 'bg-accent/5 border-accent/10' : 'bg-card border-muted'
        }`}
      >
        <View className="flex-row items-center gap-4">
          <View className={`w-12 h-12 rounded-2xl items-center justify-center border ${
            taken ? 'bg-accent/10 border-accent/20' : 'bg-background border-muted'
          }`}>
            <Pill size={24} color={taken ? '#c9a35a' : '#a8324a'} />
          </View>
          <View>
            <Text className="text-lg font-bold text-secondary">{name}</Text>
            <Text className="text-muted-foreground text-sm font-medium">{dosage}</Text>
          </View>
        </View>
        
        {taken ? (
          <View className="w-10 h-10 bg-accent rounded-full items-center justify-center border border-accent/20">
            <CheckCircle2 size={20} color="white" />
          </View>
        ) : (
          <View className="w-10 h-10 bg-background rounded-full items-center justify-center border border-muted">
            <Plus size={20} color="#a8324a" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
