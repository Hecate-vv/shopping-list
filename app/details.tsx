import { router, useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
  const { name, price, shop } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły produktu</Text>

      <Text style={styles.text}>Nazwa: {name}</Text>
      <Text style={styles.text}>Cena: {price} zł</Text>
      <Text style={styles.text}>Sklep: {shop}</Text>

      <Button title="Wróć" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
});