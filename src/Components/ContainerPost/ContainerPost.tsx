import { useState } from "react";
import Comments from "../Comments/Comments";
import { IPost, IComment } from "../../types/types";

interface IContainerPost {
  post: IPost;
  // comment: IComment;
}

export default function ContainerPost({ post }: IContainerPost) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [showComments, setShowComments] = useState(false);

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
              postId={post.id}
              id={id}
              email={comment.email}
              body={comment.body}
            />
          ))}
        </div>
      )}
    </div>
  );
}
