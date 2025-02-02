import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPostById,
  deletePost,
} from "../../store/reducers/posts/postsSlice";
import { Button, Layout } from "antd";
import classes from "./Post.module.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RouteNames } from "../../router/routes";

const Post: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    state.postsSlice.posts.find((p) => p.id === Number(id))
  );
  const { user, isAdmin } = useAppSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!post) {
      dispatch(fetchPostById(Number(id)));
    }
  }, [id, dispatch, post]);

  const handleDeletePost = async () => {
    if (post) {
      await dispatch(deletePost(post.id));
    }
  };

  if (!post) {
    return (
      <>
        <h1>Post is not found...</h1>
        <Button type="text" onClick={() => navigate(RouteNames.MAIN)}>
          Return to Main page
        </Button>
      </>
    );
  }

  return (
    <Layout className={classes.layout}>
      <Button
        style={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        type="dashed"
        onClick={() => navigate(RouteNames.MAIN)}
      >
        Return to Main page
      </Button>
      <div className={classes.container}>
        <h1 className={classes.title}>{post.title}</h1>
        <img
          className={classes.img}
          src={`http://localhost:5000/${post.image}`}
          alt="Post"
        />
        <p className={classes.date}>Published on: {post.date}</p>
        <p className={classes.date}>Author: {post.userId}</p>
        <p className={classes.body}>{post.body}</p>

        {isAdmin && (
          <div className={classes.adminActions}>
            <Button type="dashed" onClick={handleDeletePost}>
              Delete Post
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Post;
