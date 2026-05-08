import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { HeartPulse, Mail, Sparkles, Chrome } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const { sendMagicLink, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const handleMagicLink = async () => {
    if (!email) {
      Alert.alert("Missing Email", "Please enter your email address to receive a sign-in link.");
      return;
    }

    setBusy(true);
    try {
      const { error } = await sendMagicLink(email);
      if (error) {
        Alert.alert("Error", error.message || "Couldn't send sign-in link. Please try again.");
      } else {
        Alert.alert(
          "Check your email", 
          "We've sent a secure sign-in link to your inbox. Tap the link to log in automatically.",
          [{ text: "OK", onPress: () => {} }]
        );
      }
    } catch (e) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-8 pt-20 pb-12 flex-1 justify-between">
          <View>
            <View className="items-center mb-12">
              <View className="w-16 h-16 bg-primary/10 rounded-[24px] items-center justify-center mb-6 border border-primary/10">
                <HeartPulse size={36} color="#a8324a" />
              </View>
              <Text className="text-3xl font-serif text-secondary text-center tracking-tight">
                Welcome back
              </Text>
              <Text className="text-muted-foreground text-center mt-3 px-6 leading-6">
                Sign in to continue your care journey and stay connected to your community.
              </Text>
            </View>

            <View className="gap-5">
              <View>
                <Text className="text-secondary font-bold mb-2 ml-1 text-xs uppercase tracking-widest opacity-60">Email Address</Text>
                <View className="bg-card border border-muted rounded-2xl flex-row items-center px-5 py-0.5 shadow-sm">
                  <Mail size={18} color="#425f61" />
                  <TextInput 
                    className="flex-1 h-14 ml-3 text-secondary font-medium text-base"
                    placeholder="you@example.com"
                    placeholderTextColor="#425f61"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!busy}
                  />
                </View>
              </View>

              <TouchableOpacity 
                className="mt-4"
                onPress={handleMagicLink}
                activeOpacity={0.9}
                disabled={busy}
              >
                <LinearGradient
                  colors={["#a8324a", "#8a283c"]}
                  className={`w-full py-5 rounded-2xl items-center justify-center flex-row gap-2 shadow-lg shadow-primary/20 ${busy ? 'opacity-70' : ''}`}
                >
                  <Sparkles size={20} color="white" />
                  <Text className="text-white text-lg font-bold">
                    {busy ? "Sending..." : "Send sign-in link"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View className="flex-row items-center my-6">
                <View className="flex-1 h-[1px] bg-muted" />
                <Text className="mx-4 text-muted-foreground text-[10px] font-bold uppercase tracking-[2px]">or</Text>
                <View className="flex-1 h-[1px] bg-muted" />
              </View>

              <TouchableOpacity 
                className="w-full py-5 rounded-2xl bg-card border border-muted items-center flex-row justify-center gap-3 shadow-sm"
                onPress={() => signInWithGoogle()}
                activeOpacity={0.7}
                disabled={busy}
              >
                <Chrome size={20} color="#1f3c3d" />
                <Text className="text-secondary text-base font-bold">Continue with Google</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-12 items-center">
            <Text className="text-muted-foreground text-sm">New here?</Text>
            <TouchableOpacity 
              className="mt-2"
              onPress={() => Alert.alert("Coming Soon", "Account creation is currently linked to the web platform.")}
            >
              <Text className="text-primary font-bold text-base">Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
