import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [shop, setShop] = useState('');

  const saveProduct = () => {
    if (name.trim() === '' || price.trim() === '' || shop.trim() === '') {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
    }

    Alert.alert('Sukces', 'Produkt został zapisany');
    router.back();
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