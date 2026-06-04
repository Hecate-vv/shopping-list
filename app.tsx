import { Text, View } from 'react-native';
import AppProvider from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000', fontSize: 24 }}>Provider działa</Text>
      </View>
    </AppProvider>
  );
}