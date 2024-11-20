import { writable } from "svelte/store";

export const token = writable(null);
export const user = writable(null);

export function setAuth(newToken, newUser) {
  token.set(newToken);
  user.set(newUser);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("token", newToken);
  }
}

export function clearAuth() {
  token.set(null);
  user.set(null);
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("token");
  }
}

// Initialize from localStorage
if (typeof localStorage !== "undefined") {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setAuth(storedToken, null); // You might want to fetch user data here
  }
}
