import { Models } from "appwrite"
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type CreatorCardProps = {
    creator: Models.Document;
}

const CreatorCard = ({creator}: CreatorCardProps) => {
  return (
    <Link to={`/profile/${creator.$id}`} className="creator-card">
        <img src={creator.imageUrl || '/assets/icons/profile-placeholder.svg'} className="creator-card_img" alt="creator" />
        <p className="base-medium lg:body-bold text-light-1">{creator.name}</p>
        <Button className="bg-primary-500 rounded-lg w-[74px] h-[30px] small-semibold">Follow</Button>
    </Link>
  )
}

export default CreatorCard