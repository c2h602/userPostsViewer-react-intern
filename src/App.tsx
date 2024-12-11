import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import SearchBar from "./Components/SearchBar/SearchBar";
import CardUser from "./Components/CardUser/CardUser";
import { IUser, IPost } from "../../types/types";
import ContainerPost from "./Components/ContainerPost/ContainerPost";


export default function App() {
  
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
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

  

  return(
    <>

      <Header/>

      <main className="container">

      <SearchBar onSearch={handleSearch}/>

    
            {/* <ul className="card__list">
              {isSearching && filteredUsers.length === 0 ? (

                <h2 style={{textAlign: 'center'}}>User not found... Try again 🔎</h2>

              ) : (
                
                filteredUsers.map((user) => {
                  const userPosts = posts.filter(post => post.userId === user.id); */}


        
      </main>

    </>
  )
  
}
