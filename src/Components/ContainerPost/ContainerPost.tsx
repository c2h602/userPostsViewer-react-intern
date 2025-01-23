import { useState, useEffect } from "react";
import Comments from "../Comments/Comments";
import { Outlet, useParams } from "react-router";
import { IComment, IPost } from "../../types/types";

interface IContainerPost {
  post: IPost;
}

export default function ContainerPost({ post }: IContainerPost) {
  const params = useParams<{ postId: string }>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [showComments, setShowComments] = useState(false);

  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
    .then((response) => response.json())
    .then((x) => setComments(x));

  useEffect(() => {
    if (params.postId) {
      handleOpenComments(params.postId);
    }
  }, [params.postId]);

  const handleOpenComments = async (postId: string) => {
    if (!showComments && comments.length === 0) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      ).then((response) => response.json());

      setComments(response);
    }

    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };

  return (
    <div className="container-posts">
      <h2 className="title-post">{post.title}</h2>
      <p className="body-post">{post.body}</p>
      <a
        className="comments-post"
        href={`/comments?postId=${post.id}`}
        onClick={(e) => {
          e.preventDefault();
          handleOpenComments(post.id.toString());
        }}
      >
        💬 {comments.length}
      </a>

      {showComments && (
        <div>
          {comments.map((comment) => (
            <Comments
              key={comment.id}
              email={comment.email}
              body={comment.body}
            />
          ))}
        </div>
      )}

      <Outlet />
    </div>
  );
}
