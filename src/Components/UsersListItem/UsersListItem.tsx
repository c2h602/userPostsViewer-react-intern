import { Link } from "react-router";

interface IUsersListItem {
  id: number,
  username: string,
  postsLength: number
}

export default function UsersListItem({id, username, postsLength}: IUsersListItem) {
  return (
    <li key={id} className="card__item">
      <Link
        className="card__username"
        to={`/${username}/${id}/`}
      >
        {username}
      </Link>
      <p className="card__posts">{postsLength} posts</p>
    </li>
  );
}
