import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import axios from "axios";
import data from "../config.json";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const userAuth = useAuthStore((state) => state.user);

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);

    try {
      const url = data.url_base;

      const response = await axios.get(
        `${url}/api/user/profile/?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${userAuth.token}`,
          },
        }
      );
      if (response.status != 200) 
        return showToast("Error", "User not found", "error");

		setUser(response.data.data);
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
