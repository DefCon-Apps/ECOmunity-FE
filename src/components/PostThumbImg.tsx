import React from "react";
import styled from "styled-components";

const testImgSrc = "https://img.khan.co.kr/news/2022/01/11/2022011101001309200110521.jpg";

const PostThumbImg : React.FC<{src: string}> = (props) => {
    return(
        <PostThumbImgGlobalStyle>
            <img src={props.src}/>
        </PostThumbImgGlobalStyle>
    );

}

const PostThumbImgGlobalStyle = styled.div`
    font-family: 'Pretendard-Regular';
    width: 450px;
    height: 300px;

    img{
        width: 100%;
        height: 100%;
    }
`

export default PostThumbImg;