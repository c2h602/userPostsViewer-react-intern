import { create } from 'zustand';
import { IPost, IUser, IComment } from "./types/types";

interface UsersStore {
    users: IUser[];
    filteredUsers: IUser[];
    handleSearch: (username: string) => void;
    isSearching: boolean;
    fetchData: () => Promise<void>;
}

export const useUsersStore = create<UsersStore>((set) => ({
    users: [],
    filteredUsers: [],
    isSearching: false,

    fetchData: async () => {
        const [usersResponse, postsResponse, commentsRespose] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users"),
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch("https://jsonplaceholder.typicode.com/comments"),
        ]);
  
      const usersData: IUser[] = await usersResponse.json();
      const postsData: IPost[] = await postsResponse.json();
      const commentsData: IComment[] = await commentsRespose.json();
      
      const postsWithComments = postsData.map((post: IPost) => ({
        ...post,
        comments: commentsData.filter((comment: IComment) => comment.postId === post.id)}));
        
    const usersWithPosts = usersData.map((user: IUser) => ({
        ...user,
        posts: postsWithComments.filter((post: IPost) => post.userId === user.id)}));
 
        set(() => ({
            users: usersWithPosts,
            filteredUsers: usersWithPosts
        }));
    },

    handleSearch: (username: string) => set((state) => ({
        filteredUsers: state.users.filter((user) =>
            user.username.toLowerCase().includes(username.toLowerCase())
        ),
        isSearching: true,
    })),
}));