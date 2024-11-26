import ReadOne from '@/app/page/ReadOne';
import ReadThree from '@/app/page/ReadThree';
import ReadTwo from '@/app/page/ReadTwo';
import React from 'react';

// 동적 쿼리는  
async function Page({ params }) {
    const param = await params;
    const msg = param.id;
    let str = "";
    if (msg === '1') {
        str = "HTML 선택";
    } else if (msg === '2') {
        str = "CSS 선택";
    } else if (msg === '3') {
        str = "JavaScript 선택";
    }

    return (
        <>
            <h2> 하이 </h2>
            <h3>{str}</h3>
            <hr />
            <h3>{msg === '1' ? "html 선택" : msg === '2' ? "css 선택" : "js선택"}</h3>
            {msg === '1' ? <ReadOne /> : msg === '2' ? <ReadTwo /> : <ReadThree />}
        </>
    );
}

export default Page;