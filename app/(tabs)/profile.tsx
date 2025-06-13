import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";
import { colors } from "../../constants/colors";
import { router } from "expo-router";

const ProfileScreen = () => {
  const { userType, logout } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setData(response.data);
      } catch (err) {
        console.error("Profile error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userType]);

  const handleDeleteConfirm = async () => {
    setModalVisible(false);
    setLoading(true);
    try {
      const endpoint =
        userType === "mahasiswa" ? "/mahasiswa/delete" : "/dosen/delete";
      await api.delete(endpoint);
      await logout();
      router.replace("/auth/login");
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.lightBlue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {data && (
          <View style={styles.profileContainer}>
            <Text style={styles.label}>Nama:</Text>
            <Text style={styles.value}>{data.nama}</Text>
            {userType === "mahasiswa" ? (
              <>
                <Text style={styles.label}>NPM:</Text>
                <Text style={styles.value}>{data.npm}</Text>
                <Text style={styles.label}>Angkatan:</Text>
                <Text style={styles.value}>{data.angkatan}</Text>
              </>
            ) : (
              <>
                <Text style={styles.label}>NIP:</Text>
                <Text style={styles.value}>{data.nip}</Text>
              </>
            )}
            <Text style={styles.label}>Alamat:</Text>
            <Text style={styles.value}>{data.alamat}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.deleteButtonText}>Hapus Akun</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Hapus Akun</Text>
            <Text style={styles.modalMessage}>
              Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak
              dapat dibatalkan.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Batal</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.confirmText}>Hapus</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.darkBackground, padding: 20 },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors.lightBackground,
    borderRadius: 10,
  },
  profileContainer: {
    backgroundColor: colors.lightBackground,
    borderRadius: 10,
    padding: 20,
  },
  label: { color: colors.textSecondary, fontSize: 16, marginBottom: 5 },
  value: { color: colors.textLight, fontSize: 18, marginBottom: 15 },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#FF4D4F",
    alignItems: "center",
  },
  deleteButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: colors.lightBackground,
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textLight,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end" },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: colors.accentBlue,
  },
  confirmButton: {
    backgroundColor: "#FF4D4F",
  },
  cancelText: {
    color: colors.textLight,
    fontSize: 16,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
