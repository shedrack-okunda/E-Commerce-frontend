import { axio } from "../../config/axios";

export const addToCart = async (item) => {
  try {
    const res = await axio.post("/cart", item);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchCartByUserId = async (id) => {
  try {
    const res = await axio.get(`/cart/user/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCartItemById = async (update) => {
  try {
    const res = await axio.patch(`/cart/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCartItemById = async (id) => {
  try {
    const res = await axio.delete(`/cart/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetCartByUserId = async (userId) => {
  try {
    const res = await axio.delete(`/cart/user/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
