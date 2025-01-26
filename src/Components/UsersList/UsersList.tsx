import { useUsersStore } from "../../useUsersStore";
import { IUser } from "../../types/types";
import { ItemList } from "../ItemList/ItemList";

export const UsersList = () => {
  
  const { filteredUsers, isSearching } = useUsersStore();
 
  return (
    <ul className="card__list">
      {isSearching && filteredUsers.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>User not found... Try again 🔎</h2>
      ) : (
        filteredUsers.map((user: IUser) => (
          <ItemList
            id={user.id}
            username={user.username}
            postsLength={user.posts.length}
          />
        ))
      )}
    </ul>
  );
};
