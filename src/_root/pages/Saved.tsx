import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetCurrentUser, useGetSavedPosts } from "@/lib/react-query/queriesAndMutations"



const Saved = () => {
  const { data: user } = useGetCurrentUser();
  const { data: posts, isLoading } = useGetSavedPosts(user?.$id);

  return (
    <div className='home-container'>
      <div className='home-posts'>
        <h2 className='h3-bold md:h2-bold w-full'>Saved Posts</h2>
        <div className="flex flex-col gap-4 w-full">
          {!user || isLoading ? <Loader /> : !isLoading && posts?.documents.length > 0 && posts?.documents.map((item) => (
            <PostCard key={item.$id} post={item.post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Saved