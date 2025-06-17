import PostBox from "components/posts/PostBox";
import PostForm from "components/posts/PostForm";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

export const posts: PostProps[] = [
  {
    id: "1",
    email: "test@test.com",
    content: "내용",
    createdAt: "2025-06-17",
    uid: "123123",
  },
  {
    id: "2",
    email: "test@test.com",
    content: "내용",
    createdAt: "2025-06-17",
    uid: "123123",
  },
  {
    id: "3",
    email: "test@test.com",
    content: "내용",
    createdAt: "2025-06-17",
    uid: "123123",
  },
  {
    id: "4",
    email: "test@test.com",
    content: "내용",
    createdAt: "2025-06-17",
    uid: "123123",
  },
  {
    id: "5",
    email: "test@test.com",
    content: "내용",
    createdAt: "2025-06-17",
    uid: "123123",
  },
  {
    id: "6",
    email: "test@test.com",
    content: "내용",
    createdAt: "2025-06-17",
    uid: "123123",
  },
  {
    id: "7",
    email: "test@test.com",
    content: "내용",
    createdAt: "2025-06-17",
    uid: "123123",
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <div className="home_title">TWITTER HOME</div>
      <div className="home_tabs">
        <div className="home_tab home_tab-active">For you</div>
        <div className="home_tab">Following</div>
      </div>
      <PostForm />
      <PostBox />
    </div>
  );
}
