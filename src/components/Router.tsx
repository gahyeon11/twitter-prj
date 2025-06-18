import HomePage from "pages/home";
import LoginPage from "pages/login";
import NotificationPage from "pages/notifiaction";
import PostDetail from "pages/posts/detail";
import PostEdit from "pages/posts/edit";
import PostListPage from "pages/posts/index";
import PostNew from "pages/posts/new";
import ProfilePage from "pages/profile";
import ProfileEdit from "pages/profile/profileEdit";
import SearchPage from "pages/search";
import SignupPage from "pages/signup/SignupPage";
import { Navigate, Route, Routes } from "react-router-dom";

interface RouterProps {
  isAuthenticated: boolean;
}
export default function Router({isAuthenticated}: RouterProps) {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/users/login" />} />
        </>
      )}
    </Routes>
  );
}
