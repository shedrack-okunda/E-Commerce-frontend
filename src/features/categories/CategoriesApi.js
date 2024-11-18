import { axio } from "../../config/axios";

export const fetchAllCategories = async () => {
  try {
    const res = await axio.get("/categories");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
