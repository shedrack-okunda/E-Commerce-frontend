import { axio } from "../../config/axios";

export const createReview = async (review) => {
  try {
    const res = await axio.post("/reviews", review);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchReviewsByProductId = async (id) => {
  try {
    const res = await axio.get(`/reviews/product/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateReviewById = async (update) => {
  try {
    const res = await axio.patch(`/reviews/${update._id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteReviewById = async (id) => {
  try {
    const res = await axio.delete(`/reviews/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
