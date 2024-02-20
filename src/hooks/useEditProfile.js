import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import axios from 'axios';
import data from "../config.json";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const url = data.url_base;
	const token = authUser.token;
	
	const showToast = useShowToast();

	const editProfile = async (inputs) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		try {

			const updatedUser = {
				"firstName": inputs.firstName,
				"lastName": inputs.lastName,
				"about": inputs.about
			};


			const response = await axios.put(`${url}/api/user/${authUser.user.id}`, updatedUser,{
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			let user = authUser.user;

			user = {
				...user,
                ...updatedUser
			}			

			const newAuthUser = {
				...authUser,
                user: user,
			}

			localStorage.setItem("user-info", JSON.stringify(newAuthUser));
			setAuthUser(newAuthUser);
			setUserProfile(user);
			showToast("Success", "Profile updated successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;
