import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { colors } from '../constants/colors';

interface AuthFormProps {
  type: 'login' | 'register';
  userType: 'mahasiswa' | 'dosen';
  onSubmit: (credentials: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, userType, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    ...(type === 'register' && userType === 'mahasiswa'
      ? {
          nama: '',
          npm: '',
          angkatan: '',
          alamat: '',
          nomor_hp: '',
          nomor_keluarga: '',
          asal_sekolah: '',
        }
      : {}),
    ...(type === 'register' && userType === 'dosen'
      ? {
          nama: '',
          nip: '',
          alamat: '',
          nomor_hp: '',
        }
      : {}),
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      {type === 'register' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            placeholderTextColor={colors.lightBlue + 'CC'}
            value={formData.nama}
            onChangeText={(text) => setFormData({ ...formData, nama: text })}
          />
          {userType === 'mahasiswa' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="NPM"
                placeholderTextColor={colors.lightBlue + 'CC'}
                value={formData.npm}
                onChangeText={(text) =>
                  setFormData({ ...formData, npm: text })
                }
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Angkatan"
                placeholderTextColor={colors.lightBlue + 'CC'}
                value={formData.angkatan}
                onChangeText={(text) =>
                  setFormData({ ...formData, angkatan: text })
                }
                keyboardType="numeric"
              />
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="NIP"
              placeholderTextColor={colors.lightBlue + 'CC'}
              value={formData.nip}
              onChangeText={(text) =>
                setFormData({ ...formData, nip: text })
              }
              keyboardType="numeric"
            />
          )}
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colors.lightBlue + 'CC'}
        value={formData.username}
        onChangeText={(text) =>
          setFormData({ ...formData, username: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.lightBlue + 'CC'}
        secureTextEntry
        value={formData.password}
        onChangeText={(text) =>
          setFormData({ ...formData, password: text })
        }
      />

      {type === 'register' && userType === 'mahasiswa' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            placeholderTextColor={colors.lightBlue + 'CC'}
            value={formData.alamat}
            onChangeText={(text) =>
              setFormData({ ...formData, alamat: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Nomor HP"
            placeholderTextColor={colors.lightBlue + 'CC'}
            value={formData.nomor_hp}
            onChangeText={(text) =>
              setFormData({ ...formData, nomor_hp: text })
            }
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Nomor Keluarga"
            placeholderTextColor={colors.lightBlue + 'CC'}
            value={formData.nomor_keluarga}
            onChangeText={(text) =>
              setFormData({ ...formData, nomor_keluarga: text })
            }
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Asal Sekolah"
            placeholderTextColor={colors.lightBlue + 'CC'}
            value={formData.asal_sekolah}
            onChangeText={(text) =>
              setFormData({ ...formData, asal_sekolah: text })
            }
          />
        </>
      )}

      {type === 'register' && userType === 'dosen' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            placeholderTextColor={colors.lightBlue + 'CC'}
            value={formData.alamat}
            onChangeText={(text) =>
              setFormData({ ...formData, alamat: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Nomor HP"
            placeholderTextColor={colors.lightBlue + 'CC'}
            value={formData.nomor_hp}
            onChangeText={(text) =>
              setFormData({ ...formData, nomor_hp: text })
            }
            keyboardType="phone-pad"
          />
        </>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>
          {type === 'login' ? 'Masuk' : 'Daftar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderColor: colors.lightBlue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: colors.lightBackground,
    color: colors.textLight,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: colors.accentBlue,
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  submitText: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AuthForm;
