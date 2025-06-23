import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const navigate = useNavigate();
  const t = useTranslation();

  const onClickSocialLogin = async (e: any) => {
    const {
      target: { name },
    } = e;

    let provider;
    const auth = getAuth(app);

    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(
      auth,
      provider as GithubAuthProvider | GoogleAuthProvider
    )
      .then((result) => {
        console.log(result);
        toast.success("로그인 되었습니다.");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error?.message;
        toast?.error(errorMessage);
      });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      navigate("/");
      toast.success("성공적으로 회원가입 되었습니다.");
    } catch (e) {
      toast.success(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요.");
      } else if (value !== passwordConfirmation) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. ");
      } else {
        setError("");
      }
    }
    if (name === "password_confirmation") {
      setPasswordConfirmation(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요.");
      } else if (value !== password) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. ");
      } else {
        setError("");
      }
    }
  };

  return (
    <form className="form form-lg" onSubmit={onSubmit}>
      <div className="form_title">{t("MENU_SIGNUP")}</div>
      <div className="form_block">
        <label htmlFor="email">{t("FORM_EMAIL")}</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div className="form_block">
        <label htmlFor="password">{t("FORM_PASSWORD")}</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <div className="form_block">
        <label htmlFor="password_confirmation">
          {t("FORM_PASSWORD_CHECK")}
        </label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={onChange}
          required
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form_block">
          <div className="form_error">{error}</div>
        </div>
      )}

      <div className="form_block">
        {t("YES_ACCOUNT")}
        <Link to="/users/login" className="form_link">
          {t("SIGNIN_LINK")}
        </Link>
      </div>
      <div className="form_block-lg">
        <button
          type="submit"
          className="form_btn-submit"
          disabled={error?.length > 0}
        >
          {t("MENU_SIGNUP")}
        </button>
      </div>
      <div className="form_block">
        <button
          type="button"
          name="google"
          className="form_btn-google"
          onClick={onClickSocialLogin}
        >
          {t("SIGNUP_GOOGLE")}
        </button>
      </div>
      <div className="form_block">
        <button
          type="button"
          name="github"
          className="form_btn-github"
          onClick={onClickSocialLogin}
        >
          {t("SIGNUP_GITHUB")}
        </button>
      </div>
    </form>
  );
}
