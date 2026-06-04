import { createContext, useContext, useState, type ReactNode } from 'react';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  shop: string;
  bought: boolean;
};

type AppContextType = {
  isLoggedIn: boolean;
  loginUser: () => void;
  logoutUser: () => void;
  products: Product[];
  addProduct: (
    name: string,
    description: string,
    price: string,
    shop: string
  ) => void;
  deleteProduct: (id: string) => void;
  toggleBought: (id: string) => void;
};

const AppContext = createContext<AppContextType | null>(null);

function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const loginUser = () => {
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
  };

  const addProduct = (
    name: string,
    description: string,
    price: string,
    shop: string
  ) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      description,
      price,
      shop,
      bought: false,
    };

    setProducts((currentProducts) => [newProduct, ...currentProducts]);
  };

  const deleteProduct = (id: string) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );
  };

  const toggleBought = (id: string) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id === id) {
          return { ...product, bought: !product.bought };
        }

        return product;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        loginUser,
        logoutUser,
        products,
        addProduct,
        deleteProduct,
        toggleBought,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}

export default AppProvider;