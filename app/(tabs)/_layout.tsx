import { Tabs } from "expo-router/tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const { logout } = useAuth();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.lightBlue,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.darkBlue,
          borderTopWidth: 0,
        },
        headerStyle: { backgroundColor: colors.darkBlue },
        headerTintColor: colors.lightBlue,
        headerTitleStyle: { fontWeight: "bold" },
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color={colors.lightBlue}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="mahasiswa"
        options={{
          title: "Data Mahasiswa",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="school" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dosen"
        options={{
          title: "Data Dosen",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-tie"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil Anda",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
