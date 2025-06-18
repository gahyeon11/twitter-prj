import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const [hashtag, setHashtag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useContext(AuthContext);

  const handleFileUpload = () => {};

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        content: content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags
      });
      setTags([]);
      setHashtag("");
      setContent("");
      toast.success("게시글을 생성했습니다.");
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

  return (
    <>
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
          <label htmlFor="file-input" className="post-form_file">
            <FiImage className="post-form_file-icon" />
          </label>
          <input
            type="file"
            name="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <input type="submit" value="Tweet" className="post-form_submit-btn" />
        </div>
      </form>
    </>
  );
}
