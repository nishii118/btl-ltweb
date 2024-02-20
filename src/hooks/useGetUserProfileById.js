import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import data from "../config.json";
import axios from "axios";
import useAuthStore from "../store/authStore";

const useGetUserProfileById = (userId) => {
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState(null);
	const userAuth = useAuthStore((state) => state.user).token;

	const showToast = useShowToast();

	useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
			setUserProfile(null);
			try {
				const url = data.url_base;

				const response = await axios.get(`${url}/api/user/${userId}`, {
					headers: {
						Authorization: `Bearer ${userAuth}`,
					}
				})
				
				setUserProfile(response.data.data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};
		getUserProfile();
	}, [showToast, setUserProfile, userId]);

	return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
