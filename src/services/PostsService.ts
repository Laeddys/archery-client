import axios, { AxiosResponse } from "axios";
import { IPost } from "../models/IPost/IPost";

export const API_URL = "http://localhost:5000/news";

export default class NewsService {
  static async createPost(news: IPost): Promise<AxiosResponse<IPost[]>> {
    return axios.post("http://localhost:5000/news", news);
  }

  // static async fetchPosts(page: number): Promise<IPost[]> {
  //   const response: AxiosResponse<IPost[]> = await axios.get<IPost[]>(
  //     `http://localhost:5000/news?page=${page}&limit=10`
  //   );
  //   console.log(response.data);
  //   return response.data;
  // }

  static async deletePost(id: number): Promise<IPost[]> {
    const response: AxiosResponse<IPost[]> = await axios.delete<IPost[]>(
      `http://localhost:5000/news/${id}`,
      { data: id }
    );

    return response.data;
  }

  static fetchPostById = async (id: number) => {
    const response = await axios.get<IPost>(`${API_URL}/${id}`);
    return response;
  };

  static getPostImage = async (post: IPost, id: number) => {
    const response = await axios.get<IPost>(`${API_URL}/${id}`, {
      data: post.image,
    });
    return response;
  };
}
