import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import SearchBar from "./Components/SearchBar/SearchBar";
import CardUser from "./Components/CardUser/CardUser";
import ContainerPost from "./Components/ContainerPost/ContainerPost";

interface IUser {
  id: number;
  username: string;
  name: string;
  address: {
    city: string;
  };
  email: string;
  phone: string;
  website: string;
}

interface IPost {
  title: string;
  body: string;
  userId: number;
  id: number;
}

interface IComments {
  email: string;
  body: string;
  postId: number;
  id: number;
}

export default function App() {
  
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comments, setComments] = useState<IComments[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cardUser, setCardUser] = useState<IUser | null>(null);
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const [isShowingPost, setIsShowingPost] = useState(false);


  const fetchData = async () => {
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/comments')
    ]);

    const usersData = await usersResponse.json();
    const postsData = await postsResponse.json();
    const commentsData = await commentsResponse.json();

    setUsers(usersData);
    setPosts(postsData);
    setComments(commentsData);

  };

  useEffect(() => {
    
    fetchData();

  }, []);

  const handleSearch = (username: string) => {

    setIsSearching(true);

    const filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(username)
    );

    setFilteredUsers(filteredUsers);
    setCardUser(null);
    setIsShowingPost(false);

  }

  const handleOpenCardUser = async (userId: number) => {

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    ).then((response) => response.json());

    setCardUser(response);
    
  };

  const handleOpenPosts = (userId: number) => {

    const userPosts = posts
      .filter((post: IPost) => post.userId === userId)
        
    setUserPosts(userPosts);
    setIsShowingPost(true);

    if(isShowingPost) {
      setIsShowingPost(false);
    } else {
      setIsShowingPost(true);
    }
    
  }

  return(
    <>

      <Header/>

      <main className="container">

      <SearchBar onSearch={handleSearch}/>

      <div className="card">
         
          {cardUser ? (
            
            <CardUser user={cardUser}  onClick={handleOpenPosts}/>
          ) : (
            
            <ul className="card__list">
              {isSearching && filteredUsers.length === 0 ? (

                <h2 style={{textAlign: 'center'}}>User not found... Try again 🔎</h2>

              ) : (
                
                filteredUsers.map((user) => {
                  const userPosts = posts.filter(post => post.userId === user.id);

                  return (

                    <li className="card__item">
                      <a
                        className="card__username"
                        href={`/${user.username}/${user.id}/`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenCardUser(user.id);
                        }}
                      >
                        {user.username}
                      </a>
                      <p className="card__posts">{userPosts.length} posts</p>
                    </li>

                  );
                })
              )}
            </ul>
          )}
        </div>


        
      </main>

      {isShowingPost ? (
      userPosts.map((post) => (
        <ContainerPost post={post} />
      ))
    ) : null}
      
    </>
  )
  
}
