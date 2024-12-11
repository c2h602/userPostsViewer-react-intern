import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Outlet } from "react-router";
import { IUser } from "../../types/types";
import { useUsers } from "../../context/useUsers";
import ContainerPost from "../ContainerPost/ContainerPost";
import Button from "../Button/Button";

export default function CardUser() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { filteredUsers } = useUsers();
  const [user, setUser] = useState<IUser | null>(null);
  const [isPostsActive, setIsPostsActive] = useState(false);

  useEffect(() => {
    const user = filteredUsers.find(
      (user: IUser) => String(user.id) === userId
    );
    if (user) {
      setUser(user);
    }
  }, [filteredUsers]);

  if (!user) {
    return null;
  }

  return (
    <>
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

          <a
            className="card__user_posts"
            href={`/${user.username}/posts/`}
            onClick={(e) => {
              e.preventDefault();
              setIsPostsActive(!isPostsActive);
            }}
          >
            Posts
          </a>
        </div>
      </div>
      {isPostsActive && user.posts.map((post) => <ContainerPost post={post} />)}

      <Outlet />
    </>
  );
}
