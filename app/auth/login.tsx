import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform,
} from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';
import { router } from 'expo-router';
import { colors } from '../../constants/colors';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width * 0.9, 400);

const Login = () => {
  const [userType, setUserType] = useState<'mahasiswa' | 'dosen'>('mahasiswa');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      setError('');
    }, [])
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleLogin = async (credentials: any) => {
    try {
      const endpoint =
        userType === 'mahasiswa' ? '/auth/login-mhs' : '/auth/login-dosen';

      console.log('Attempting login to:', `${api.defaults.baseURL}${endpoint}`);
      console.log('Credentials:', credentials);

      const response = await api.post(endpoint, credentials);
      console.log('Login response:', response.data);

      if (response.status === 200) {
        login(userType);
        router.replace('/(tabs)');
      } else {
        setError('Login gagal. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Username atau password salah');
      console.error('Login error:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Masuk ke Akun</Text>

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

        <AuthForm type="login" userType={userType} onSubmit={handleLogin} />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
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
    color: colors.textLight + 'CC',
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#fff',
  },
  errorText: {
    color: colors.danger,
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Login;
