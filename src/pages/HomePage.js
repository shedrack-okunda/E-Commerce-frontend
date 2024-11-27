/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Navbar } from "../features/navigation/components/Navbar";
import { Footer } from "../features/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAddressStatus,
  selectAddressStatus,
} from "../features/address/AddressSlice";

export const HomePage = () => {
  const dispatch = useDispatch();
  const addressStatus = useSelector(selectAddressStatus);

  useEffect(() => {
    if (addressStatus === "fulfilled") {
      dispatch(resetAddressStatus());
    }
  }, [addressStatus]);

  return (
    <>
      <Navbar isProductList={true} />
      <Footer />
    </>
  );
};
