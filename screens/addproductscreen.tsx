import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { RootStackParamList } from '../App';
import { useAppContext } from '../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'AddProduct'>;

export default function AddProductScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [shop, setShop] = useState('');

  const { isLoggedIn, products, addProduct } = useAppContext();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace('Login');
    }
  }, [isLoggedIn]);

  const saveProduct = () => {
  if (
    name.trim() === '' ||
    description.trim() === '' ||
    price.trim() === '' ||
    shop.trim() === ''
  ) {
    Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
    return;
  }

  const productExists = products.some(
    (product) =>
      product.name.trim().toLowerCase() === name.trim().toLowerCase() &&
      product.shop.trim().toLowerCase() === shop.trim().toLowerCase()
  );

  if (productExists) {
    Alert.alert('Błąd', 'Taki produkt z tego sklepu już istnieje');
    return;
  }
    addProduct(name, description, price, shop);

    Alert.alert('Sukces', 'Produkt został dodany');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj produkt</Text>

      <TextInput
        style={styles.input}
        placeholder="Nazwa produktu"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Opis produktu"
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Cena"
        placeholderTextColor="#666"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Sklep"
        placeholderTextColor="#666"
        value={shop}
        onChangeText={setShop}
      />

      <Button title="Zapisz produkt" onPress={saveProduct} />

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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
});