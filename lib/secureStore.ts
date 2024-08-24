import * as SecureStore from "expo-secure-store";

export const setStoreItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    throw error;
  }
};

export const deleteStoreItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    throw error;
  }
};

export const getStoreItem = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    throw error;
  }
};
