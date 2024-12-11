export interface IUser {
  id: number;
  username: string;
  name: string;
  address: {
    city: string;
  };
  email: string;
  phone: string;
  website: string;
  posts: IPost[];
}

export interface IComment {
  email: string;
  body: string;
  postId: number;
  id: number;
}

export interface IPost {
  title: string;
  body: string;
  userId: number;
  id: number;
  comments: IComment[];
}