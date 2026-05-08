import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Modal, FlatList, Alert, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Search, MapPin, Phone, ExternalLink, Bookmark, Plus, CheckCircle2, ChevronRight, Filter, Globe, Microscope, MessageSquare, Hospital, Users } from "lucide-react-native";
import { useState, useMemo, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

const CATEGORIES = [
  { id: "all", label: "All Care" },
  { id: "hospital", label: "Hospitals" },
  { id: "lab", label: "Labs" },
  { id: "counselling", label: "Counselling" },
  { id: "support", label: "Support Groups" },
];

type Provider = {
  id: string;
  name: string;
  type: "hospital" | "lab" | "counselling" | "support";
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  phone: string | null;
  website: string | null;
  verified: boolean;
  saved: boolean;
  services: string[] | null;
  latitude: number | null;
  longitude: number | null;
};

export default function DirectoryScreen() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestModalVisible, setSuggestModalVisible] = useState(false);

  // Suggestion form
  const [newProviderName, setNewProviderName] = useState("");
  const [newProviderType, setNewProviderType] = useState<Provider["type"]>("hospital");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("providers")
        .select("*")
        .or(`user_id.is.null,user_id.eq.${user?.id}`);

      if (error) throw error;
      setProviders(data || []);
    } catch (e) {
      console.error("Error fetching providers:", e);
      Alert.alert("Error", "Could not load directory. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = async (provider: Provider) => {
    try {
      const { error } = await supabase
        .from("providers")
        .update({ saved: !provider.saved })
        .eq("id", provider.id);

      if (error) throw error;
      
      setProviders(prev => prev.map(p => 
        p.id === provider.id ? { ...p, saved: !p.saved } : p
      ));
    } catch (e) {
      Alert.alert("Error", "Could not update saved status.");
    }
  };

  const handleSuggest = async () => {
    if (!newProviderName.trim()) {
      Alert.alert("Missing Name", "Please enter the facility name.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("provider_suggestions")
        .insert({
          name: newProviderName.trim(),
          type: newProviderType,
          user_id: user?.id,
          status: "pending"
        });

      if (error) throw error;

      Alert.alert("Success", "Your suggestion has been sent for review.");
      setSuggestModalVisible(false);
      setNewProviderName("");
    } catch (e) {
      Alert.alert("Error", "Could not submit suggestion.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                           (p.address || "").toLowerCase().includes(search.toLowerCase()) ||
                           (p.city || "").toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "all" || p.type === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [providers, search, activeCategory]);

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      
      {/* Header Area */}
      <View className="px-6 pt-16 pb-6">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Local Support</Text>
            <Text className="text-3xl font-serif text-secondary">Care Directory</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setSuggestModalVisible(true)}
            className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20 flex-row items-center gap-2"
          >
            <Plus size={16} color="#a8324a" />
            <Text className="text-primary font-bold text-xs uppercase tracking-wider">Suggest</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="relative">
          <View className="absolute left-4 top-4 z-10">
            <Search size={20} color="#667f81" />
          </View>
          <TextInput
            placeholder="Search hospitals, labs, clinics..."
            className="bg-card h-14 rounded-2xl pl-12 pr-4 border border-muted text-secondary font-medium shadow-sm"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#667f81"
          />
        </View>

        {/* Categories Scroller */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mt-6 -mx-6 px-6"
          contentContainerStyle={{ paddingRight: 40 }}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              className={`mr-3 px-6 py-3 rounded-2xl border ${
                activeCategory === cat.id 
                ? 'bg-secondary border-secondary shadow-md' 
                : 'bg-card border-muted'
              }`}
            >
              <Text className={`font-bold text-xs uppercase tracking-wider ${
                activeCategory === cat.id ? 'text-white' : 'text-muted-foreground'
              }`}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {loading ? (
          <View className="py-20 items-center">
            <ActivityIndicator size="large" color="#a8324a" />
            <Text className="text-muted-foreground mt-4 font-medium uppercase tracking-widest text-[10px]">Updating directory...</Text>
          </View>
        ) : (
          <>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                {filteredProviders.length} Results Found
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Filter size={14} color="#a8324a" />
                <Text className="text-primary font-bold text-[10px] uppercase tracking-widest">Filters</Text>
              </TouchableOpacity>
            </View>

            {filteredProviders.map((provider) => (
              <ProviderCard 
                key={provider.id} 
                provider={provider} 
                onToggleSave={() => handleToggleSave(provider)}
              />
            ))}
            
            {filteredProviders.length === 0 && (
              <View className="py-20 items-center">
                <View className="w-20 h-20 bg-muted/20 rounded-full items-center justify-center mb-4">
                  <Search size={32} color="#667f81" />
                </View>
                <Text className="text-secondary font-serif text-xl mb-2">No results found</Text>
                <Text className="text-muted-foreground text-center px-10">Try adjusting your search or filters to find what you're looking for.</Text>
              </View>
            )}
          </>
        )}
        
        <View className="h-20" />
      </ScrollView>

      {/* Suggest Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={suggestModalVisible}
        onRequestClose={() => setSuggestModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background rounded-t-[40px] p-8 min-h-[60%]">
            <View className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-8" />
            
            <Text className="text-2xl font-serif text-secondary mb-2">Suggest a Provider</Text>
            <Text className="text-muted-foreground mb-8">Help the Hemora community by adding a trusted healthcare provider to our directory.</Text>
            
            <View className="space-y-4 mb-8">
              <View>
                <Text className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 ml-1">Provider Name</Text>
                <TextInput 
                  placeholder="e.g. Lagos Health Center" 
                  className="bg-card h-14 rounded-2xl px-4 border border-muted"
                  value={newProviderName}
                  onChangeText={setNewProviderName}
                />
              </View>
              <View>
                <Text className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 ml-1">Category</Text>
                <View className="flex-row gap-2 flex-wrap">
                  {CATEGORIES.slice(1).map(cat => (
                    <TouchableOpacity 
                      key={cat.id} 
                      onPress={() => setNewProviderType(cat.id as any)}
                      className={`px-4 py-2 rounded-xl border ${
                        newProviderType === cat.id ? 'bg-secondary border-secondary' : 'bg-card border-muted'
                      }`}
                    >
                      <Text className={`font-bold text-[10px] uppercase ${
                        newProviderType === cat.id ? 'text-white' : 'text-muted-foreground'
                      }`}>{cat.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleSuggest}
              disabled={submitting}
              className={`bg-primary py-5 rounded-2xl items-center shadow-lg shadow-primary/30 ${submitting ? 'opacity-70' : ''}`}
            >
              <Text className="text-white font-bold text-lg">{submitting ? "Submitting..." : "Submit Suggestion"}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setSuggestModalVisible(false)}
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

function ProviderCard({ provider, onToggleSave }: { provider: Provider, onToggleSave: () => void }) {
  const getIcon = () => {
    switch(provider.type) {
      case 'hospital': return <Hospital size={20} color="#a8324a" />;
      case 'lab': return <Microscope size={20} color="#a8324a" />;
      case 'counselling': return <MessageSquare size={20} color="#a8324a" />;
      default: return <Users size={20} color="#a8324a" />;
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      className="bg-card rounded-[32px] p-6 mb-4 border border-muted shadow-sm"
    >
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="text-xl font-serif text-secondary">{provider.name}</Text>
            {provider.verified && <CheckCircle2 size={18} color="#10b981" />}
          </View>
          <View className="flex-row items-center gap-1">
            <MapPin size={12} color="#667f81" />
            <Text className="text-muted-foreground text-xs line-clamp-1">
              {[provider.address, provider.city].filter(Boolean).join(", ")}
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={onToggleSave}
          className="w-10 h-10 bg-background rounded-full items-center justify-center border border-muted"
        >
          <Bookmark size={18} color={provider.saved ? "#a8324a" : "#667f81"} fill={provider.saved ? "#a8324a" : "transparent"} />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center gap-4 mb-4">
        <View className="bg-accent/10 px-3 py-1 rounded-full border border-accent/20 flex-row items-center gap-2">
          {getIcon()}
          <Text className="text-accent font-bold text-[10px] uppercase tracking-wider">{provider.type}</Text>
        </View>
        {provider.latitude && provider.longitude && (
          <Text className="text-primary font-bold text-[10px] uppercase tracking-wider">Nearby</Text>
        )}
      </View>

      <View className="flex-row gap-2 mt-2">
        <TouchableOpacity className="flex-1 bg-secondary/5 h-12 rounded-xl flex-row items-center justify-center gap-2 border border-secondary/10">
          <Phone size={14} color="#1f3c3d" />
          <Text className="text-secondary font-bold text-xs uppercase tracking-wider">Call</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-secondary/5 h-12 rounded-xl flex-row items-center justify-center gap-2 border border-secondary/10">
          <Globe size={14} color="#1f3c3d" />
          <Text className="text-secondary font-bold text-xs uppercase tracking-wider">Site</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
