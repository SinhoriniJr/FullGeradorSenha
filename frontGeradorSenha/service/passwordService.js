import api from "./api";

export function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%*";
  let senha = "";

  for (let i = 0; i < 8; i++) {
    senha += chars[Math.floor(Math.random() * chars.length)];
  }

  return senha;
}

export const savePassword = (senha, descricao) => {
  return api.post("/api/passwords", { senha, descricao });
};

export const getUserPasswords = () => {
  return api.get("/api/passwords");
};

export const deletePassword = (id) => {
  return api.delete(`/api/passwords/${id}`);
};