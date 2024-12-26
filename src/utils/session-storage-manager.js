const SessionStorageManager = {
  setSessionStorage: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },

  getSessionStorage: (name) => {
    const data = sessionStorage.getItem(name);
    if (data) {
      return data;
    }
    return data;
  },

  removeSessionStorage: (name) => {
    return sessionStorage.removeItem(name);
  },

  clearSessionStorage: () => {
    return sessionStorage.clear();
  },
};

export default SessionStorageManager;
