import api from "./api";

export const getRevenueByMovie = async () => {
  const response = await api.get("/reports/revenue-by-movie");
  return response.data;
};
