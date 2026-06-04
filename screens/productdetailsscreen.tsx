import { useEffect } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAppContext } from '../context/AppContext';


export default function ProductDetailsScreen({ navigation, route }: any) {
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace('Login');
    }
  }, [isLoggedIn]);

  if (
  !route.params ||
  !route.params.name ||
  !route.params.description ||
  !route.params.price ||
  !route.params.shop
) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Błąd</Text>

      <Text style={styles.text}>
        Nie udało się załadować danych produktu.
      </Text>

      <Button
        title="Wróć"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
const product = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły produktu</Text>

      <Text style={styles.text}>Nazwa: {product.name}</Text>
      <Text style={styles.text}>Opis: {product.description}</Text>
      <Text style={styles.text}>Cena: {product.price} zł</Text>
      <Text style={styles.text}>Sklep: {product.shop}</Text>
      <Text style={styles.text}>
        Status: {product.bought ? 'Kupione' : 'Do kupienia'}
      </Text>

      <Button title="Wróć" onPress={() => navigation.goBack()} />
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