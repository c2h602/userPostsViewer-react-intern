import { createContext, ReactNode, useEffect, useState } from "react";
import { IPost, IUser, IComment } from "../types/types";

interface IUsersContextProvider {
  children: ReactNode;
}

interface UsersContextState {
  filteredUsers: IUser[];
  handleSearch: (username: string) => void;
  isSearching: boolean;
}

const defaultState = {
  filteredUsers: [],
  handleSearch: () => {},
  isSearching: false,
};

export const UsersContext = createContext<UsersContextState>(defaultState);

export const UsersContextProvider = ({
  children,
}: IUsersContextProvider) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    const [usersResponse, postsResponse, commentsRespose] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/comments"),
    ]);

    const usersData: IUser[] = await usersResponse.json();
    const postsData: IPost[] = await postsResponse.json();
    const commentsData: IComment[] = await commentsRespose.json();

    const postsArr = postsData.map((post: IPost) => {
      const comments = commentsData.filter(
        (comment: IComment) => comment.postId === post.id
      );

      return {
        ...post,
        comments,
      };
    });

    const usersAndPosts = usersData.map((user: IUser) => {
      const posts = postsArr.filter((post: IPost) => post.userId === user.id);

      return {
        ...user,
        posts,
      };
    });
    setUsers(usersAndPosts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (username: string) => {
    setIsSearching(true);
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(username.toLowerCase())
    );

    setFilteredUsers(filteredUsers);
  };

  return (
    <UsersContext.Provider value={{ filteredUsers, handleSearch, isSearching }}>
      {children}
    </UsersContext.Provider>
  );
};
