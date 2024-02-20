import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import data from "../config.json";
import axios from "axios";

const useLikePost = (post) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const [likes, setLikes] = useState(post.reactCount);
	const [isLiked, setIsLiked] = useState(false);
	const showToast = useShowToast();
	const url = data.url_base;

	const handleLikePost = async () => {
		if (isUpdating) return;
		if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");
		setIsUpdating(true);

		try {

			axios.defaults.headers.common["Authorization"] = `Bearer ${authUser.token}`;

			const res = await axios.get(`${url}/api/user/react/${post.id}`, {
				headers: {
                    Authorization: `Bearer ${authUser.token}`,
                }
			});

			const data1 = res.data.data;

			setIsLiked(false);

			data1.forEach( (e) => {
				if(e.userId === authUser.user.id){
					setIsLiked(true);
				}
			});

			if (isLiked) {
				const res2 = await axios.delete(`${url}/api/user/react/delete?postId=${post.id}&userId=${authUser.user.id}`);	
				console.log(res2);
			}else{
				const res2 = await axios.post(`${url}/api/user/react/add`, {
                    
                    "userId": authUser.user.id,
                    "postId": post.id,
					"reactType": 0
                    
                });
				console.log(res2.data.data)
			}
			setIsLiked(!isLiked);
			isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
