import UsersListItem from "../UsersListItem/UsersListItem";

export default function UsersList() {

    return (
        <ul className="card__list">
            <UsersListItem 
                id={user.id}
                username={user.username}
                postsLength={user.posts.length}
            />
        </ul>
    )
}