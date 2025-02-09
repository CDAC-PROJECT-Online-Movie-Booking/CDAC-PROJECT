import api from "./api";

export const processPayment = async (paymentData) => {
  const response = await api.post("/payments", paymentData);
  return response.data;
};

export const getPaymentDetails = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};

export const getTotalRevenue = async () => {
  const response = await api.get("/reports/revenue");
  return response.data;
};
