import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import data from "../config.json"
import axios from 'axios';
import useAuthStore from "../store/authStore";

const useGetUserPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const showToast = useShowToast();
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const url = data.url_base;
	const token = authUser.token;

	useEffect(() => {
		const getPosts = async () => {
			if (!userProfile) return;
			setIsLoading(true);
			setPosts([]);

			try {
				
				const userId = userProfile.id;

				const response = await axios.get(`${url}/api/post/?id=${userId}`,{
					headers: {
                        Authorization: `Bearer ${token}`
                    }
				});

				const posts = response.data.data;
				posts.sort((a, b) => b.id - a.id);
				setPosts(posts);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setIsLoading(false);
			}
		};

		getPosts();
	}, [setPosts, userProfile, showToast]);

	return { isLoading, posts };
};

export default useGetUserPosts;
