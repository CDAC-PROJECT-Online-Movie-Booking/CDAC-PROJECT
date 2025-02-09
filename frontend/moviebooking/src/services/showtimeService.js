import api from "./api";

export const getShowtimesByMovieId = async (movieId) => {
  try {
    const response = await api.get(`/showtimes/by-movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
