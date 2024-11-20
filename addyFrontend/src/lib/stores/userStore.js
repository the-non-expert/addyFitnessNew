import { writable } from "svelte/store";
import { token } from "./auth.js"; // Import the token store from auth.js

const createUserStore = () => {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    setUser: (userData) => {
      set(userData);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    },
    clearUser: () => {
      set(null);
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("userData");
      }
    },
    update: (data) => update((n) => ({ ...n, ...data })),
  };
};

export const user = createUserStore();

// Initialize user data from localStorage if available
if (typeof localStorage !== "undefined") {
  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    user.setUser(JSON.parse(storedUser));
  }
}

// Subscribe to token changes
token.subscribe((value) => {
  if (!value) {
    user.clearUser();
  }
});
