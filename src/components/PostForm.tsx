import { Button, Form, Input, Row } from "antd";
import React, { FC, KeyboardEvent, useState, useCallback } from "react";
import { rules } from "../utils/rules";
import { useAppSelector } from "../hooks/useAppSelector";
import { IPost } from "../models/IPost/IPost";
import { resizeImage } from "../utils/resizeImage";

interface PostFormProps {
  submit: (post: IPost) => void;
}

const PostForm: FC<PostFormProps> = (props) => {
  const { user } = useAppSelector((state) => state.authSlice);
  const { isLoading } = useAppSelector((state) => state.competitionSlice);
  const [post, setPost] = useState<IPost>({
    title: "",
    body: "",
    image: null,
    author: user.email,
  } as IPost);

  const submitForm = async () => {
    if (post.image) {
      const resizedImage = await resizeImage(post.image, 400, 400);
      props.submit({
        ...post,
        image: resizedImage,
        userId: user.id,
        author: user.email,
      });
    } else {
      props.submit({ ...post, userId: user.id, author: user.email });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPost({ ...post, image: file, author: user.email });
    }
  };

  const handlePressEnter = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "ENTER") {
        event.preventDefault();
        setPost((prevPost) => ({
          ...prevPost,
          body: prevPost.body + "\n",
        }));
      }
    },
    []
  );

  return (
    <Form onFinish={submitForm}>
      <Form.Item label="Title" name="title" rules={[rules.required()]}>
        <Input
          name="title"
          value={post.title}
          onChange={handleInputChange}
          placeholder="title..."
          maxLength={255}
        />
      </Form.Item>

      <Form.Item label="Body" name="body" rules={[rules.required()]}>
        <Input.TextArea
          name="body"
          maxLength={4096}
          value={post.body}
          onChange={handleInputChange}
          onKeyDown={handlePressEnter}
          placeholder="body..."
        />
      </Form.Item>

      <Form.Item label="Image" name="image">
        <Input type="file" name="image" onChange={handleImageChange} />
      </Form.Item>

      <Row justify="center">
        <Form.Item>
          <Button type="default" htmlType="submit" loading={isLoading}>
            Add Post
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default React.memo(PostForm);
