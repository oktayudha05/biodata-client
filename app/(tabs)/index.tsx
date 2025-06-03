import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../constants/colors";

const HomeTabScreen = () => {
  const { userType } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.subtitle}>
        Anda login sebagai {userType === "mahasiswa" ? "Mahasiswa" : "Dosen"}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Apa yang ingin Anda lakukan?</Text>
        <Text style={styles.cardText}>
          • Lihat data {userType === "mahasiswa" ? "mahasiswa" : "dosen"} di tab{" "}
          {userType === "mahasiswa" ? "Mahasiswa" : "Dosen"}
        </Text>
        <Text style={styles.cardText}>
          • Cari data spesifik dengan fitur pencarian
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textLight,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 30,
  },
  card: {
    backgroundColor: colors.lightBackground,
    borderRadius: 10,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textLight,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 10,
  },
});

export default HomeTabScreen;
