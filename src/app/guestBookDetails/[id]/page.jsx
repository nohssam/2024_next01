"use client";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import './guestBookDetails.css'
import useAuthStore from '../../../../store/authStore';
import { useRouter } from 'next/navigation';


function Page({ params }) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const [item, setItem] = useState(null);       // 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null);     // 에러 상태
    const { isAuthenticated, token } = useAuthStore();       // 로그인 상태
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // 로딩 시작

                const { id } = await Promise.resolve(params);
                const API_URL = `${LOCAL_API_BASE_URL}/guestbook/detail/${id}`;

                // 데이터 가져오기
                const response = await axios.get(API_URL);
                const data = response.data;
                if (data.success) {
                    setItem(data.data);
                } else {
                    setError("Failed to fetch product data.");
                }
            } catch (err) {
                console.error("Error fetching product data:", err);
                setError("Failed to fetch product data.");
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchData();
    }, [params, LOCAL_API_BASE_URL]);

    // delete
    const handleDelete = async () => {
        // 버트를 항상 활성화 하면 
        // if (!isAuthenticated) {
        //     alert("로그인이 필요합니다.")
        //     router.push("/login");
        // }

        // 상세보기 성공했을 때 데이터 item에 넣었다.
        const API_URL = `${LOCAL_API_BASE_URL}/guestbook/delete/${item.gb_idx}`;
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                alert(response.data.message);
                router.push("/guestBookList")
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("delete error");
        }
    }

    // update
    const handleUpdate = async () => {
        // 수정페이지로 이동
        router.push(`/guestBookUpdate/${item.gb_idx}`)
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

    // 로딩 완료 후
    return (
        <>
            <h2 className="title">GuestBookList</h2>
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableBody>
                        <TableRow>
                            <TableCell className="table-cell">NAME</TableCell>
                            <TableCell className="table-cell">{item.gb_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">SUBJECT</TableCell>
                            <TableCell className="table-cell">{item.gb_subject}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">CONTENT</TableCell>
                            <TableCell className="table-cell">{item.gb_content}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">EMAIL</TableCell>
                            <TableCell className="table-cell">{item.gb_email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">DATE</TableCell>
                            <TableCell className="table-cell">{item.gb_regdate.substring(0, 10)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button variant='contained'
                    color='primary'
                    onClick={handleUpdate}
                    disabled={!isAuthenticated}
                >수정</Button>

                <Button variant='contained'
                    color='error'
                    onClick={handleDelete}
                    style={{ marginLeft: "10px" }}
                    disabled={!isAuthenticated}
                >삭제</Button>
            </div>
        </>
    );
}
export default Page;