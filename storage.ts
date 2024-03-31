import * as SecureStore from "expo-secure-store";

export function getItem<T>(key: string): T {
  const value = SecureStore.getItemAsync(key);
  console.log(value);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  SecureStore.deleteItemAsync(key);
}
