import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Logowanie' }} />
        <Stack.Screen name="home" options={{ title: 'Lista produktów' }} />
        <Stack.Screen name="add-product" options={{ title: 'Dodaj produkt' }} />
        <Stack.Screen name="details" options={{ title: 'Szczegóły produktu' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
