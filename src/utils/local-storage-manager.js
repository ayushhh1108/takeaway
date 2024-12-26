const LocalStorageManager = {
  setLocalStorage: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },

  getLocalStorage: (name) => {
    const data = localStorage.getItem(name);
    if (data) {
      return JSON.parse(data); // Parse the data before returning it
    }
    return null; // Return null if no data is found
  },

  removeLocalStorage: (name) => {
    return localStorage.removeItem(name);
  },

  clearLocalStorage: () => {
    return localStorage.clear();
  },
  
  clearCart: () => {
    localStorage.setItem("cart", JSON.stringify([]));
  },

  isUserAvailable: () => {
    const user = LocalStorageManager.getLocalStorage("user");
    return !!user?.token;
  },
  getUserData: () => {
    if (!LocalStorageManager.isUserAvailable()) {
      return null;
    }
    const user = LocalStorageManager.getLocalStorage("user");
    return user;
  },
  getToken: () => {
    const user = LocalStorageManager.getLocalStorage("user");
    return user?.token;
  },
};

export default LocalStorageManager;
