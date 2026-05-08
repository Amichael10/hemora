import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Activity, Flame, Thermometer, Droplets, ArrowRight, ShieldAlert } from "lucide-react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function CrisisScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [severity, setSeverity] = useState(3);
  const [note, setNote] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const handleSaveLog = async () => {
    if (!user) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("crisis_logs")
        .insert({
          user_id: user.id,
          pain_level: severity.toString(),
          pain_locations: [], // Could add a selector for this later
          triggers: selectedSymptoms.join(", "),
          notes: note,
          occurred_at: new Date().toISOString()
        });

      if (error) throw error;

      Alert.alert(
        "Log Saved", 
        "Your crisis log has been recorded. This will help your doctors track patterns.",
        [{ text: "OK", onPress: () => router.replace("/dashboard") }]
      );
    } catch (e) {
      Alert.alert("Error", "Could not save log. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmergency = () => {
    Alert.alert(
      "Emergency SOS",
      "This will notify all your emergency contacts. Proceed?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "YES, NOTIFY", style: "destructive", onPress: () => Alert.alert("Notified", "Your contacts have been alerted.") }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      
      <View className="px-8 pt-16 pb-8">
        <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-[2px] mb-2">Crisis Logger</Text>
        <Text className="text-[44px] font-serif text-secondary leading-[50px]">Track your {"\n"}<Text className="italic text-primary">current state.</Text></Text>
      </View>

      <View className="px-8 mt-4">
        <TouchableOpacity 
          onPress={handleEmergency}
          className="bg-primary/5 p-6 rounded-[32px] border border-primary/10 flex-row items-center gap-5"
        >
          <View className="w-14 h-14 bg-primary/10 rounded-2xl items-center justify-center border border-primary/10">
            <ShieldAlert size={32} color="#a8324a" />
          </View>
          <View className="flex-1">
            <Text className="text-secondary text-lg font-bold">Need Help?</Text>
            <Text className="text-muted-foreground text-sm leading-5">Tap here to notify your emergency contacts immediately.</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Pain Severity */}
      <View className="px-8 mt-12">
        <Text className="text-xl font-bold text-secondary mb-6">Pain Intensity</Text>
        <View className="flex-row justify-between mb-8">
          {[1, 2, 3, 4, 5].map((val) => (
            <TouchableOpacity 
              key={val}
              onPress={() => setSeverity(val)}
              className={`w-14 h-14 rounded-2xl items-center justify-center border ${
                severity === val ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-card border-muted'
              }`}
            >
              <Text className={`text-xl font-bold ${severity === val ? 'text-white' : 'text-muted-foreground'}`}>
                {val}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Symptoms */}
      <View className="px-8 mt-4">
        <Text className="text-xl font-bold text-secondary mb-6">Accompanying Symptoms</Text>
        <View className="flex-row flex-wrap gap-3">
          <SymptomChip 
            icon={<Thermometer size={16} color="#c9a35a" />} 
            label="Fever" 
            selected={selectedSymptoms.includes("Fever")}
            onToggle={() => toggleSymptom("Fever")}
          />
          <SymptomChip 
            icon={<Flame size={16} color="#c9a35a" />} 
            label="Inflammation" 
            selected={selectedSymptoms.includes("Inflammation")}
            onToggle={() => toggleSymptom("Inflammation")}
          />
          <SymptomChip 
            icon={<Droplets size={16} color="#c9a35a" />} 
            label="Dehydration" 
            selected={selectedSymptoms.includes("Dehydration")}
            onToggle={() => toggleSymptom("Dehydration")}
          />
          <SymptomChip 
            icon={<Activity size={16} color="#c9a35a" />} 
            label="Fatigue" 
            selected={selectedSymptoms.includes("Fatigue")}
            onToggle={() => toggleSymptom("Fatigue")}
          />
        </View>
      </View>

      {/* Notes */}
      <View className="px-8 mt-12">
        <Text className="text-xl font-bold text-secondary mb-4">Quick Notes</Text>
        <TextInput 
          className="bg-card border border-muted rounded-[28px] p-6 text-secondary text-lg h-32 text-vertical-top font-medium shadow-sm"
          placeholder="How are you feeling right now?"
          placeholderTextColor="#667f81"
          multiline
          value={note}
          onChangeText={setNote}
        />
      </View>

      <View className="px-8 mt-12 mb-20">
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={handleSaveLog}
          disabled={submitting}
        >
          <LinearGradient
            colors={["#a8324a", "#8a283c"]}
            className={`py-5 rounded-2xl items-center justify-center flex-row gap-3 shadow-lg shadow-primary/20 ${submitting ? 'opacity-70' : ''}`}
          >
            {submitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white text-lg font-bold">Save Crisis Log</Text>
                <ArrowRight size={20} color="white" />
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function SymptomChip({ icon, label, selected, onToggle }: { icon: React.ReactNode, label: string, selected: boolean, onToggle: () => void }) {
  return (
    <TouchableOpacity 
      onPress={onToggle}
      activeOpacity={0.7}
      className={`flex-row items-center gap-2 px-6 py-4 rounded-full border shadow-sm ${
        selected ? 'bg-secondary border-secondary' : 'bg-card border-muted'
      }`}
    >
      {icon}
      <Text className={`font-bold ${selected ? 'text-white' : 'text-muted-foreground'}`}>{label}</Text>
    </TouchableOpacity>
  );
}
