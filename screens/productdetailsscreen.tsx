import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { RootStackParamList } from '../App';
import { useAppContext } from '../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ navigation, route }: Props) {
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace('Login');
    }
  }, [isLoggedIn]);

  const product = route.params;

  if (
    !product ||
    !product.name ||
    !product.description ||
    !product.price ||
    !product.shop
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Błąd</Text>
        <Text style={styles.text}>
          Nie udało się załadować danych produktu.
        </Text>

        <Button title="Wróć" onPress={() => navigation.goBack()} />
      </View>
    );
  }

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