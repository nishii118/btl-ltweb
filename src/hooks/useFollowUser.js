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

	const url = data.url_base;

	const token = authUser.token;

	const userRefId = authUser.user.id;


	const handleFollowUser = async () => {
		setIsUpdating(true);
		try {
			
			const response = await axios.get(`${url}/api/friend/${userRefId}`, {
                headers: {
					Authorization: `Bearer ${token}`
    			}
            }).then((response) => response.data);

			const data =  await response.data;

			let isFollowing = await data.length > 0 ? data[0].isFriend : 0;

			let isAccepted = 0;

			await data.forEach(element => {
				if (element.senderId.id === userRefId && element.receiverId.id === userId) {
					isFollowing = 1;
					isAccepted = 1;
				}
			});


			if (isFollowing) {
				// unfollow
				
				const body = {
					...data[0],
					isFriend: 0,
				}

				const response = await axios.put(`${url}/api/friend/`, body, {
					headers: {
                        Authorization: `Bearer ${token}`,
						'Access-Control-Allow-Origin': '*'
                    }
				})

				setAuthUser({
					...authUser,
					following: authUser.following.filter((id) => id != userId),
				});

				localStorage.setItem(
					"user-info",
					JSON.stringify({
						...authUser,
						following: authUser.following.filter((id) => id != userId),
					})
				);
				setIsFollowing(false);
			} else {
				// follow

				if (isAccepted) {

					const body = {
						...data[0],
						isFriend: 1,
					}
	
					const response = await axios.put(`${url}/api/friend/`, body, {
						headers: {
							Authorization: `Bearer ${token}`,
							'Access-Control-Allow-Origin': '*'
						}
					})
	
					setIsFollowing(true);

				}else{

					const body = {
						senderId: userRefId,
						receiverId: userId,
						isFriend: 1,
					}
	
					const response = await axios.post(`${url}/api/friend/`, body, {
						headers: {
							Authorization: `Bearer ${token}`,
							'Access-Control-Allow-Origin': '*'
						}
					})
	
					setIsFollowing(true);
					
					setAuthUser({
						...authUser,
						following: [...authUser.following, userId],
					});
	
					localStorage.setItem(
						"user-info",
						JSON.stringify({
							...authUser,
							following: [...authUser.following, userId],
						})
					);
				
				}
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	useEffect(() => {
		if (authUser) {
			const isFollowing = authUser.following.includes(userId) ?  1 : 0;
			setIsFollowing(isFollowing);
		}
	}, [authUser, userId]);

	return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
