import Loader from "@/components/shared/Loader";
import PostsList from "@/components/shared/PostsList";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';


const Home = () => {
  const { ref, inView } = useInView();
  const { data: posts, isPending: isPostLoading, fetchNextPage, hasNextPage, isFetching } = useGetRecentPosts();

  useEffect(() => {
    if (inView && !isFetching) fetchNextPage();
  }, [inView])
  
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          {isPostLoading && !posts ? (<Loader />) : posts?.pages.map((item, index) => (
            <div className="w-full flex flex-col gap-10" key={`page-${index}`}>
              <PostsList posts={item.documents} />
            </div>
          ))}
          {hasNextPage && 
          (
            <div ref={ref}>
              <Loader />
            </div>
          ) }
        </div>
      </div>
    </div>
  )
}

export default Home