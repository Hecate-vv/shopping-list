import { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  const [products, setProducts] = useState<any[]>([]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [shop, setShop] = useState('');

  const [shopFilter, setShopFilter] = useState('');

  const addProduct = () => {
    if (name.trim() === '' || price.trim() === '' || shop.trim() === '') {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: name,
      price: price,
      shop: shop,
      bought: false,
    };

    setProducts([newProduct, ...products]);

    setName('');
    setPrice('');
    setShop('');
  };

  const deleteProduct = (id: string) => {
    const newList = products.filter((item) => item.id !== id);
    setProducts(newList);
  };

  const toggleBought = (id: string) => {
    const updatedList = products.map((item) => {
      if (item.id === id) {
        return { ...item, bought: !item.bought };
      }
      return item;
    });

    setProducts(updatedList);
  };

  const filteredProducts = products.filter((item) => {
    if (shopFilter.trim() === '') return true;
    return item.shop.toLowerCase().includes(shopFilter.toLowerCase());
  });

  const toBuy = filteredProducts.filter((item) => item.bought === false);
  const bought = filteredProducts.filter((item) => item.bought === true);

  const sections = [
    { title: 'Do kupienia', data: toBuy },
    { title: 'Kupione', data: bought },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista zakupów</Text>

      <Text style={styles.subtitle}>Dodaj produkt</Text>

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

      <Button title="Dodaj produkt" onPress={addProduct} />

      <View style={styles.filterBox}>
        <Text style={styles.subtitle}>Filtr po sklepie</Text>
        <TextInput
          style={styles.input}
          placeholder="Wpisz nazwę sklepu"
          value={shopFilter}
          onChangeText={setShopFilter}
        />
      </View>

      {filteredProducts.length === 0 ? (
        <Text style={styles.emptyText}>Brak produktów na liście</Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) =>
            section.data.length > 0 ? (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            ) : null
          }
          renderItem={({ item }) => (
            <View style={styles.productBox}>
              <Text>Nazwa: {item.name}</Text>
              <Text>Cena: {item.price} zł</Text>
              <Text>Sklep: {item.shop}</Text>
              <Text>
                Status: {item.bought ? 'Kupione' : 'Do kupienia'}
              </Text>

              <Button
                title={item.bought ? 'Cofnij' : 'Kupione'}
                onPress={() => toggleBought(item.id)}
              />

              <Button
                title="Usuń"
                color="red"
                onPress={() => deleteProduct(item.id)}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 18, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  filterBox: { marginTop: 20 },
  emptyText: { textAlign: 'center', marginTop: 20 },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  productBox: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
});