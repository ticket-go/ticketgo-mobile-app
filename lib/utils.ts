import * as SecureStore from "expo-secure-store";

export async function getSecureItem(key: string) {
  return await SecureStore.getItemAsync(key);
}

// Função auxiliar para salvar dados no SecureStore
export async function saveSecureItem(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

// Função auxiliar para remover dados do SecureStore
export async function deleteSecureItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}
