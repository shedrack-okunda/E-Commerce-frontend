import { axio } from "../../config/axios";

export const addAddress = async (address) => {
  try {
    const res = await axio.post("/address", address);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchAddressByUserId = async (id) => {
  try {
    const res = await axio.get(`/address/user/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateAddressById = async (update) => {
  try {
    const res = await axio.patch(`/address/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteAddressById = async (id) => {
  try {
    const res = await axio.delete(`/address/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
