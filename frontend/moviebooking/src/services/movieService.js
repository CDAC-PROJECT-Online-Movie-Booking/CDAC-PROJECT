import api from "./api";

export const getMovies = async () => {
  const response = await api.get("/movies");
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

export const addMovie = async (movieData) => {
  const response = await api.post("/admin/movies", movieData);
  return response.data;
};

export const updateMovie = async (id, movieData) => {
  const response = await api.put(`/admin/movies/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await api.delete(`/admin/movies/${id}`);
  return response.data;
};
