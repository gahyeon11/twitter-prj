import PostBox from "components/posts/PostBox";
import PostForm from "components/posts/PostForm";
import AuthContext from "context/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";

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

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      let postRef = collection(db, "posts");
      let postQuer = query(postRef, orderBy("createdAt", "desc"));
      onSnapshot(postQuer, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home_top">
        <div className="home_title">TWITTER HOME</div>
        <div className="home_tabs">
          <div className="home_tab home_tab-active">For you</div>
          <div className="home_tab">Following</div>
        </div>
      </div>
      <PostForm />
      <div className="post">
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className="post_no-posts">
            <div className="post_text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
