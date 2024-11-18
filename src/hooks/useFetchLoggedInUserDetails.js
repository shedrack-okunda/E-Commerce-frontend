import { useEffect } from "react";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressByUserIdAsync } from "../features/address/AddressSlice";
import { fetchWishlistByUserIdAsync } from "../features/wishlist/WishlistSlice";
import { fetchCartByUserIdAsync } from "../features/cart/CartSlice";
import { fetchAllCategoriesAsync } from "../features/categories/CategoriesSlice";
import { fetchAllBrandsAsync } from "../features/brands/BrandSlice";
import { fetchLoggedInUserByIdAsync } from "../features/user/UserSlice";

export const useFetchLoggedInUserDetails = (deps) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deps && loggedInUser?.isVerified) {
      dispatch(fetchLoggedInUserByIdAsync(loggedInUser?._id));
      dispatch(fetchAllBrandsAsync());
      dispatch(fetchAllCategoriesAsync());

      if (!loggedInUser.isAdmin) {
        dispatch(fetchCartByUserIdAsync(loggedInUser?._id));
        dispatch(fetchAddressByUserIdAsync(loggedInUser?._id));
        dispatch(fetchWishlistByUserIdAsync(loggedInUser?._id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
};
