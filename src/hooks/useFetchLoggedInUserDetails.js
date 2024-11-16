import { useEffect } from "react";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressByUserIdAsync } from "../features/address/AddressSlice";

export const useFetchLoggedInUserDetails = (deps) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deps && loggedInUser?.isVerified) {
      dispatch();

      if (!loggedInUser.isAdmin) {
        dispatch(fetchAddressByUserIdAsync(loggedInUser?._id));
      }
    }
  });
};
