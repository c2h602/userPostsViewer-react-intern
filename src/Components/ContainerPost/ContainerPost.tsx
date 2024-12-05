import { useState } from "react";
import Comments from "../Comments/Comments";
import { Outlet, useParams } from "react-router";

interface IPost {
    title: string;
    body: string;
    id: number;
}

interface IComments {
    email: string;
    body: string;
    postId: number;
    id: number;
}

interface IContainerPost {
    post: IPost;
}

export default function ContainerPost({post}: IContainerPost) {
    const { postId } = useParams();
    const [comments, setComments] = useState<IComments[]>([]);
    const [showComments, setShowComments] = useState(false);
    
    const handleOpenComments = async () => {

        if (!showComments && comments.length === 0) {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
            ).then((response) => response.json());
          
            setComments(response);
            setShowComments(true)
        }

        if(showComments) {
            setShowComments(false)
        } else {
            setShowComments(true)
        }

      };

    return(
        <div className="container-posts">
            <h2 className="title-post">{post.title}</h2>
            <p className="body-post">{post.body}</p>
            <a className="comments-post" 
               href={`/comments?postId=${postId}`}
               onClick={(e) => {
                e.preventDefault();
                handleOpenComments();
               }}
            >
                💬 5
            </a>

        {showComments && (
            <div> 
                {comments.map((comment) => (
                    <Comments email={comment.email} 
                              body={comment.body} />
                ))}
        </div>
      )}
    
    <Outlet />

        </div>
    )
}