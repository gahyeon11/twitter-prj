import { FaRegComment, FaUserCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { posts } from "pages/home";

export default function PostBox() {
  const handleDelete = () => {};
  return (
    <>
      <div className="post">
        {posts.map((post) => (
          <div className="post_box" key={post.id}>
            <Link to={`/posts/${post?.id}`}>
              <div className="post_box-profile">
                <div className="post_flex">
                  {post?.profileUrl ? (
                    <img
                      src={post?.profileUrl}
                      alt="profile"
                      className="post_box-profile-img"
                    />
                  ) : (
                    <FaUserCircle className="post_box-profile-icon" />
                  )}
                  <div className="post_email">{post?.email}</div>
                  <div className="post_createdAt">{post?.createdAt}</div>
                </div>
                <div className="post_box-content">{post?.content}</div>
              </div>
            </Link>
            <div className="post_box-footer">
              <>
                <button
                  type="button"
                  className="post_delete"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button type="button" className="post_edit">
                  <Link to={`/post/edit/${post?.id}`}>Edit</Link>
                </button>
                <button type="button" className="post_likes">
                  <AiFillHeart />
                  {post?.likeCount || 0}
                </button>
                <button type="button" className="post_comments">
                  <FaRegComment />
                  {post?.comments?.length || 0}
                </button>
              </>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
