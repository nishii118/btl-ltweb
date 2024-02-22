import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import data from "../config.json";
import axios from "axios";

const usePostComment = () => {
	const [isCommenting, setIsCommenting] = useState(false);
	const showToast = useShowToast();
	const authUser = useAuthStore((state) => state.user);
	const addComment = usePostStore((state) => state.addComment);

	const handlePostComment = async (postId, comment) => {
		
		if (!authUser) return showToast("Error", "You must be logged in to comment", "error");
		setIsCommenting(true);
		const newComment = {
			userId: authUser.user.id,
			postId: postId,
			createdAt: Date.now(),
			reactCount: 0,
			isRoot: 0,
			parentId: 0,
			resources: "",
			content: comment
			
		};
		try {
			const response = await axios.post(`${data.url_base}/api/comments/`, newComment , {
				headers: {
					Authorization: `Bearer ${authUser.token}`,
                }
			});

			addComment(postId, newComment);
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsCommenting(false);
		}
	};

	return { isCommenting, handlePostComment };
};

export default usePostComment;
