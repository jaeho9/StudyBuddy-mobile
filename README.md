# StudyBuddy 스터디버디

<img width="100%" alt="studybuddyLogo" src="https://github.com/user-attachments/assets/3823aa72-9c72-47d6-8db0-447926c58243">

<br/><br/>

## 📝 프로젝트 소개

**온라인에서 동일한 시험 또는 분야를 학습하는 사람들끼리 정보와 자료를 공유하는 공간입니다.**

- ⭐ **정보 공유**: 시험 준비나 학습에 도움이 되는 자료를 업로드하고 공유할 수 있습니다.
- ⭐ **커뮤니티**: 시험 또는 학습 분야에 대해 관심이 있는 다른 사용자들과 함께 커뮤니티에 가입할 수 있습니다.
- ⭐ **자료 저장**: 특정 자료를 보고 나중에 다시 확인하고 싶을 때를 위해 북마크 기능을 추가할 수 있습니다.

<br />

🔥**프로젝트 기획서**: https://billowy-singer-131.notion.site/5-Study-Buddy-314685f8ae1b484eaf47dd91fceb7c22
🔥**발표 자료**: https://www.canva.com/design/DAGFRL8bfw8/6wkQwIV02tEJaKG0Eo8gXw/view?utm_content=DAGFRL8bfw8&utm_campaign=share_your_design&utm_medium=link&utm_source=shareyourdesignpanel#1

<br/><br/><br/>

## 🙋‍♂️ 팀원 구성

<div align="center">

