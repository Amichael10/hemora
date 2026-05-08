import { View, Text, ScrollView, TouchableOpacity, Switch, ActivityIndicator, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { User, Bell, Shield, Heart, LogOut, ChevronRight, Settings } from "lucide-react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (e) {
      console.error("Profile fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      
      <View className="px-8 pt-16 pb-12 items-center">
        <View className="w-32 h-32 bg-card rounded-[48px] items-center justify-center border-4 border-white shadow-lg mb-6 overflow-hidden">
          <User size={64} color="#a8324a" />
        </View>
        
        {loading ? (
          <ActivityIndicator color="#a8324a" />
        ) : (
          <>
            <Text className="text-3xl font-serif text-secondary mb-1">
              {profile?.full_name || "Guest User"}
            </Text>
            <Text className="text-muted-foreground text-lg font-medium">
              {user?.email}
            </Text>
            
            <View className="flex-row gap-4 mt-6">
              <View className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                <Text className="text-primary font-bold text-xs uppercase tracking-widest">{profile?.genotype || "?? Genotype"}</Text>
              </View>
              <View className="bg-accent/10 px-4 py-2 rounded-xl border border-accent/20">
                <Text className="text-accent font-bold text-xs uppercase tracking-widest">{profile?.blood_type || "?? Blood"}</Text>
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => Alert.alert("Edit Profile", "Profile editing coming soon.")}
              className="mt-8 bg-secondary px-10 py-4 rounded-2xl shadow-md"
            >
              <Text className="text-white font-bold text-lg">Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View className="px-8 mb-12">
        <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-[2px] mb-6 ml-2">Preferences</Text>
        
        <View className="bg-card rounded-[32px] overflow-hidden border border-muted shadow-sm">
          <ProfileToggle 
            icon={<Bell size={20} color="#a8324a" />} 
            label="Push Notifications" 
            value={notifications}
            onValueChange={setNotifications}
          />
          <ProfileLink 
            icon={<Shield size={20} color="#c9a35a" />} 
            label="Privacy & Security" 
          />
          <ProfileLink 
            icon={<Heart size={20} color="#a8324a" />} 
            label="Emergency Contacts" 
          />
          <ProfileLink 
            icon={<Settings size={20} color="#1f3c3d" />} 
            label="General Settings" 
            isLast
          />
        </View>

        <TouchableOpacity 
          onPress={handleLogout}
          className="mt-8 flex-row items-center justify-center gap-3 py-6 bg-primary/5 rounded-[28px] border border-primary/10 shadow-sm"
        >
          <LogOut size={20} color="#a8324a" />
          <Text className="text-primary font-bold text-lg">Log Out Session</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center pb-24">
        <Text className="text-muted-foreground text-sm font-bold tracking-widest">HEMORA MOBILE v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

function ProfileToggle({ icon, label, value, onValueChange }: { icon: React.ReactNode, label: string, value: boolean, onValueChange: (v: boolean) => void }) {
  return (
    <View className="flex-row items-center justify-between px-6 py-6 border-b border-muted">
      <View className="flex-row items-center gap-4">
        <View className="w-10 h-10 bg-background rounded-xl items-center justify-center border border-muted">
          {icon}
        </View>
        <Text className="text-lg font-bold text-secondary">{label}</Text>
      </View>
      <Switch 
        value={value} 
        onValueChange={onValueChange}
        trackColor={{ false: "#d8cdc0", true: "#a8324a" }}
        thumbColor={value ? "#fbf5e7" : "#f4f4f4"}
      />
    </View>
  );
}

function ProfileLink({ icon, label, isLast }: { icon: React.ReactNode, label: string, isLast?: boolean }) {
  return (
    <TouchableOpacity className={`flex-row items-center justify-between px-6 py-6 ${isLast ? '' : 'border-b border-muted'}`}>
      <View className="flex-row items-center gap-4">
        <View className="w-10 h-10 bg-background rounded-xl items-center justify-center border border-muted">
          {icon}
        </View>
        <Text className="text-lg font-bold text-secondary">{label}</Text>
      </View>
      <ChevronRight size={20} color="#667f81" />
    </TouchableOpacity>
  );
}
