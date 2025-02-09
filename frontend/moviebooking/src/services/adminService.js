import api from "./api";

export const getTheaters = async () => {
  const response = await api.get("/theaters");
  return response.data;
};

export const addTheater = async (theaterData) => {
  const response = await api.post("/theaters", theaterData);
  return response.data;
};

export const updateTheater = async (theaterId, theaterData) => {
  const response = await api.put(`/theaters/${theaterId}`, theaterData);
  return response.data;
};

export const deleteTheater = async (theaterId) => {
  const response = await api.delete(`/theaters/${theaterId}`);
  return response.data;
};

export const getCities = async () => {
  const response = await api.get("/cities");
  return response.data;
};
