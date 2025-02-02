import React, { FC, useCallback } from "react";
import { IPost } from "../../models/IPost/IPost";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/truncateText";
import { Button } from "antd";
import classes from "./PostList.module.css";

const PostListItem: FC<{ post: IPost }> = React.memo(({ post }) => {
  const navigate = useNavigate();

  const handleReadMore = useCallback(
    (id: number) => {
      navigate(`/posts/${id}`);
    },
    [navigate]
  );

  return (
    <li key={post.id}>
      {post.image && (
        <img
          className={classes.img}
          src={`http://localhost:5000/${post.image}`}
          alt="Post"
        />
      )}
      <h3 className={classes.postTitle}>{post.title}</h3>
      <p>{truncateText(post.body, 300)}</p>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        type="link"
        onClick={() => handleReadMore(post.id)}
      >
        Read more..
      </Button>
    </li>
  );
});

export default PostListItem;
