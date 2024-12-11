import { Link } from 'react-router';

interface IItemList {
  id: number,
  username: string,
  postsLength: number
}


export const ItemList = ({id, username, postsLength}: IItemList) => {
  return (
    <li key={id} className="card__item">
      <Link
        className="card__username"
        to={`/user/${id}/`}
      >
        {username}
      </Link>
      <p className="card__posts">{postsLength} posts</p>
    </li>
  )
}