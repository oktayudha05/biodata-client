import { Stack } from 'expo-router';
import { colors } from '../../constants/colors';

export default function DosenLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[nip]" 
        options={{ 
          title: 'Detail Dosen',
          headerStyle: { backgroundColor: colors.darkBlue },
          headerTintColor: colors.lightBlue,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
    </Stack>
  );
}