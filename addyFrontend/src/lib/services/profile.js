import { get, put } from "../api.js";

export async function fetchUserProfile(token) {
  if (!token) {
    throw new Error("Token is required to fetch user profile");
  }
  return get("/users/me", token);
}

export async function updateUserProfile(data, token) {
  if (!token) {
    throw new Error("Token is required to update user profile");
  }
  if (!data) {
    throw new Error("Data is required to update user profile");
  }
  return put("/users/me", data, token);
}
