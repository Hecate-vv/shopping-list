import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider } from './context/AppContext';

import AddProductScreen from './screens/AddProductScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddProduct: undefined;
  ProductDetails: {
    id: string;
    name: string;
    description: string;
    price: string;
    shop: string;
    bought: boolean;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Logowanie' }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Lista produktów' }}
          />

          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{ title: 'Dodaj produkt' }}
          />

          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: 'Szczegóły produktu' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}