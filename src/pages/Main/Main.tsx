import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IPost } from "../../models/IPost/IPost";
import classes from "./Main.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Button, Layout, Modal, Pagination } from "antd";
import PostForm from "../../components/PostForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  createPost,
  fetchPosts,
  setCurrentPage,
} from "../../store/reducers/posts/postsSlice";
import PostListItem from "../../components/PostList/PostList";

interface MemoizedModalProps {
  open: boolean;
  onCancel: () => void;
  submit: (post: IPost) => Promise<void>;
}

const Main: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { posts, isLoading, error, currentPage, totalPages } = useAppSelector(
    (state) => state.postsSlice
  );

  const { isAdmin } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (posts.length < currentPage * 10) {
      dispatch(fetchPosts(currentPage));
    }
  }, [dispatch, posts.length, currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const memoizedPosts = useMemo(() => posts, [posts]);

  const addNewPost = useCallback(
    async (post: IPost) => {
      try {
        await dispatch(createPost(post)).unwrap();
        setModalOpen(false);
      } catch (err) {
        console.error("failed to add post: ", err);
      }
    },
    [dispatch]
  );

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
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          pageSize={10}
          onChange={handlePageChange}
          className={classes.pagination}
          size="small"
        />
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
