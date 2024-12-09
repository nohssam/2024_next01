"use client"
import { Avatar, Button, FormControl, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react';

// zustand store 호출
import useAuthStore from '../../../store/authStore';

function Page(props) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL
    const API_URL = `${LOCAL_API_BASE_URL}/members/login`;
    const router = useRouter(); // useRouter 초기화
    const { login } = useAuthStore(); // zustand login 함수 가져오기 


    // 텍스트필드 초기화
    const initUvo = {
        m_id: "",
        m_pw: ""
    };

    const [uvo, setUvo] = useState(initUvo);
    const isBtnChk = !uvo.m_id || !uvo.m_pw;

    // URL 쿼리 파라미터에서 토큰 확인 후 처리
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get("token");
        const username = searchParams.get("username");
        const email = searchParams.get("email");
        const name = searchParams.get("name");

        if (token && username && email && name) {
            alert("로그인 성공");
            // 사용자 정보 생성
            const user = {
                username, email, name

            };
            login(user, token); // Zustand 상태에 저장
            router.push("/"); // 홈으로 이동
        }
    }, [login, router]);

    function changeUvo(e) {
        const { name, value } = e.target;
        setUvo(prev => ({
            ...prev, [name]: value
        }));
    }
    function goServer(params) {
        axios.post(API_URL, uvo)
            .then(response => {
                const data = response.data;
                if (data.success) {
                    alert(data.message);
                    login(data.data, data.token);
                    router.push('/');
                } else {
                    alert(data.message);
                    setUvo(initUvo);
                }
            });
    }

    function handleKakaoLogin() {
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
    }

    function handleNaverLogin() {
        window.location.href = "http://localhost:8080/oauth2/authorization/naver";
    }

    return (
        <div>
            <FormControl>
                {/* 수직정렬 */}
                <Stack direction="column" spacing={1} alignItems='center'>
                    <Avatar />
                    <TextField type='text' label='아이디' name='m_id' value={uvo.m_id} onChange={changeUvo} />
                    <TextField type='password' label='패스워드' name='m_pw' value={uvo.m_pw} onChange={changeUvo} />
                    <Button fullWidth variant='contained' disabled={isBtnChk} onClick={goServer}>Sign in</Button>
                    <Button fullWidth variant='contained' onClick={handleKakaoLogin} style={{ backgroundColor: '#FFEB3B' }}>카카오 로그인</Button>
                    <Button fullWidth variant='contained' onClick={handleNaverLogin} style={{ backgroundColor: '#03C75A' }}>네이버 로그인</Button>
                </Stack>
            </FormControl>
        </div>
    );
}

export default Page;