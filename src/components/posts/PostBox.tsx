import { FaRegComment, FaUserCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { PostProps } from "pages/home";
import { useContext, useState } from "react";
import AuthContext from "context/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "firebaseApp";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시물을 삭제하시겠습니까?");
    if (confirm) {

      const imageRef = ref(storage, post?.imageUrl);
      if(post?.imageUrl)  {
        deleteObject(imageRef).catch((error)=>{
          console.log(error);
        })
      }
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate(`/`);
    }
  };

  return (
    <>
      <div className="post_box" key={post?.id}>
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
            {post?.imageUrl && (
              <div className="post_image-div">
                <img
                  src={post?.imageUrl}
                  alt="post img"
                  className="post_image"
                />
              </div>
            )}
            <div className="post_box-content">{post?.content}</div>
            <div className="post-form_hashtags-outputs">
              {post?.hashTags?.map((tag, index) => (
                <span className="post-form_hashtags-tag" key={index}>
                  # {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
        <div className="post_box-footer">
          {user?.uid === post?.uid && (
            <>
              <button
                type="button"
                className="post_delete"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button type="button" className="post_edit">
                <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
              </button>
            </>
          )}
          <button type="button" className="post_likes">
            <AiFillHeart />
            {post?.likeCount || 0}
          </button>
          <button type="button" className="post_comments">
            <FaRegComment />
            {post?.comments?.length || 0}
          </button>
        </div>
      </div>
    </>
  );
}
