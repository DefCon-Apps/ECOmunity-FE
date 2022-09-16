import React, { useState } from "react";
import styled from "styled-components";
import NoticeThumbnail from "./NoticeThumbnail";
import NoticeTitle from "./NoticeTitle";
import request from "../util/RequestAPI";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../auth";
import { API_POST_LIST } from "../util/ApiUtil";

const NoticeLayout : React.FC = () => {
    const [isLogin, setLogin] = useState<boolean>();
    const [postList, setPostList] = useState<API_POST_LIST>();
    onAuthStateChanged(auth, user => {
        if (isLogin) return;
        if (user) {
            user.getIdToken().then(token => {
                request.post('/board/getPostList', {
                    USER_UID: user.uid,
                    USER_TOKEN: token,
                    POST_IS_NOTICE: true,
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
        <NoticeGlobalStyle>
            <NoticeTitle postCount={postList?.POST_COUNT as number}/> {/**타이틀 컴포 */}
                <NoticeThumbnailStyle>
                    {postList ?
                    postList.POST_LIST.map(item => <NoticeThumbnail data={item}/>)
                    : !isLogin ?
                    <h1>로그인이 필요한 서비스입니다.</h1>
                    :
                    <h1>불러오는 중...</h1>
                    }
                </NoticeThumbnailStyle>
        </NoticeGlobalStyle>
    );
}

const NoticeGlobalStyle = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
    margin-top: 40px;
    justify-content: flex-start;
    align-items: flex-start;
    font-family: 'Pretendard-Regular';
`;
/**공지사항 컴포넌트 전체에 대한 스타일 */

const NoticeThumbnailStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export default NoticeLayout;