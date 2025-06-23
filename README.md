# 🐦 Twiter-App

트위터 스타일의 소셜 피드 앱입니다.  
Firebase 인증 및 OAuth 로그인, 실시간 데이터 처리와 해시태그 검색, 알림 기능 등을 구현했습니다.

> 💡 로그인 후 실시간 피드를 확인하고, 다양한 유저와 해시태그 기반으로 소통할 수 있습니다.

---

## 🚀 데모
👉 [twiter-app.vercel.app](https://twitter-prj.vercel.app)  

---

## ✨ 주요 기능

- 🔐 **회원가입 / 로그인**: Firebase Auth + OAuth (구글, 깃허브 로그인)
- 👤 **사용자 인증 여부 확인** 후 메인 페이지 이동
- 🏠 **메인 피드 페이지**: 최신 트윗 확인, 팔로워 트윗 확인
- 📖 **게시글 페이지**: 게시글 수정 혹은 삭제, 댓글 입력 및 삭제, 좋아요 추가
- 📱 **하단 메뉴 네비게이션**: 홈 / 검색 / 알림 / 프로필 / 로그아웃
- 🙋‍♀️ **프로필 페이지**: 프로필 이미지 및 닉네임 수정, 한/영 변환, 내가 쓴 글 확인, 좋아요한 글 확인
- #️⃣ **해시태그 검색 기능**: 특정 키워드 기반 검색
- 🔔 **알림 리스트**: 팔로우/좋아요 등의 이벤트 알림 제공

---

## 🛠 사용 기술

| 분류 | 기술 |
|------|------|
| Frontend | React (CRA), SCSS |
| 상태관리 | Recoil |
| 인증/데이터베이스 | Firebase (Authentication, Firestore) |
| 배포 | Vercel |
| 로그인 | Firebase OAuth (Google 등) |

---

## 📁 프로젝트 구조

```bash
twiter-prj/
├── public/
├── src/
│   ├── atom/
│   ├── components/
│   ├── constant/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   └── App.tsx
├── .env
├── package.json
└── README.md
