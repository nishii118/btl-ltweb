import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.userId);

	return (
		<>
			{userProfile && <PostHeader post={post} creatorProfile={userProfile} />}
			<Box my={2} borderRadius={4} overflow={"hidden"}>
				<Image src={post.resources} alt={"FEED POST IMG"} />
			</Box>
			{userProfile && <PostFooter post={post} creatorProfile={userProfile} />}
		</>
	);
};

export default FeedPost;