import { Stack } from 'expo-router';
import { colors } from '../../constants/colors';

export default function MahasiswaLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[npm]" 
        options={{ 
          title: 'Detail Mahasiswa',
          headerStyle: { backgroundColor: colors.darkBlue },
          headerTintColor: colors.lightBlue,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
    </Stack>
  );
}