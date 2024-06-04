import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IUserRole } from "../models/IUser/IUserRole";

const fetchUserRole = async (): Promise<IUserRole[]> => {
  const response: AxiosResponse<IUserRole[]> = await axios.get(
    "http://localhost:5000/users"
  );
  return response.data;
};

const Profile: React.FC = () => {
  const [roles, setRoles] = useState<IUserRole["roles"]>([]);

  useEffect(() => {
    const getUserRoles = async () => {
      try {
        const userData = await fetchUserRole();
        console.log("UserData:", userData); // Логируем все данные
        if (userData.length > 0) {
          setRoles(userData[0].roles); // Обращаемся к первому элементу массива и его полю roles
        }
      } catch (error) {
        console.error("Error fetching user roles", error);
      }
    };

    getUserRoles();
  }, []);

  return (
    <div>
      <h1>User</h1>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            Role: {role.value} - {role.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
