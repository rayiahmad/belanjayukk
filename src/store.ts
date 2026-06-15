import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  deskripsi: string;
  harga: string;
  kategoriId: string;
  kategori: {
    id: string;
    name: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Store {
  products: Product[];
  cart: CartItem[];
  searchTerm: string;
  kategoriName: string | null;
  categories: Category[];
  selectedItems: Record<string, boolean>; // New property for selected items
  setSearchTerm: (term: string) => void;
  setKategoriName: (name: string | null) => Promise<void>;
  fetchProducts: (
    searchTerm?: string,
    kategoriId?: string | null
  ) => Promise<void>;
  fetchRecommendedProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  removeItemsFromCart: (productIds: string[]) => void;
  removeSelectedItemsFromCart: (productIds: string[]) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
  toggleItemSelection: (productId: string) => void; // New function for toggling item selection
  selectAllItems: () => void; // New function for selecting all items
  clearSelection: () => void; // New function for clearing selection
}

const LOCAL_STORAGE_KEYS = {
  CART: "cart",
  SEARCH_TERM: "searchTerm",
  KATEGORI_NAME: "kategoriName",
  CATEGORIES: "categories",
  SELECTED_ITEMS: "selectedItems", // New key for selected items
};

const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const useStore = create<Store>((set, get) => {
  const initializeState = () => ({
    cart: getFromLocalStorage(LOCAL_STORAGE_KEYS.CART) || [],
    searchTerm: getFromLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_TERM) || "",
    kategoriName: getFromLocalStorage(LOCAL_STORAGE_KEYS.KATEGORI_NAME) || null,
    categories: getFromLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES) || [],
    selectedItems: getFromLocalStorage(LOCAL_STORAGE_KEYS.SELECTED_ITEMS) || {},
  });

  const { cart, searchTerm, kategoriName, categories, selectedItems } =
    initializeState();

  return {
    products: [],
    cart,
    searchTerm,
    kategoriName,
    categories,
    selectedItems,

    setSearchTerm: (term) => {
      set({ searchTerm: term });
      saveToLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_TERM, term);
    },

    setKategoriName: async (name) => {
      const kategori = get().categories.find(
        (category) => category.name === name
      );
      const kategoriId = kategori ? kategori.id : null;
      set({ kategoriName: name });
      saveToLocalStorage(LOCAL_STORAGE_KEYS.KATEGORI_NAME, name);
      try {
        await get().fetchProducts(get().searchTerm, kategoriId);
      } catch (error) {
        toast.error("Failed to fetch products for the selected category.");
      }
    },

    fetchRecommendedProducts: async () => {
      try {
        const response = await axios.get("/api/products");
        set({ products: response.data });
      } catch (error) {
        toast.error("Error fetching recommended products.");
      }
    },
    

    fetchProducts: async (
      searchTerm = "",
      kategoriId: string | null = null
    ) => {
      try {
        const response = await axios.get("/api/products", {
          params: { search: searchTerm, kategori: kategoriId || "" },
        });
        set({ products: response.data });
      } catch (error) {
        toast.error("Error fetching products.");
      }
    },

    fetchCategories: async () => {
      try {
        const response = await axios.get("/api/kategori");
        set({ categories: response.data });
        saveToLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES, response.data);
      } catch (error) {
        toast.error("Error fetching categories.");
      }
    },

    addToCart: (product) => {
      set((state) => {
        const existingItem = state.cart.find(
          (item) => item.product.id === product.id
        );
        const newCart = existingItem
          ? state.cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { product, quantity: 1 }];
        saveToLocalStorage(LOCAL_STORAGE_KEYS.CART, newCart);
        return { cart: newCart };
      });
    },

    removeFromCart: (productId) => {
      set((state) => ({
        cart: state.cart.filter((item) => item.product.id !== productId),
      }));
      saveToLocalStorage(LOCAL_STORAGE_KEYS.CART, get().cart);
      toast.success("Produk dihapus");
    },

    removeItemsFromCart: (productIds) => {
      set((state) => ({
        cart: state.cart.filter(
          (item) => !productIds.includes(item.product.id)
        ),
      }));
      saveToLocalStorage(LOCAL_STORAGE_KEYS.CART, get().cart);
    },

    removeSelectedItemsFromCart: (productIds) => {
      set((state) => ({
        cart: state.cart.filter(
          (item) => !productIds.includes(item.product.id)
        ),
        selectedItems: Object.fromEntries(
          Object.entries(state.selectedItems).filter(
            ([key]) => !productIds.includes(key)
          )
        ),
      }));
      saveToLocalStorage(LOCAL_STORAGE_KEYS.CART, get().cart);
      saveToLocalStorage(
        LOCAL_STORAGE_KEYS.SELECTED_ITEMS,
        get().selectedItems
      );
    },

    incrementQuantity: (productId) => {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
      saveToLocalStorage(LOCAL_STORAGE_KEYS.CART, get().cart);
    },

    decrementQuantity: (productId) => {
      set((state) => {
        const item = state.cart.find((item) => item.product.id === productId);
        if (item && item.quantity > 1) {
          return {
            cart: state.cart.map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        } else if (item && item.quantity === 1) {
          return {
            cart: state.cart.filter((item) => item.product.id !== productId),
          };
        }
        return { cart: state.cart };
      });
      saveToLocalStorage(LOCAL_STORAGE_KEYS.CART, get().cart);
    },

    clearCart: () => {
      set({ cart: [], selectedItems: {} });
      saveToLocalStorage(LOCAL_STORAGE_KEYS.CART, []);
      saveToLocalStorage(LOCAL_STORAGE_KEYS.SELECTED_ITEMS, {});
    },
    toggleItemSelection: (productId) => {
      set((state) => {
        const isSelected = state.selectedItems[productId];
        return {
          selectedItems: {
            ...state.selectedItems,
            [productId]: !isSelected,
          },
        };
      });
      saveToLocalStorage(
        LOCAL_STORAGE_KEYS.SELECTED_ITEMS,
        get().selectedItems
      );
    },

    selectAllItems: () => {
      set((state) => ({
        selectedItems: state.cart.reduce((acc, item) => {
          acc[item.product.id] = true;
          return acc;
        }, {} as Record<string, boolean>),
      }));
      saveToLocalStorage(
        LOCAL_STORAGE_KEYS.SELECTED_ITEMS,
        get().selectedItems
      );
    },

    clearSelection: () => {
      set({ selectedItems: {} });
      saveToLocalStorage(LOCAL_STORAGE_KEYS.SELECTED_ITEMS, {});
    },
  };
});
