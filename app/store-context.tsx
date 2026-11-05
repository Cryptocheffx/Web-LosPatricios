"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "../lib/products";

type CartLine = { productId: string; quantity: number };

type StoreContextValue = {
  cart: CartLine[];
  cartCount: number;
  isCartOpen: boolean;
  storageError: string | null;
  addToCart: (productId: string, quantity?: number) => void;
  setCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "los-patricios-cart-v1";
const StoreContext = createContext<StoreContextValue | null>(null);

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;

  const line = value as Record<string, unknown>;
  return (
    typeof line.productId === "string" &&
    products.some((product) => product.id === line.productId) &&
    typeof line.quantity === "number" &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0 &&
    line.quantity <= 99
  );
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(isCartLine)) {
          setCart(parsed);
        } else {
          console.error("El carrito guardado tiene un formato no válido.");
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("No se pudo recuperar el carrito guardado.", error);
      setStorageError("No se pudo recuperar el carrito guardado en este dispositivo.");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("No se pudo guardar el carrito en este dispositivo.", error);
      setStorageError("El carrito no se puede guardar en este dispositivo.");
    }
  }, [cart, ready]);

  const addToCart = useCallback((productId: string, amount = 1) => {
    const quantity = Math.min(99, Math.max(1, Math.floor(amount)));
    setCart((current) => {
      const existing = current.find((line) => line.productId === productId);
      if (!existing) return [...current, { productId, quantity }];
      return current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: Math.min(99, line.quantity + quantity) }
          : line,
      );
    });
    setCartOpen(true);
  }, []);

  const setCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setCart((current) =>
          current.filter((line) => line.productId !== productId),
        );
        return;
      }
      setCart((current) =>
        current.map((line) =>
          line.productId === productId
            ? { ...line, quantity: Math.min(99, Math.floor(quantity)) }
            : line,
        ),
      );
    },
    [],
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((line) => line.productId !== productId));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      isCartOpen,
      storageError,
      addToCart,
      setCartQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      cart,
      cartCount,
      isCartOpen,
      storageError,
      addToCart,
      setCartQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore debe utilizarse dentro de StoreProvider.");
  }
  return context;
}
