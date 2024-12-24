# StudyBuddy 스터디버디

<img width="100%" alt="studybuddyLogo" src="https://github.com/user-attachments/assets/3823aa72-9c72-47d6-8db0-447926c58243">

<br/><br/>

## 📝 프로젝트 소개

**온라인에서 동일한 시험 또는 분야를 학습하는 사람들끼리 정보와 자료를 공유하는 공간입니다.**

- ⭐ **정보 공유**: 시험 준비나 학습에 도움이 되는 자료를 업로드하고 공유할 수 있습니다.
- ⭐ **커뮤니티**: 시험 또는 학습 분야에 대해 관심이 있는 다른 사용자들과 함께 커뮤니티에 가입할 수 있습니다.
- ⭐ **자료 저장**: 특정 자료를 보고 나중에 다시 확인하고 싶을 때를 위해 북마크 기능을 추가할 수 있습니다.

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

### Home

1. **온보딩**
 - StudyBuddy 설명 온보딩을 통해 안내 메시지를 전달합니다.

<br />


2. **Hot 커뮤니티**
 - 인기있는 커뮤니티를 보여주고 클릭하면 상세 커뮤니티 페이지로 이동합니다.

<br/>

3. **인기글**
 - 인기 게시글을 보여주고 클릭하면 상세 게시글 페이지로 이동합니다.

<br/>

4. **태그별 인기 스터디**
 - 태그별 인기 스터디를 보여주고 클릭하면 상세 스터디 페이지로 이동합니다.

<br/>

### Explore

1. **검색 기능**
 - 검색 결과에 맞는 커뮤니티, 게시글, 스터디 목록을 보여줍니다.
<br/>

2. **검색 기록**
 - 로그인한 아이디별로 검색 기록을 보여주고 선택 삭제 기능을 제공합니다.
<br/>

3. **인기태그**
 - 인기 태그를 보여주고 클릭하면 해당 태그를 검색합니다.
<br/>

4. **Hot 커뮤니티**
 - 인기있는 커뮤니티를 보여주고 클릭하면 상세 커뮤니티 페이지로 이동합니다.
<br/>

5. **인기 스터디**
 - 인기 스터디 게시글을 보여주고 클릭하면 상세 스터디 페이지로 이동합니다.
<br/>

### Communities

1. **커뮤니티 목록**
 - **로그아웃 또는 미가입 상태**: 커뮤니티 분류 목록이 표시되며, 각 분류를 클릭하면 해당 분류의 게시글을 확인할 수 있습니다.
 <br />

 - **가입 상태**: 가입한 커뮤니티 목록이 표시되며, 목록에서 커뮤니티를 클릭하면 상세 페이지로 이동할 수 있습니다.

 <br />

 - **모든 커뮤니티 보기**: 모든 커뮤니티는 분야별로 분류되어 정리되어 있습니다.

 <br />

2. **커뮤니티 상세 페이지**
 - **탭 메뉴**: 커뮤니티의 인기 게시글, 최신 게시글, 규칙, 멤버 등의 정보를 확인할 수 있습니다.
 <br />

 - **커뮤니티 가입**: 가입하면 해당 커뮤니티 게시글을 확인할 수 있으며, 가입 목록에도 추가됩니다.
 <br />
<br />

 - **커뮤니티 탈퇴**: 탈퇴 시에는 가입 목록에서 삭제됩니다.
 <br />

3. **커뮤니티 게시물**
 - **기능**: 게시글에 좋아요, 북마크, 공유 기능이 제공됩니다.
 <br />


 - **작성자 권한**: 자신이 작성한 게시글은 삭제할 수 있습니다.
 <br />

 - **게시글 상세 정보**: 게시글의 준비 기간, 참고 자료, 결과 등의 세부 사항이 표시됩니다.
 - **댓글**: 댓글 섹션에서 댓글을 작성하고 다른 사용자의 댓글을 확인할 수 있습니다.
 <br />

 - **상세 게시글에서 커뮤니티 이동**: 상세 게시글에서 커뮤니티를 클릭하면 커뮤니티 상세 페이지로 이동합니다.
 <br />



