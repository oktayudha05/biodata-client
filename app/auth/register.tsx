import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AuthForm from '../../components/AuthForm';
import { colors } from '../../constants/colors';
import { router } from 'expo-router';
import api from '../../api/api';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width * 0.9, 400);

const Register = () => {
  const [userType, setUserType] = useState<'mahasiswa' | 'dosen'>('mahasiswa');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (credentials: any) => {
    try {
      const endpoint = userType === 'mahasiswa' ? '/mahasiswa' : '/dosen';
      const response = await api.post(endpoint, credentials);

      if (response.data) {
        setSuccess(true);
        // Arahkan ke login setelah 2 detik
        setTimeout(() => router.push('/auth/login'), 2000);
      }
    } catch (err) {
      setError('Registrasi gagal. Silakan coba lagi.');
      console.error('Register error:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Buat Akun Baru</Text>

        {success ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              Registrasi berhasil! Mengarahkan ke login...
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  userType === 'mahasiswa' && styles.toggleActive,
                ]}
                onPress={() => setUserType('mahasiswa')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    userType === 'mahasiswa' && styles.toggleTextActive,
                  ]}
                >
                  Mahasiswa
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  userType === 'dosen' && styles.toggleActive,
                ]}
                onPress={() => setUserType('dosen')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    userType === 'dosen' && styles.toggleTextActive,
                  ]}
                >
                  Dosen
                </Text>
              </TouchableOpacity>
            </View>

            <AuthForm
              type="register"
              userType={userType}
              onSubmit={handleRegister}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.darkBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: colors.darkCard,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    // Bayangan (shadow) iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    // Elevation Android
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.lightBlue,
    textAlign: 'center',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.lightBackground,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  toggleActive: {
    backgroundColor: colors.accentBlue,
  },
  toggleText: {
    fontSize: 16,
    color: colors.textLight + 'CC', // teks agak redup jika belum aktif
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#fff',
  },
  successContainer: {
    backgroundColor: colors.successBackground,
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
  },
  successText: {
    color: colors.successText,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: colors.danger,
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Register;
