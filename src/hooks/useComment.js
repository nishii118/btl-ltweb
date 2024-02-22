import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import data from "../config.json";
import axios from "axios";
import Comment from "../components/Comment/Comment";

const useComment = (post) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState([]);
  const authUser = useAuthStore((state) => state.user);

  const url = data.url_base;

  const token = authUser.token;

  useEffect(() => {
    const handleComment = async () => {
      setIsLoading(true);
      const postId = post.id;
      try {
        const response = await axios.get(`${url}/api/comments/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const comments = await response.data.data;

        const comment1 = comments.filter((comment) => comment.post.id === postId);

        setComment(comment1);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleComment();
  }, [authUser]);

  return { isLoading, comment };
};

export default useComment;
