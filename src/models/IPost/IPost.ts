export interface IPost {
  id: number;
  title: string;
  body: string;
  image: File | null;
  date: string;
  author: string;
  userId: number;
}
