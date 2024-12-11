import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router";
import { IUser } from "../../types/types";
import Button from "../Button/Button";
import ContainerPost from "../ContainerPost/ContainerPost";

interface ICardUser {
  user: IUser;
  onClick: (userId: number) => void;
}

export default function CardUser({ user, onClick }: ICardUser) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isPostsActive, setIsPostsActive] = useState(false);

  useEffect(() => {
    if (userId) {
      const id = Number(userId);
      onClick(id);
    }
  }, [userId, onClick]);

  return (
    <div className="card">
      <div className="card__user">
        <Button className="btnBack" onClick={() => navigate(-1)}>
          Back
        </Button>

        <h1 className="card__user_username">{user.username}</h1>
        <h3 className="card__user_name">{user.name}</h3>
        <div className="card__user_city">🏠 {user.address.city}</div>
        <div className="card__user_email">📧 {user.email}</div>
        <a className="card__user_website" href={user.website}>
          🌐 {user.website}
        </a>
        {/* <a
        className="card__user_posts"
        href={`/${user.username}/posts/`}
        onClick={(e) => {
          e.preventDefault();
          onClick(Number(userId));
        }}
      >
        Posts
      </a> */}

        <Link
          className="card__user_posts"
          to={`/posts/`}
          onClick={() => setIsPostsActive(true)}
        >
          Posts
        </Link>
      </div>

      {isPostsActive && user.posts.map((post) => 
        <ContainerPost post={post} />
      )}
      
    </div>
  );
}
