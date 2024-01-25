import { Models } from "appwrite"
import PostCard from "./PostCard";

type PostListProps = {
    posts: Models.Document[];
}

const PostsList = ({ posts }: PostListProps) => {

    return (
        <ul className="w-full flex flex-col gap-10">
            {posts.map((post) => (
                <PostCard post={post} key={post.$id} />
            ))}
        </ul>
    )
}

export default PostsList