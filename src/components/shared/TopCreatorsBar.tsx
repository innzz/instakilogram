import { useGetUsers } from "@/lib/react-query/queriesAndMutations"
import CreatorCard from "./CreatorCard"
import Loader from "./Loader";

const TopCreatorsBar = () => {
    const { data: creators, isFetching, isFetched } = useGetUsers();

    return (
        <div className="top_creators-bar">
            <h2 className="h2-bold">Top creators</h2>
            {isFetching ? <Loader /> : isFetched && creators && creators.documents.length > 0 ? <div className="top_creators-grid">
                {creators.documents.map((creator) =>
                    <CreatorCard creator={creator} key={creator.$id} />
                )}
            </div> : <p className="h3-bold">No top creators found</p>}

        </div>
    )
}

export default TopCreatorsBar