import api from "./api";

export const getTheaters = async () => {
  const response = await api.get("/theaters");
  return response.data;
};

export const addTheater = async (theaterData) => {
  const response = await api.post("/admin/theaters", theaterData);
  return response.data;
};

export const updateTheater = async (id, theaterData) => {
  const response = await api.put(`/admin/theaters/${id}`, theaterData);
  return response.data;
};

export const deleteTheater = async (id) => {
  const response = await api.delete(`/admin/theaters/${id}`);
  return response.data;
};
