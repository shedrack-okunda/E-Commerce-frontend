import { axio } from "../../config/axios";

export const fetchAllBrands = async () => {
  try {
    const res = await axio.get("/brands");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
