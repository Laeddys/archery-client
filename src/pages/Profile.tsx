import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";

const Profile = () => {
  const { user } = useAppSelector((state) => state.authSlice);

  // добавить аватар
  return (
    <div>
      <h1>{user.email}</h1>
      <h1>{user.id}</h1>
    </div>
  );
};

export default Profile;
