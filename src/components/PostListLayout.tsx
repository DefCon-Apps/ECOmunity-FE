import React, {useState} from "react";
import styled from "styled-components";
import auth from "../auth";
import PostTitle from "./PostTitle";
import PostThumbnail from "./PostThumbnail";
import PostWrite from "./PostWrite";

const PostListLayout : React.FC = () => {

    const [isWriteMode, setWriteMode] = useState<boolean>(false);
    return(
        <PostLayoutGlobalStyle>
            <TitleAndButtonStyle>
                <PostTitle/> {/**타이틀 컴포 */}
                <button onClick={() => auth.currentUser ? setWriteMode(true) : window.alert('로그인이 필요한 서비스입니다.')}>내 활동 인증</button>
            </TitleAndButtonStyle>
            <PostWrite show={isWriteMode}/>
                <PostThumbnailStyle>
                    <PostThumbnail/>{/**썸넬 6개 넣어야 함. */}
                    <PostThumbnail/>
                    <PostThumbnail/>
                    <PostThumbnail/>
                    <PostThumbnail/>
                    <PostThumbnail/>
                </PostThumbnailStyle>
        </PostLayoutGlobalStyle>
    );
}

const PostLayoutGlobalStyle = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
    margin-top: 40px;
    justify-content: flex-start;
    align-items: flex-start;
`;

const TitleAndButtonStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button{
        background: #00AE68;
        position: relative;
        display: block;
        width: 200px;
        height: 50px;
        padding: 0;
        margin-right: 90px;
        font-weight: 600;
        text-align: center;
        line-height: 50px;
        color: #FFF;
        border-radius: 5px;
        transition: all 0.2s;
        justify-content: center;
        align-items: center;
        float: left;
        font-size: 20px;
        border: 2px solid #21825B
    }
    button:hover{
        background: #21825B;
    }
`;


const PostThumbnailStyle = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export default PostListLayout;