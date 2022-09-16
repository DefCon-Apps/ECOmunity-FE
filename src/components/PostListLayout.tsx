import React, {useState} from "react";
import styled from "styled-components";
import auth from "../auth";
import PostTitle from "./PostTitle";
import PostThumbnail from "./PostThumbnail";
import PostWrite from "./PostWrite";
import { API_POST_LIST } from "../util/ApiUtil";
import { onAuthStateChanged } from "firebase/auth";
import request from "../util/RequestAPI";

const PostListLayout : React.FC = () => {
    const [isLogin, setLogin] = useState<boolean>();
    const [postList, setPostList] = useState<API_POST_LIST>();
    const [isWriteMode, setWriteMode] = useState<boolean>(false);
    onAuthStateChanged(auth, user => {
        if (isLogin) return;
        if (user) {
            user.getIdToken().then(token => {
                request.post('/board/getPostList', {
                    USER_UID: user.uid,
                    USER_TOKEN: token,
                    POST_IS_NOTICE: false,
                })
                .then(res => {
                    if (res.data.RESULT_CODE == 200) {
                        setPostList(res.data.RESULT_DATA);
                        return;
                    }
                    window.alert('게시글을 불러올 수 없습니다!');
                })
                .catch(err => {
                    console.log(err)
                    window.alert('게시글을 불러올 수 없습니다!');
                });
            });
            setLogin(true);
            return;
        }
        setLogin(false);
    });
    return(
        <PostLayoutGlobalStyle>
            <TitleAndButtonStyle>
                <PostTitle postCount={postList?.POST_COUNT as number}/> {/**타이틀 컴포 */}
                <button onClick={() => auth.currentUser ? setWriteMode(true) : window.alert('로그인이 필요한 서비스입니다.')}>내 활동 인증</button>
            </TitleAndButtonStyle>
            <PostWrite show={isWriteMode}/>
                <PostThumbnailStyle>
                    {postList ?
                    postList.POST_LIST.map(item => <PostThumbnail data={item}/>)
                    : !isLogin ?
                    <h1>로그인이 필요한 서비스입니다.</h1>
                    :
                    <h1>불러오는 중...</h1>
                    }
                </PostThumbnailStyle>
        </PostLayoutGlobalStyle>
    );
}

const PostLayoutGlobalStyle = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
    font-family: 'Pretendard-Regular';
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