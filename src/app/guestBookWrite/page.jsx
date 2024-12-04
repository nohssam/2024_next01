"use client"
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuthStore from '../../../store/authStore';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Page(props) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const { isAuthenticated, token } = useAuthStore();
    const router = useRouter();
    const [formData, setFormData] = useState({
        gb_name: '',
        gb_subject: '',
        gb_content: '',
        gb_email: '',
        gb_pw: '',
        file: null,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    }

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev, file: e.target.files[0]
        }));
    }
    const handleSubmit = async () => {
        const API_URL = `${LOCAL_API_BASE_URL}/guestbook/write`;
        const data = new FormData();
        data.append("gb_name", formData.gb_name);
        data.append("gb_subject", formData.gb_subject);
        data.append("gb_content", formData.gb_content);
        data.append("gb_email", formData.gb_email);
        data.append("gb_pw", formData.gb_pw);
        if (formData.file) {
            data.append("file", formData.file);
        }

        try {
            const response = await axios.post(API_URL, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.data.success) {
                alert(response.data.message);
                router.push("/guestBookList")
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("오류 발생")
        }
    }
    const isFormValid =
        isAuthenticated &&
        formData.gb_name.trim() !== "" &&
        formData.gb_subject.trim() !== "" &&
        formData.gb_content.trim() !== "" &&
        formData.gb_pw.trim() !== "" &&
        formData.gb_email.trim() !== "";
    return (
        <div style={{ padding: "20px" }}>
            <h2>GuestBook Writer</h2>
            <TextField
                label="이름"
                name='gb_name'
                value={formData.gb_name}
                onChange={handleChange}
                fullWidth
                margin='normal' />
            <TextField
                label="제목"
                name='gb_subject'
                value={formData.gb_subject}
                onChange={handleChange}
                fullWidth
                margin='normal' />
            <SimpleMDE
                value={formData.gb_content}
                onChange={(value) => setFormData((prev) => ({ ...prev, gb_content: value }))}
            />
            <TextField
                label="패스워드"
                name='gb_pw'
                value={formData.gb_pw}
                onChange={handleChange}
                fullWidth
                margin='normal' />

            <TextField
                label="이메일"
                name='gb_email'
                value={formData.gb_email}
                onChange={handleChange}
                fullWidth
                margin='normal' />

            <input type='file' onChange={handleFileChange} />

            <Button
                variant='contained'
                color='primary'
                style={{ marginTop: "20px" }}
                onClick={handleSubmit}
                disabled={!isFormValid} // 로그인 상태와 폼 입력 상태 체크
            >저장</Button>
        </div>
    );
}

export default Page;