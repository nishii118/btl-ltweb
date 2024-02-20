import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";
import useAuthStore from "../store/authStore";
import axios from "axios";
import data from "../config.json";

const useGetUserProfileByUsername = (username) => {
	
	const showToast = useShowToast();
	const { userProfile, setUserProfile } = useUserProfileStore();
	const [isLoading, setIsLoading] = useState(true);
	const userAuth = useAuthStore((state) => state.user).token;


	useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
			try {

				const url = data.url_base;

				const response = await axios.get(`${url}/api/user/profile/?username=${username}`, {
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
	}, [setUserProfile, username, showToast]);


	return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
