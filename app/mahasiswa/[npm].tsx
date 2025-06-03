import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import api from '../../api/api';
import { colors } from '../../constants/colors';

interface MahasiswaDetail {
  npm: string;
  nama: string;
  angkatan: number;
  alamat: string;
  nomor_hp: string;
  nomor_keluarga: string;
  asal_sekolah: string;
}

const MahasiswaDetailScreen = () => {
  const { npm } = useLocalSearchParams();
  const [data, setData] = useState<MahasiswaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/mahasiswa/${npm}`);
        setData(response.data);
      } catch (err) {
        setError('Gagal memuat data mahasiswa');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [npm]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.lightBlue} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {data ? (
        <View style={styles.detailContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>NPM:</Text>
            <Text style={styles.value}>{data.npm}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Nama:</Text>
            <Text style={styles.value}>{data.nama}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Angkatan:</Text>
            <Text style={styles.value}>{data.angkatan}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Alamat:</Text>
            <Text style={styles.value}>{data.alamat}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Nomor HP:</Text>
            <Text style={styles.value}>{data.nomor_hp}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Nomor Keluarga:</Text>
            <Text style={styles.value}>{data.nomor_keluarga}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Asal Sekolah:</Text>
            <Text style={styles.value}>{data.asal_sekolah}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.notFound}>Data tidak ditemukan</Text>
      )}
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
    marginBottom: 20,
    color: colors.textLight,
  },
  detailContainer: {
    backgroundColor: colors.lightBackground,
    borderRadius: 10,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
    paddingBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: colors.textSecondary,
  },
  error: {
    color: colors.danger,
    fontSize: 16,
    textAlign: 'center',
  },
  notFound: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MahasiswaDetailScreen;