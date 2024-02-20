import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import useGetUserProfileByUsername from '../../hooks/useGetUserProfileByUsername';

const FeedPost = ({ post }) => {

	const { userProfile } = useGetUserProfileById(post.userId);

	return (
		<>
			{userProfile && <PostHeader post={post} creatorProfile={userProfile} />}
			<Box my={2} borderRadius={4} overflow={"hidden"}>
				<Image src={post.resource} alt={"FEED POST IMG"} />
			</Box>
			{userProfile && <PostFooter post={post} creatorProfile={userProfile} />}
		</>
	);
};

export default FeedPost;
