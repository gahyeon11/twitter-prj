import AuthContext from "context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useContext, useEffect, useState } from "react";
import { GrImage, GrTrash } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import PostHeader from "./PostHeader";

export default function PostEditForm() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const [hashtag, setHashtag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader?.readAsDataURL(file);

    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageFile(result);
    };
  };

  const handleDeleteImage = () => {
    setImageFile(null);
  };

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);
      setImageFile(docSnap?.data()?.imageUrl);
    }
  }, [params.id]);

  const onSubmit = async (e: any) => {
    setIsSubmitting(true);
        const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    e.preventDefault();

    try {
      if (post) {
        // 기존 사진 지우고 새로운 사진 업로드
        if (post?.imageUrl) {
          let imageRef = ref(storage, post?.imageUrl);
          await deleteObject(imageRef).catch((error) => {
            console.log(error);
          });
        }
        
        // 새로운 파일 있다면 업로드
        let imageUrl = "";
        if (imageFile) {
          const data = await uploadString(storageRef, imageFile, "data_url");
          imageUrl = await getDownloadURL(data?.ref);
        }

        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
          hashTags: tags,
          imageUrl: imageUrl,
        });
      navigate(`/posts/${post?.id}`);
      toast.success("게시글을 수정했습니다.");
      }
      setImageFile(null);
      setIsSubmitting(false);
    } catch (e: any) {
      console.log(e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };

  const onChangeHashtag = (e: any) => {
    setHashtag(e?.target?.value?.trim());
  };

  const removeTag = (tag: string) => {
    setTags(tags?.filter((value) => value !== tag));
    // 넘겨받은 태그값과 다른 값만 필터링
  };

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      if (tags?.includes(e.target.value.trim())) {
        toast.error("동일한 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashtag] : [hashtag]));
        setHashtag("");
      }
    }
  };

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);
  return (
    <>    <div className="post_header">
          <PostHeader />
        </div>
      <form className="post-form" onSubmit={onSubmit}>
        <textarea
          className="post-form_textarea"
          required
          name="content"
          id="content"
          placeholder="What is happening?"
          onChange={onChange}
          value={content}
        />
        <div className="post-form_hashtags">
          <span className="post-form_hashtags-outputs">
            {tags?.map((tag, index) => (
              <span
                className="post-form_hashtags-tag"
                key={index}
                onClick={() => removeTag(tag)}
              >
                # {tag}
              </span>
            ))}
          </span>
          <input
            className="post-form_input"
            name="hashtag"
            id="hashtag"
            placeholder="해시태그 + 스페이스바 입력"
            onChange={onChangeHashtag}
            onKeyUp={handleKeyUp}
            value={hashtag}
          />
        </div>
        <div className="post-form_submit-area">
          <div className="post-form_image-area">
            <div className="post-form_image-btn">
              <label htmlFor="file-input" className="post-form_file">
                <GrImage className="post-form_file-icon" />
              </label>
              {imageFile && (
              <button
                type="button"
                className="post-form_file"
                onClick={handleDeleteImage}
              >
                <GrTrash className="post-form_file-icon" />
              </button>
              )}
            </div>
            <input
              type="file"
              name="file-input"
              id="file-input"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            {imageFile && (
              <div className="post-form_attachment">
                <img
                  src={imageFile}
                  alt="attachment"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
          <input
            type="submit"
            value="수정"
            className="post-form_submit-btn"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
}
