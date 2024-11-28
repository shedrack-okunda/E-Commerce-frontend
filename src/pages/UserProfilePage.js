import React from "react";
import { Navbar } from "../features/navigation/components/Navbar";
import { UserProfile } from "../features/user/components/UserProfile";

export const UserProfilePage = () => {
  return (
    <>
      <Navbar />
      <UserProfile />
    </>
  );
};
