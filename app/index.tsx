import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const { isAuthenticated, logout } = useAuth();

  const logo = require('../assets/images/himatif.png');

  return (
    <LinearGradient
      colors={[colors.darkBlue, colors.darkBackground]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Biodata Prodi App</Text>
        <Text style={styles.subtitle}>
          Platform Biodata Mahasiswa dan Dosen
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            {isAuthenticated
              ? 'Selamat datang kembali! Akses informasi lengkap tentang program studi dan dosen.'
              : 'Silakan login untuk mengakses informasi lengkap tentang program studi dan dosen.'}
          </Text>
        </View>

        {isAuthenticated ? (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => router.push('/(tabs)')}
            >
              <View style={styles.buttonContent}>
                <Ionicons
                  name="people-circle-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Lihat Biodata</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={logout}
            >
              <View style={styles.buttonContent}>
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => router.push('/auth/login')}
            >
              <View style={styles.buttonContent}>
                <Ionicons
                  name="log-in-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/auth/register')}
            >
              <View style={styles.buttonContent}>
                <Ionicons
                  name="person-add-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: buttonWidth,
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: colors.lightBlue,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.lightBlue,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.lightBlue,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
  },
});