### Studies

1. **스터디 분류&피드** : 온라인 및 오프라인 스터디 분류가 표시되며, 클릭하면 해당 분류의 스터디를 확인할 수 있습니다.
<br />

2. **스터디 상세 페이지**
 - **정보 확인**: 스터디의 진행 방식, 모집 인원, 장소 등의 세부 사항이 표시됩니다.
 - **댓글 작성**: 댓글 섹션에서 댓글을 작성하고 다른 사용자의 댓글을 확인할 수 있습니다.
 - **스터디 수정 및 삭제**: 사용자가 작성한 스터디에 `…` 아이콘이 표시되며, 클릭 시 수정 및 삭제 옵션이 나타납니다.
 <br/>

### Notifications
1. **알림**: DM, 내가 가입한 커뮤니티의 새 글, 내가 쓴 글(포스트, 댓글)의 댓글이 작성되거나 좋아요가 추가된다면 해당 유저에게 알림이 갑니다.
   <br/>
   
### Messages
1. **메시지**: 새 유저와 대화를 시작하거나 기존 유저와 대화를 할 수 있습니다.
<br />

2. **삭제**: 필요시 대화 내용을 삭제하여 초기화할 수 있습니다.
   <br/>
   
### Bookmarks
1. **커뮤니티 목록**: 사용자가 북마크한 게시글의 커뮤니티 목록이 나열되며, 클릭 시 해당 커뮤니티의 게시글 중 사용자가 북마크한 게시글만 표시됩니다.
2. **북마크 게시글 확인**: 사용자가 북마크한 게시글이 작성 시간 순으로 나열됩니다.
3. **북마크 추가**: 커뮤니티 상세 페이지에서 북마크 아이콘을 클릭하여 게시글을 추가할 수 있으며 Bookmarks 페이지에 나열되어 쉽게 관리할 수 있습니다.
4. **북마크 해제**: 해제 시 해당 게시글이 즉시 북마크 목록에서 제거됩니다.
   <br/>

### MyPage 기능
- 사용자가 **업로드한** 게시물을 보여줌.
- 사용자가 **좋아요를 누른** 게시물을 보여줌.
- 사용자가 **댓글을 단** 게시물을 보여줌.
- 게시물 **삭제하기**를 누르면 해당 게시물을 삭제함.
- 게시물 **수정하기**를 누르면 게시물 수정 페이지로 이동.
   <br />

### Profile
- 닉네임 입력 시 **중복 여부** 판별 후 안내 메시지를 보여줌
- 닉네임, 자기소개 , 생년월일 , 링크 입력시 MyPage 의 프로필에 입력한 정보 **추가** 또는 **갱신**.
- 사진 수정 버튼 클릭시 라이브러리에서 사진 가져와서 **프로필 사진 수정**
<br />

### Post

1. **게시글 작성** : 사용자는 가입한 커뮤니티에 한해 해당 커뮤니티와 관련 게시글을 작성할 수 있습니다.
<br />

2. **커뮤니티 개설** : 사용자는 새로운 커뮤니티를 생성할 수 있습니다.
<br />

3. **스터디 생성** : 사용자는 온라인 또는 오프라인 스터디를 모집할 수 있습니다.
   <br/>

### SignUp

1. **회원가입**: 사용자는 본인이 사용하는 이메일을 통해 회원가입을 할 수 있습니다.
2. **중복확인**: 회원가입을 할 때 아이디, 닉네임 중복 확인 기능을 제공합니다.
<br/>

### Login/Logout

1. **로그인**: 사용자는 회원가입을 한 이메일을 통해 로그인 할 수 있습니다.
2. **로그아웃**: 사용자는 로그아웃 버튼을 통해 로그아웃을 할 수 있습니다. 
   <br/><br/>



https://github.com/user-attachments/assets/96722ce9-9d3b-4bf9-bbba-6544c7b319bc


<br/>

<a href="https://github.com/jihyezi/StudyBuddy"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjihyezi%2FStudyBuddy&count_bg=%23555555&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=GitHub&edge_flat=false"/></a>
