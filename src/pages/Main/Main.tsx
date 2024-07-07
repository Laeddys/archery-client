import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IPost } from "../../models/IPost/IPost";
import classes from "./Main.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Button, Layout, Modal } from "antd";
import PostForm from "../../components/PostForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchPosts } from "../../store/reducers/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../../store/reducers/auth/authSlice";

interface MemoizedModalProps {
  open: boolean;
  onCancel: () => void;
  submit: (post: IPost) => Promise<void>;
}

const Main: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { posts, isLoading, error } = useAppSelector(
    (state) => state.newsSlice
  );

  const { user } = useAppSelector((state) => state.authSlice);
  const { isAdmin } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const memoizedPosts = useMemo(() => posts, [posts]);

  const truncateText = useCallback(
    (text: string, maxLength: number): string => {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + "...";
    },
    []
  );

  const addNewPost = useCallback(
    async (post: IPost) => {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("body", post.body);
      if (post.image) {
        formData.append("image", post.image as File);
      }
      formData.append("date", new Date().toISOString());

      try {
        dispatch(setIsLoading(true));
        const response = await fetch("http://localhost:5000/news", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        setModalOpen(false);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  // const handleDeletePost = useCallback(
  //   async (postId: number) => {
  //     try {
  //       await dispatch(deletePost(postId));
  //     } catch (error) {
  //       console.error("Failed to delete post", error);
  //     }
  //   },
  //   [dispatch]
  // );

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

  const MemoizedModal: FC<MemoizedModalProps> = React.memo(
    ({ open, onCancel, submit }) => (
      <Modal title="Add Post" open={open} footer={null} onCancel={onCancel}>
        <PostForm submit={submit} />
      </Modal>
    )
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className={classes.container}>
        <h1>News</h1>
        {isAdmin && (
          <div>
            <Button onClick={() => setModalOpen(true)}>Add Post</Button>
          </div>
        )}
        <ul>
          {memoizedPosts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </ul>
        <MemoizedModal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          submit={addNewPost}
        />
      </div>
    </Layout>
  );
};

export default Main;
