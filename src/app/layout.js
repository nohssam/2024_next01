"use client"
// layout.js는 선택이다.(RootLayout 제외)
// layout 이 필요없는 간단한 페이지에서는 생략 가능
import Link from "next/link";
import './globals.css'
// 페이지 전체의 공통 구조를 렌더링 할때 사용

// zustand store 호출
import useAuthStore from '../../store/authStore';
import { Button, Stack } from "@mui/material";

// 부모컴포넌트
export default function RootLayout({ children }) {
  // zustand 상태 가져오기
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    // zustand에 있는 함수 호출
    logout();
    alert("로그아웃 되었습니다.")
  }
  return (
    <html lang="en">
      <body style={{ textAlign: "center" }}>
        {/* <header style={{ marginTop: "50px" }}>공통 헤더</header> */}
        {/* 자식컴포넌트가 랜더링 된다. */}
        {/* {children} */}
        {/* <footer style={{ marginTop: "50px" }}>공통 푸터</footer> */}

        <h1><Link href="/">WEB</Link></h1>
        <nav>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Link href="/read/1"> HTML</Link>
            <Link href="/read/2">CSS</Link>
            <Link href="/read/3">JS</Link>
            <Link href="/gallery"> image </Link>
            <Link href="/itemList">ItemList(외부서버)</Link>
            <Link href="/guestBookList">Guestbook(Spring 서버)</Link>
            {isAuthenticated ? (
              <>
                <span style={{ fontSize: "16px" }}><b>{user.m_id}님 환영합니다.</b></span>
                <Button variant="contained" onClick={handleLogout}>logout(Spring 서버)</Button>
              </>
            ) : (
              <>
                <Link href="/login">login(Spring 서버)</Link>
                <Link href="/join">join(Spring 서버)</Link>
              </>
            )}
          </Stack>
        </nav>
        <hr />
        {children}
        <hr />
        <ul>
          {/* /create 이면 create 폴더를 찾는다. 
            (page.jsx(필수), layout.jsx(선택) 가 있어야한다.*/}
          <li><Link href="/create">Create</Link></li>
          <li>Update</li>
          <li><input type="button" value="delete" /></li>
        </ul>
      </body>
    </html>
  );
}
