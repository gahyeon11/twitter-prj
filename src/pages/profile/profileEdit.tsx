import { useEffect, useState, useContext } from "react";
import PostHeader from "components/posts/PostHeader";
import { FiImage } from "react-icons/fi";
import AuthContext from "context/AuthContext";
import {
  ref,
  deleteObject,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";

import { v4 as uuidv4 } from "uuid";
import { storage } from "firebaseApp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GrImage, GrTrash } from "react-icons/gr";
import useTranslation from "hooks/useTranslation";

const STORAGE_DOWNLOAD_URL_STR = "https://firebasestorage.googleapis.com";

export default function ProfileEdit() {
  const [displayName, setDisplayName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const t = useTranslation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setDisplayName(value);
  };

  const onSubmit = async (e: any) => {
    let key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    let newImageUrl = null;

    e.preventDefault();

    try {
      // 기존 유저 이미지가 Firebase Storage 이미지일 경우에만 삭제
      if (
        user?.photoURL &&
        user?.photoURL?.includes(STORAGE_DOWNLOAD_URL_STR)
      ) {
        const imageRef = ref(storage, user?.photoURL);
        if (imageRef) {
          await deleteObject(imageRef).catch((error) => {
            console.log(error);
          });
        }
      }
      // 이미지 업로드
    if (imageUrl?.startsWith("data:")) {
      const data = await uploadString(storageRef, imageUrl, "data_url");
      newImageUrl = await getDownloadURL(data.ref);
    }
      // updateProfile 호출
      if (user) {
        await updateProfile(user, {
          displayName: displayName || "",
          photoURL: newImageUrl || "",
        })
          .then(() => {
            toast.success("프로필이 업데이트 되었습니다.");
            navigate("/profile");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageUrl(result);
    };
  };

  const handleDeleteImage = () => {
    setImageUrl(null);
  };

useEffect(() => {
  if (user?.photoURL?.startsWith("https://")) {
    setImageUrl(user.photoURL);
  }

  if (user?.displayName) {
    setDisplayName(user.displayName);
  }
}, [user?.displayName, user?.photoURL]);

  return (
    <div className="post">
      <PostHeader />
      <form className="post-form" onSubmit={onSubmit}>
        <div className="post-form_profile">
          <input
            type="text"
            name="displayName"
            className="post-form_input"
            placeholder={t("NAME_PLACEHOLDER")}
            onChange={onChange}
            value={displayName}
          />
          {imageUrl && (
            <div className="post-form_attachment">
              <img src={imageUrl} alt="attachment" width={100} height={100} />
            </div>
          )}
          <div className="post-form_submit-area">
            <div className="post-form_image-area">
              <label className="post-form_file" htmlFor="file-input">
                <GrImage className="post-form_file-icon" />
              </label>
              {imageUrl && (
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
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              type="submit"
              value={t("BUTTON_EDIT_PROFILE")}
              className="post-form_submit-btn"
            />
          </div>
        </div>
      </form>
    </div>
    
  );
}