| **김도영** | **김상우** | **김지형** | **이재호** | **하지혜** |
|:----------:|:----------:|:----------:|:----------:|:----------:|
| [@rlaehdud159](https://github.com/rlaehdud159) | [@BlackShrike](https://github.com/BlackShrike) | [@rlawlgud](https://github.com/rlawlgud) | [@jaeho9](https://github.com/jaeho9) | [@jihyezi](https://github.com/jihyezi) |


</div>


<br/><br/><br/>

## 1. 🖥️ 개발 환경

**Environment**
<br/>
<img  src="https://img.shields.io/badge/VISUAL STUDIO CODE-29B6F6?style=for-the-badge&logo=visual studio&logoColor=white"/> <img  src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=GIT&logoColor=white"/> <img  src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GITHUB&logoColor=white"/>

**Config**
<br/>
<img  src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=white"/>

**Development**
<br/>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img  src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img  src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img  src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

**Communication**
<br/>
<img src="https://img.shields.io/badge/SLACK-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/NOTION-black?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/DISCORD-5865F2?style=for-the-badge&logo=discord&logoColor=white">

**Deployment**
<br/>
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

<br/><br/>

## 2. 🗂️ 프로젝트 구조

```
📦StudyBuddy
📦src
 ┣ 📂components
 ┃ ┣ 📂Community
 ┃ ┃ ┣ 📜CommunityRulesandMembers.jsx
 ┃ ┣ 📂List
 ┃ ┃ ┣ 📜MyPagePostList.jsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📜BirthdateModal.jsx
 ┃ ┃ ┣ 📜CalendarModal.jsx
 ┃ ┃ ┣ 📜CommunityModal.jsx
 ┃ ┃ ┣ 📜CustomModal.jsx
 ┃ ┃ ┣ 📜CustomModal2.jsx
 ┃ ┃ ┣ 📜DeleteConfirmationModal.jsx
 ┃ ┃ ┣ 📜DeleteModal.jsx
 ┃ ┃ ┣ 📜FileModal.jsx
 ┃ ┃ ┣ 📜MyPageModal.jsx
 ┃ ┃ ┣ 📜RemoveModal.jsx
 ┃ ┃ ┣ 📜ResultModal.jsx
 ┃ ┣ 📂Tab
 ┃ ┃ ┣ 📜CustomBottomTab.jsx
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┣ 📜MiddleTab.jsx
 ┃ ┗ 📜Post.jsx
 ┃ ┗ 📜SelectPicker.jsx
 ┣ 📂pages
 ┃ ┣ 📂Add
 ┃ ┃ ┣ 📜Add.jsx
 ┃ ┃ ┗ 📜Book.jsx
 ┃ ┣ 📂Archives
 ┃ ┃ ┣ 📜Archives_Firebase.jsx
 ┃ ┃ ┣ 📜CommentEdit.jsx
 ┃ ┃ ┣ 📜Post_Firebase.jsx
 ┃ ┃ ┣ 📜Post.jsx
 ┃ ┃ ┗ 📜PostEdit.jsx
 ┃ ┣ 📂Community
 ┃ ┃ ┣ 📜Community.jsx
 ┃ ┃ ┗ 📜CommunityAdd.jsx
 ┃ ┃ ┗ 📜CommunityPost.jsx
 ┃ ┃ ┗ 📜CommunitySearch.jsx
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜Alarm.jsx
 ┃ ┃ ┣ 📜Home.jsx
 ┃ ┃ ┗ 📜Search.jsx
 ┃ ┃ ┗ 📜SearchResult.jsx
 ┃ ┣ 📂Login
 ┃ ┃ ┗ 📜Account.jsx
 ┃ ┃ ┗ 📜Login.jsx
 ┃ ┃ ┗ 📜Password.jsx
 ┃ ┃ ┗ 📜Signup1.jsx
 ┃ ┃ ┗ 📜Signup2.jsx
 ┃ ┃ ┗ 📜Signup3.jsx
 ┃ ┃ ┗ 📜Start.jsx
 ┃ ┗ 📂MyPage.jsx
 ┃ ┃ ┣ 📜Camera.jsx
 ┃ ┃ ┣ 📜EditProgile.jsx
 ┃ ┃ ┗ 📜Library.jsx
 ┃ ┃ ┗ 📜MyPage.jsx
 ┃ ┃ ┗ 📜Settings.jsx
 ┃ ┗ 📜Onboarding.jsx
 ┃ ┗ 📜Splash.jsx
 ┣ 📜dummy_data.jsx
 ┗ 📜router.tsx
```

<br/><br/>

## 3. 👥 역할 분담

### **김도영**

- **데이터베이스 설계**
- **Page**
  - Archive

### **김상우**

- **Page**
  - Community
 
### **김지형**

- **Page**
  - Splash/Onboarding
  - Login/SignUp

### **이재호**

- **Page**
  - MyPage

### **하지혜**

- **Page**
  - Post
  - Home

<br/><br/><br/>

## 4. ⏱️ 개발 기간 및 작업 관리

### 개발 기간

- **전체 개발 기간** : 2024년 4월 23일 ~ 5월 17일
- **UI 구현** : 2024년 4월 23일 ~ 5월 2일
- **기능 구현** : 2024년 5월 3일 ~ 5월 14일

### 작업 관리

- **진행 상황 공유** : Discord를 활용하여 팀원들과 실시간 소통하며 진행 상황을 공유했습니다
- **회의 및 기록** : 매주 정기적으로 회의를 진행하며 작업 순서와 방향성을 논의하였고, 주요 논의 사항과 결론은 Notion에 정리하여 기록 및 공유했습니다.

<br/><br/><br/>

## 5. 📄 페이지별 기능

### Splash & OnBoarding
- 공부와 관련된 앱을 나타내기 위한 로고를 보여줍니다.
- StudyBuddy 앱의 기능을 요약 설명해서 보여줍니다.
<br />

### SignUp & Login
- 회원가입을 위한 이메일, 아이디, 비밀번호, 닉네임 입력합니다.
- 이메일과 닉네임은 중복 확인 후 회원가입을 진행합니다.
- 이메일과 비밀번호를 입력한 후 로그인을 할 수 있습니다.
- 로그인 버튼 클릭 시 메인화면으로 이동합니다.
<br/>

### Home
- 전체 게시물과 가입한 커뮤니티 게시물을 카테고리로 분류하여 게시물을 보여줍니다.
- 전체 커뮤니티를 검색해서 보여줍니다.
- 새로운 게시물을 추가할 수 있습니다.
- 알림을 확인할 수 있습니다.
<br/>

### Communities
- 전체 커뮤니티를 확인합니다.
- 특정 커뮤니티 검색 및 특정 커뮤니티를 확인할 수 있습니다.
- 새로운 커뮤니티를 추가할 수 있습니다.
- 커뮤니티 가입 및 해당 커뮤니티 POST, 규칙, 회원을 확인할 수 있습니다.
 <br />

### Archive
- 가입한 커뮤니티 중 북마크를 클릭한 게시물만 보여줍니다.
- 게시물 클릭 시 상세 게시물 페이지로 이동합니다.
- 사용자가 작성한 댓글 및 게시물에 대해선 삭제 및 수정이 가능합니다.
<br/>

### MyPage
- 사용자가 **업로드한** 게시물을 보여줌.
- 사용자가 **좋아요를 누른** 게시물을 보여줌.
- 사용자가 **댓글을 단** 게시물을 보여줌.
- 게시물 **삭제하기**를 누르면 해당 게시물을 삭제함.
- 게시물 **수정하기**를 누르면 게시물 수정 페이지로 이동.
<br/>

### Profile
- 닉네임 입력 시 **중복 여부** 판별 후 안내 메시지를 보여줌
- 닉네임, 자기소개 , 생년월일 , 링크 입력시 MyPage 의 프로필에 입력한 정보 **추가** 또는 **갱신**.
- 사진 수정 버튼 클릭시 라이브러리에서 사진 가져와서 **프로필 사진 수정**
<br/>

https://github.com/user-attachments/assets/96722ce9-9d3b-4bf9-bbba-6544c7b319bc


<br/>

<a href="https://github.com/jihyezi/StudyBuddy"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjihyezi%2FStudyBuddy&count_bg=%23555555&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=GitHub&edge_flat=false"/></a>
