import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import data from "../config.json"
import axios from "axios";

const useFollowUser = (userId) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const { userProfile, setUserProfile } = useUserProfileStore();
	const showToast = useShowToast();

	const handleFollowUser = async () => {
		setIsUpdating(true);
		try {
			
			const url = data.url_base;

			const token = authUser.token;

			const userRefId = authUser.user.id;

			const response = await axios.post(`${url}/api/friend/${userId}`, {
                Headers: {
					Authorization: `Bearer ${token}`,
				}
            }).then((response) => response.data);

			const data = response.data.filter((data) => data.senderId.id === userRefId || data.reciverId.id === userRefId);

			const isFollowing = data[0].isFriend || 0;

			// if (isFollowing) {
			// 	// unfollow
			// 	setAuthUser({
			// 		...authUser,
			// 		following: authUser.following.filter((uid) => uid !== userId),
			// 	});

			// 	localStorage.setItem(
			// 		"user-info",
			// 		JSON.stringify({
			// 			...authUser,
			// 			following: authUser.following.filter((uid) => uid !== userId),
			// 		})
			// 	);
			// 	setIsFollowing(false);
			// } else {
			// 	// follow
			// 	setAuthUser({
			// 		...authUser,
			// 		following: [...authUser.following, userId],
			// 	});

			// 	localStorage.setItem(
			// 		"user-info",
			// 		JSON.stringify({
			// 			...authUser,
			// 			following: [...authUser.following, userId],
			// 		})
			// 	);
			// 	setIsFollowing(true);
			// }
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	useEffect(() => {
		if (authUser) {
			// const isFollowing = authUser.following.includes(userId);
			setIsFollowing(isFollowing);
		}
	}, [authUser, userId]);

	return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
