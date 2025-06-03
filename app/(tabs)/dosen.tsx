import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../../api/api';
import BiodataCard from '../../components/BiodataCard';
import { colors } from '../../constants/colors';
import { Link } from 'expo-router';

interface Dosen {
  nip: string;
  nama: string;
  alamat: string;
}

const DosenScreen = () => {
  const [data, setData] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dosen');
        setData(response.data);
      } catch (err) {
        setError('Gagal memuat data dosen');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.lightBlue} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>      
      <FlatList
        data={data}
        keyExtractor={(item) => item.nip}
        renderItem={({ item }) => (
          <Link href={`/dosen/${item.nip}`} asChild>
            <TouchableOpacity>
              <BiodataCard 
                title={item.nama}
                subtitle={`NIP: ${item.nip}`}
                details={item.alamat}
              />
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBackground,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.textLight,
  },
  list: {
    paddingBottom: 20,
  },
  error: {
    color: colors.danger,
    fontSize: 16,
  },
});

export default DosenScreen;