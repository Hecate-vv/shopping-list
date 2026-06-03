import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista produktów</Text>

      <Button
        title="Dodaj produkt"
        onPress={() => router.push('/add-product')}
      />

      <View style={styles.productBox}>
        <Text style={styles.productName}>Mleko</Text>
        <Text>Sklep: Lidl</Text>
        <Text>Cena: 4.99 zł</Text>

        <Button
          title="Szczegóły"
          onPress={() =>
            router.push({
              pathname: '/details',
              params: {
                name: 'Mleko',
                price: '4.99',
                shop: 'Lidl',
              },
            })
          }
        />
      </View>
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
  productBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});