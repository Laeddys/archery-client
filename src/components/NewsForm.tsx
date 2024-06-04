import { Button, Form, Input, Row } from "antd";
import { FC, KeyboardEvent, useState } from "react";
import { rules } from "../utils/rules";

import { useAppSelector } from "../hooks/useAppSelector";
import { IPost } from "../models/IPost/IPost";

interface NewsFormProps {
  news: IPost[];
  submit: (post: IPost) => void;
}

const NewsForm: FC<NewsFormProps> = (props) => {
  const { user } = useAppSelector((state) => state.authSlice);
  const { isLoading, error, competitions } = useAppSelector(
    (state) => state.competitionSlice
  );
  const [post, setPost] = useState<IPost>({
    title: "",
    body: "",
  } as IPost);

  const submitForm = () => {
    props.submit({ ...post });
  };

  const handlePressEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "ENTER") {
      event.preventDefault();
      setPost((prevPost) => ({
        ...prevPost,
        body: prevPost.body + " \n ",
      }));
    }
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item label="Title" name="title" rules={[rules.required()]}>
        <Input.TextArea
          autoSize={true}
          onChange={(event) => setPost({ ...post, title: event.target.value })}
          placeholder="title..."
          maxLength={255}
        />
      </Form.Item>

      <Form.Item label="Text" name="Text" rules={[rules.required()]}>
        <Input.TextArea
          maxLength={4096}
          autoSize={true}
          onPressEnter={handlePressEnter}
          onChange={(event) => setPost({ ...post, body: event.target.value })}
          placeholder="text.."
        />
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

export default NewsForm;
