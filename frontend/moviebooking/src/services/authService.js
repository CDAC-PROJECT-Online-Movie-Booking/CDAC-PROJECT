import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const signup = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/users/me");
  return response.data;
};


export const verify = async (email , otp) => {
  const response = await api.post("/auth/verify-otp" , {email , otp});
  return response.data;
}
