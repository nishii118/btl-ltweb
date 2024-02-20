import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import axios from "axios";
import data from "../config.json";

const useGetFeedPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const { setUserProfile } = useUserProfileStore();
	const url = data.url_base;

	useEffect(() => {
		const getFeedPosts = async () => {
			setIsLoading(true);
			if (authUser.user.friendCount === 0) {
				setIsLoading(false);
				setPosts([]);
				return;
			}
			try {				
				const res1 = await axios.get(`${url}/api/friend/${authUser.user.id}`, {
					headers: {
                        Authorization: `Bearer ${authUser.token}`,
                    }
				});

				let friendIds = res1.data.data.map((friend) => friend.reciverId.id);
				friendIds.push(authUser.user.id);

				const res2 = await axios.get(`${url}/api/post/all`, {
					headers: {
                        Authorization: `Bearer ${authUser.token}`,
                    }
                });

				const fposts = res2.data.data.filter(post => {
					return friendIds.includes(post.userId);
				});

				fposts.sort((a, b) => b.id - a.id);
				setPosts(fposts);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) getFeedPosts();
	}, [authUser, showToast, setPosts, setUserProfile]);

	return { isLoading, posts };
};

export default useGetFeedPosts;
