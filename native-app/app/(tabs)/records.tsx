import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FolderHeart, Search, FileText, Share2, Filter, MoreHorizontal, Download, Plus } from "lucide-react-native";
import { useState, useEffect, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { format } from "date-fns";

type HealthRecord = {
  id: string;
  title: string;
  type: string;
  status: string;
  record_date: string;
  provider_name: string;
  notes: string;
  file_url: string | null;
};

export default function RecordsScreen() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("care_records")
        .select("*")
        .eq("user_id", user?.id)
        .order("record_date", { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (e) {
      Alert.alert("Error", "Could not load records.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = useMemo(() => {
    return records.filter(r => 
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.provider_name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [records, search]);

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      
      <View className="px-8 pt-16 pb-6">
        <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-[2px] mb-2">Health Vault</Text>
        <Text className="text-[44px] font-serif text-secondary leading-[50px]">Secure {"\n"}<Text className="italic text-primary">Records.</Text></Text>
      </View>

      <View className="px-8 mb-6">
        <View className="bg-card border border-muted rounded-[24px] flex-row items-center px-6 py-1 shadow-sm">
          <Search size={18} color="#667f81" />
          <TextInput 
            className="flex-1 h-14 ml-3 text-secondary font-medium"
            placeholder="Search documents..."
            placeholderTextColor="#667f81"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity className="w-10 h-10 bg-background rounded-xl items-center justify-center border border-muted">
            <Filter size={18} color="#a8324a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-8" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-6 mt-4">
          <Text className="text-xl font-bold text-secondary">Recent Files</Text>
          <TouchableOpacity onPress={fetchRecords}>
            <Text className="text-primary text-sm font-bold">Refresh</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#a8324a" className="mt-10" />
        ) : (
          <View className="gap-4">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <RecordCard 
                  key={record.id}
                  title={record.title}
                  date={record.record_date ? format(new Date(record.record_date), "MMM dd, yyyy") : "No date"}
                  provider={record.provider_name}
                  type={record.type.toUpperCase()}
                />
              ))
            ) : (
              <View className="py-20 items-center bg-card rounded-[32px] border border-muted border-dashed">
                <FolderHeart size={48} color="#667f81" className="mb-4" />
                <Text className="text-secondary font-serif text-xl mb-2">Empty Vault</Text>
                <Text className="text-muted-foreground text-center px-10">Upload your blood tests, reports, and prescriptions for secure access.</Text>
              </View>
            )}
          </View>
        )}
        
        <View className="h-20" />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        activeOpacity={0.9}
        className="absolute bottom-32 right-8"
        onPress={() => Alert.alert("Upload", "Secure file upload coming soon.")}
      >
        <LinearGradient
          colors={["#a8324a", "#8a283c"]}
          className="w-16 h-16 rounded-[24px] items-center justify-center shadow-xl shadow-primary/20"
        >
          <Plus size={28} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

function RecordCard({ title, date, provider, type }: { title: string, date: string, provider: string, type: string }) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      className="bg-card border border-muted p-5 rounded-[28px] flex-row items-center justify-between shadow-sm"
    >
      <View className="flex-row items-center gap-4 flex-1">
        <View className="w-14 h-14 bg-background rounded-2xl items-center justify-center border border-muted">
          <FileText size={28} color="#a8324a" />
          <View className="absolute -bottom-1 -right-1 bg-secondary px-1.5 py-0.5 rounded-md border border-white/10">
            <Text className="text-[8px] text-white font-bold">{type}</Text>
          </View>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-secondary" numberOfLines={1}>{title}</Text>
          <Text className="text-muted-foreground text-xs font-medium" numberOfLines={1}>
            {provider ? `${provider} • ` : ""}{date}
          </Text>
        </View>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity className="w-10 h-10 bg-background rounded-full items-center justify-center border border-muted">
          <Share2 size={18} color="#667f81" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-background rounded-full items-center justify-center border border-muted">
          <MoreHorizontal size={18} color="#667f81" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
