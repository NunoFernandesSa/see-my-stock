import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  description?: string;
  currentStock: number;
  lowStockThreshold: number;
  categoryId: string;
  purchasePrice?: number;
  sellingPrice?: number;
  createdAt: string;
  updatedAt: string;
}

interface StockMovement {
  id: string;
  productId: string;
  type: "IN" | "OUT" | "ADJUST";
  quantity: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

interface StockState {
  // state
  products: Product[];
  movements: StockMovement[];
  loading: boolean;
  error: string | null;

  // filters
  filters: {
    category: string;
    lowStock: boolean;
    search: string;
  };

  // Getters methods
  getLowStockProducts: () => Product[];
  getFilteredProducts: () => Product[];
  getProductById: (id: string) => Product | undefined;
  getTotalStockValue: () => number;

  // Actions methods for products
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Actions for stock movements
  fetchMovements: (productId?: string) => Promise<void>;
  addMovement: (
    movement: Omit<StockMovement, "id" | "createdAt">,
  ) => Promise<void>;

  // Actions for filters
  setFilter: <K extends keyof StockState["filters"]>(
    key: K,
    value: StockState["filters"][K],
  ) => void;
  resetFilters: () => void;

  // Actions for selected product (for forms or details view)
  setSelectedProduct: (product: Product | null) => void;
  selectedProduct: Product | null;
}

export const useStockStore = create<StockState>()(
  persist(
    (set, get) => ({
      // state
      products: [],
      movements: [],
      loading: false,
      error: null,
      selectedProduct: null,

      // filters
      filters: {
        category: "all",
        lowStock: false,
        search: "",
      },

      // Getters methods
      getLowStockProducts: () => {
        const { products } = get();
        return products.filter(
          (product) => product.currentStock <= product.lowStockThreshold,
        );
      },

      getFilteredProducts: () => {
        const { products, filters } = get();
        return products.filter((product) => {
          // filter by category
          if (
            filters.category !== "all" &&
            filters.category &&
            product.categoryId !== filters.category
          ) {
            return false;
          }
          // filter by low stock
          if (
            filters.lowStock &&
            product.currentStock > product.lowStockThreshold
          ) {
            return false;
          }
          // filter by search
          if (
            filters.search &&
            !product.name.toLowerCase().includes(filters.search.toLowerCase())
          ) {
            return false;
          }
          return true;
        });
      },

      getProductById: (id) => {
        const { products } = get();
        return products.find((product) => product.id === id);
      },

      getTotalStockValue: () => {
        const { products } = get();
        return products.reduce(
          (total, product) =>
            total + (product.purchasePrice || 0) * product.currentStock,
          0,
        );
      },

      // Actions methods for products
      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("/api/products");
          if (!response.ok) throw new Error("Failed to fetch products");
          const data = await response.json();
          set({ products: data, loading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },

      addProduct: async (product) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          });
          if (!response.ok) throw new Error("Failed to add product");
          const data = await response.json();
          set((state) => ({
            products: [...state.products, data],
            loading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },

      updateProduct: async (id, updates) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
          });
          if (!response.ok) throw new Error("Failed to update product");
          const data = await response.json();
          set((state) => ({
            products: state.products.map((p) => (p.id === id ? data : p)),
            loading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },

      deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Failed to delete product");
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            loading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },

      // Actions for stock movements
      fetchMovements: async (productId?: string) => {
        set({ loading: true, error: null });
        try {
          const url = productId
            ? `/api/movements?productId=${productId}`
            : "/api/movements";
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to fetch movements");
          const data = await response.json();
          set({ movements: data, loading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },

      addMovement: async (movement) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("/api/movements", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movement),
          });
          if (!response.ok) throw new Error("Failed to add movement");
          const data = await response.json();

          // update state with new movement
          set((state) => ({
            movements: [data, ...state.movements],
            loading: false,
          }));

          // reload product data to update stock levels
          await get().fetchProducts();
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },

      // Actions for filters
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () =>
        set({
          filters: { category: "all", lowStock: false, search: "" },
        }),

      // Selected product
      setSelectedProduct: (product) => set({ selectedProduct: product }),
    }),
    {
      name: "stock-store",
      partialize: (state) => ({
        filters: state.filters,
      }),
    },
  ),
);
