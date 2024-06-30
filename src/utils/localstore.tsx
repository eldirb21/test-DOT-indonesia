import EncryptedStorage from 'react-native-encrypted-storage';

const httpStore = {
  async getStore(key: string) {
    try {
      const jsonValue = await EncryptedStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  },
  async postStore(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await EncryptedStorage.setItem(key, jsonValue);
    } catch (e) {}
  },
  async deleteStore(key: string) {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (e) {}
  },
  async clearStore() {
    try {
      await EncryptedStorage.clear();
    } catch (e) {}
  },
};
export default httpStore;
