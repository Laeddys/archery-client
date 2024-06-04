import { IPost } from "../../../models/IPost/IPost";
import NewsService from "../../../services/NewsService";
import { AppDispatch } from "../../store";
import { setIsLoading, setPosts, setError } from "./newsSlice";

export const NewsActionCreators = {
  fetchPosts: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));
      const posts = await NewsService.fetchPosts();
      console.log("fetch posts");
      dispatch(setPosts(posts));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occured"));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  },

  createPost: (post: IPost) => async (dispatch: AppDispatch) => {
    try {
      setIsLoading(true);
      const response = await NewsService.createPost(post);
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occured"));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  },

  deletePost: (post: IPost) => async (dispatch: AppDispatch) => {
    try {
      setIsLoading(true);
      const response = await NewsService.deletePost(post);
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occured"));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  },
};
