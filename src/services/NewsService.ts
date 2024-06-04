import axios, { AxiosResponse } from "axios";
import { IPost } from "../models/IPost/IPost";

export default class NewsService {
  static async createPost(news: IPost): Promise<AxiosResponse<IPost[]>> {
    return axios.post("http://localhost:5000/news", news);
  }

  static async fetchPosts(): Promise<IPost[]> {
    const response: AxiosResponse<IPost[]> = await axios.get<IPost[]>(
      "http://localhost:5000/news"
    );
    return response.data;
  }

  static async deletePost(post: IPost): Promise<IPost[]> {
    const response: AxiosResponse<IPost[]> = await axios.delete<IPost[]>(
      `http://localhost:5000/news/${post.id}`,
      { data: post.id }
    );
    console.log(post.id);
    return response.data;
  }
}
