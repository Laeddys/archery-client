import React, { FC, useEffect, useState } from "react";
import { IPost } from "../../models/IPost/IPost";
import classes from "./Main.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import NewsService from "../../services/NewsService";
import { Button, Layout, Modal } from "antd";
import NewsForm from "../../components/NewsForm";
import { NewsActionCreators } from "../../store/reducers/news/action-creators";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setError, setIsLoading } from "../../store/reducers/news/newsSlice";
import { useNavigate } from "react-router-dom";

const Main: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { news, isLoading, error } = useAppSelector((state) => state.newsSlice);
  const { isAdmin } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await NewsService.fetchPosts();
      console.log(response);

      setPosts(response);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleReadMore = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const addNewPost = async (post: IPost) => {
    try {
      await dispatch(NewsActionCreators.createPost(post));
      fetchPosts();
    } catch (error) {
      console.error("Failed to add post", error);
    } finally {
      setModalOpen(false);
    }
  };

  const deletePost = async (post: IPost) => {
    try {
      await dispatch(NewsActionCreators.deletePost(post));
      setPosts(posts.filter((p) => p.id !== post.id));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <Layout>
      <div className={classes.container}>
        <h1>News</h1>
        {isAdmin && (
          <div>
            <Button onClick={() => setModalOpen(true)}>Add post</Button>
          </div>
        )}
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3 className={classes.postTitle}>{post.title}</h3>
              <p>{truncateText(post.body, 300)}</p>
              {isAdmin && (
                <Button
                  style={{ marginTop: 10 }}
                  onClick={() => deletePost(post)}
                >
                  Delete Post
                </Button>
              )}
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
          ))}
        </ul>

        <Modal
          title="Add competition"
          open={modalOpen}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <NewsForm news={news} submit={addNewPost} />
        </Modal>
      </div>
    </Layout>
  );
};

export default Main;
