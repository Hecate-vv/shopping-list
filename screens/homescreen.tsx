import { useEffect } from 'react';
import {
  Alert,
  Button,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAppContext } from '../context/AppContext';

export default function HomeScreen({ navigation }: any) {
  const {
    isLoggedIn,
    products,
    deleteProduct,
    toggleBought,
    logoutUser,
  } = useAppContext();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace('Login');
    }
  }, [isLoggedIn]);

  const toBuy = products.filter((item) => item.bought === false);
  const bought = products.filter((item) => item.bought === true);

  const sections = [
    { title: 'Do kupienia', data: toBuy },
    { title: 'Kupione', data: bought },
  ];

  const handleLogout = () => {
    logoutUser();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista produktów</Text>

      <Button
        title="Dodaj produkt"
        onPress={() => navigation.navigate('AddProduct')}
      />

      <Button title="Wyloguj" color="gray" onPress={handleLogout} />

      {products.length === 0 ? (
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
              <Text style={styles.productName}>{item.name}</Text>
              <Text>Opis: {item.description}</Text>
              <Text>Cena: {item.price} zł</Text>
              <Text>Sklep: {item.shop}</Text>
              <Text>Status: {item.bought ? 'Kupione' : 'Do kupienia'}</Text>

              <Button
                title="Szczegóły"
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    shop: item.shop,
                    bought: item.bought,
                  })
                }
              />

              <Button
                title={item.bought ? 'Cofnij' : 'Kupione'}
                onPress={() => toggleBought(item.id)}
              />

              <Button
                title="Usuń"
                color="red"
                onPress={() => {
                  Alert.alert('Usuwanie', 'Czy na pewno chcesz usunąć produkt?', [
                    { text: 'Anuluj' },
                    { text: 'Usuń', onPress: () => deleteProduct(item.id) },
                  ]);
                }}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  productBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});