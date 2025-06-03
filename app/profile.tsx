import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { colors } from '../constants/colors';

const ProfileScreen = () => {
  const { userType } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const endpoint = '/profile'
        
        const response = await api.get(endpoint);
        setData(response.data);
      } catch (err) {
        console.error('Profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userType]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.lightBlue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil {userType}</Text>
      
      <View style={styles.infoContainer}>
      {data && (
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Nama:</Text>
          <Text style={styles.value}>{data.nama}</Text>
          
          {userType === 'mahasiswa' ? (
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
        </View>
      )}
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
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 20,
  },
  profileContainer: {
    backgroundColor: colors.lightBackground,
    borderRadius: 10,
    padding: 20,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors.lightBackground,
    borderRadius: 10,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    color: colors.textLight,
    fontSize: 18,
    marginBottom: 15,
  },
});

export default ProfileScreen;