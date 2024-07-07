import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../../models/IPost/IPost";
import NewsService from "../../../services/PostsService";

interface PostState {
  posts: IPost[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [] as IPost[],
  isLoading: false,
  error: null as string | null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await NewsService.fetchPosts();
  return response;
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number) => {
    const response = await NewsService.fetchPostById(id);
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post: IPost) => {
    const postWithDate = {
      ...post,
      date: new Date().toISOString(),
    };

    await NewsService.createPost(postWithDate);

    return postWithDate;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<IPost[]>) => {
          state.isLoading = false;
          state.posts = action.payload;
        }
      )
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

export default postsSlice.reducer;
