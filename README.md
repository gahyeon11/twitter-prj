# twiter-App

회원가입/로그인 > 사용자 인증 여부 > 메인 페이지 > 하단 메뉴 > 프로필 페리지 > 해시테그 검색 > 알림 리스트

## 사용 기술

- React, CRA
- scss
- Recoil : 상태관리 라이브러리
- firebase
- vercel
- OAuth
  - 사용자의 계정 정보를 안전하게 다른 서비스의 리소스에 접근할 수 있게 하는 것
  - Resource Owner: 보호된 리소스에 대한 액세스 권한을 가진 사용자
  - Client: 리소스에 접근하려는 애플리케이션
  - Authentication Server: 사용자의 인증을 처리하고 클라이언트에게 액세스 토큰 제공
  - Resoutce Server: 실제로 보호된 리소스를 호스팅하고 있는 서버
  - firebase의 authentication 이용할 것
