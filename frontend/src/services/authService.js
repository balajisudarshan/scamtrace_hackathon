import { api } from "./api";

export const loginWithGoogle = async (credential) => {
  return api.auth.loginGoogle(credential);
};

export const loginWithEmail = async (email, password) => {
  return api.auth.login(email, password);
};

export const registerWithEmail = async (firstName, lastName, email, password) => {
  return api.auth.register(firstName, lastName, email, password);
};

export const logout = async () => {
  return api.auth.logout();
};

export const getCurrentUser = async () => {
  return api.auth.me();
};
