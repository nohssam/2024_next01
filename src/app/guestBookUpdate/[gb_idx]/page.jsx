"use client"

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../../store/authStore';
function Page({ params }) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const { isAuthenticated, token } = useAuthStore();
    const [orginalData, setOriginalData] = useState(null);
    const [editData, setEditData] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null);     // 에러 상태

    // 상세보기 한번 더하기 
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // 로딩 시작
                const { gb_idx } = await Promise.resolve(params);
                const API_URL = `${LOCAL_API_BASE_URL}/guestbook/detail/${gb_idx}`;

                // 데이터 가져오기
                const response = await axios.get(API_URL);
                const data = response.data;
                if (data.success) {
                    setOriginalData(data.data);
                    setEditData(data.data);

                } else {
                    setError("Failed to fetch product data.");
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError("Failed to fetch product data.");
            } finally {
                setLoading(false); // 로딩 종료
            }
        };
        fetchData();
    }, [params, LOCAL_API_BASE_URL]);

    console.log("ori", orginalData)
    console.log("edt", editData)
    console.log("isAuth", isAuthenticated)

    // 입력값 변경 
    const changItem = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // 데이터 변경 체크
    const isChanged = () => {
        return (
            orginalData &&
            (orginalData.gb_name !== editData.gb_name ||
                orginalData.gb_subject !== editData.gb_subject ||
                orginalData.gb_content !== editData.gb_content ||
                orginalData.gb_email !== editData.gb_email
            )
        );
    };

    const handleUpdate = async () => {
        const { gb_idx } = await Promise.resolve(params);
        const API_URL = `${LOCAL_API_BASE_URL}/guestbook/update/${gb_idx}`;
        try {
            const response = await axios.get(API_URL, editData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                alert(response.data.message)
                router.push(`/guestBookDetails/${gb_idx}`)
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            alert(response.data.message)
        }
    }
    // 로딩 중
    if (loading) {
        return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
    }

    // 에러 발생 시
    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
                <h2>Error:</h2>
                <p>{error}</p>
            </div>
        );
    }
    return (
        <>
            <h2 className="title">GuestBookList</h2>
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableBody>
                        <TableRow>
                            <TableCell className="table-cell">NAME</TableCell>
                            <TableCell className="table-cell">
                                <TextField type='text' name="gb_name" value={editData.gb_name} onChange={changItem} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">SUBJECT</TableCell>
                            <TableCell className="table-cell">
                                <TextField type='text' name="gb_subject" value={editData.gb_subject} onChange={changItem} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">CONTENT</TableCell>
                            <TableCell className="table-cell">
                                <TextField type='text' name="gb_content" value={editData.gb_content} onChange={changItem} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">EMAIL</TableCell>
                            <TableCell className="table-cell">
                                <TextField type='text' name="gb_email" value={editData.gb_email} onChange={changItem} />
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button variant='contained'
                    color='primary'
                    onClick={handleUpdate}
                    disabled={!isAuthenticated || !isChanged()} // 로그인 및 변경 여부 확인
                >수정</Button>
            </div>
        </>
    );
}

export default Page;