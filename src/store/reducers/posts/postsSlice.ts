import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../../models/IPost/IPost";
import NewsService, { API_URL } from "../../../services/PostsService";
import { RootState } from "../../store";
import axios from "axios";

interface PostState {
  posts: IPost[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: PostState = {
  posts: [] as IPost[],
  isLoading: false,
  error: null as string | null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=10`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number) => {
    const response = await NewsService.fetchPostById(id);
    return response.data;
  }
);

export const createPost = createAsyncThunk<IPost, IPost, { state: RootState }>(
  "posts/createPost",
  async (post: IPost, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const user = state.authSlice.user;
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("body", post.body);
    if (post.image) {
      formData.append("image", post.image as File);
    }
    formData.append("date", new Date().toISOString());
    formData.append("author", user.id.toString());
    formData.append("userId", user.id.toString());

    try {
      dispatch(setIsLoading(true));
      const response = await fetch("http://localhost:5000/news", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "An unknown error occurred");
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const deletePost = createAsyncThunk(
  "news/deletePost",
  async (postId: number) => {
    await NewsService.deletePost(postId);
    return postId;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    // setError(state, action: PayloadAction<string>) {
    //   state.error = action.payload;
    // },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<IPost>) => {
          const existingPost = state.posts.find(
            (post) => post.id === action.payload.id
          );
          if (!existingPost) {
            state.posts.push(action.payload);
          }
        }
      )
      .addCase(createPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create post";
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete post";
      });
  },
});

export const { setIsLoading, setCurrentPage, setPosts } = postsSlice.actions;
export default postsSlice.reducer;
