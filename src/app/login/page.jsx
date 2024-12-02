"use client"
import { Avatar, Button, FormControl, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Page(props) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL
    const API_URL = `${LOCAL_API_BASE_URL}/members/login`;
    const router = useRouter(); // useRouter 초기화
    // 텍스트필드 초기화
    const initUvo = {
        m_id: "",
        m_pw: ""
    }
    const [uvo, setUvo] = useState(initUvo);
    const isBtnChk = !uvo.m_id || !uvo.m_pw;
    function changeUvo(e) {
        const { name, value } = e.target;
        setUvo(prev => ({
            ...prev, [name]: value
        }));
    }
    function goServer(params) {
        axios.post(API_URL, uvo)
            .then(data => {
                if (data.data.success) {
                    console.log(data.data);
                    alert(data.data.message);
                } else {
                    alert(data.data.message);
                    setUvo(initUvo);
                }
            });
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
                </Stack>
            </FormControl>
        </div>
    );
}

export default Page;