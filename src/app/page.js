// import Image from "next/image";
// import img01 from "/public/images/coffee-blue.jpg"
// page.js는 필수이다. (생략 불가)
// 각 경로(/, /about, /content ..) 마다 페이지를 렌더링하려면 
// 해당 경로의 page.js 파일이 반드시 필요한다.

// 자식컴포넌트 
import ItemList from './itemList/page'

export default function Home() {
  return (
    // 해당 내용은 부모컴포넌트의 props => {children} 에 삽입된다.
    <>
      {/* <h1>WelCome Home</h1> */}
      {/* 이미지 자체를 import 하지 않으면 너비와 높이를 넣어줘야 한다. */}
      {/* <p><Image src="/images/coffee-blue.jpg" alt="" width={100} height={100} /></p> */}

      {/* 너비 높이는 선택 사항 */}
      {/* <p><Image src={img01} /></p>
      <p><Image src={img01} width={50} height={50} /></p> */}

      <ItemList />

    </>
  );
}
