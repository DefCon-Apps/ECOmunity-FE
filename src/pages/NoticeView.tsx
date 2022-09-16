import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import auth from "../auth";
import request from "../util/RequestAPI";
import { API_POST_DATA } from "../util/ApiUtil";

const testImgSrc = "http://newsteacher.chosun.com/site/data/img_dir/2019/08/29/2019082900396_0.jpg";
const bgImgSrc = "https://images.pexels.com/photos/1384908/pexels-photo-1384908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const NoticeView : React.FC = () => {
    const params = new URLSearchParams(window.location.search);
    const [postData, setPostData] = useState<API_POST_DATA>();
    const [isLoaded, setLoaded] = useState<boolean>();
    onAuthStateChanged(auth, user => {
        if (isLoaded) return;
        if (user) {
            user.getIdToken().then(token => {
                request.post('/board/getPost', {
                    USER_UID: user.uid,
                    USER_TOKEN: token,
                    POST_ID: params.get('id'),
                    POST_IS_NOTICE: true,
                })
                .then(res => {
                    console.log(res);
                    if (res.data.RESULT_CODE == 200) {
                        setPostData(res.data.RESULT_DATA);
                        setLoaded(true);
                        return;
                    }
                    setLoaded(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoaded(false);
                });
            });
            return;
        }
        setLoaded(false);
    });
    return(
        <NoticeWrapper>
            <NoticeBgImgStyle src={bgImgSrc}/>
            {postData ?
                <NoticeViewStyle>
                    <TitleStyle>
                        {postData.POST_TITLE}
                    </TitleStyle>

                    <WriterAndDateStyle>
                        <p>{postData.POST_DATE} - {postData.POST_AUTHOR} 작성</p>
                    </WriterAndDateStyle>

                    <NoticeContentsStyle>
                        <NoticeImageStyle src={postData.POST_IMAGE} />

                        <NoticeTextContentStyle>
                            {postData.POST_CONTENT.replace(/\\n/g, "\n")}
                        </NoticeTextContentStyle>

                    </NoticeContentsStyle>

                </NoticeViewStyle>
            : isLoaded === undefined ?
                <h1>불러오는 중...</h1>
            :
                <h1>게시글을 불러올 수 없습니다!</h1>
            }
        </NoticeWrapper>
    );
};

const NoticeBgImgStyle = styled.img`
    width: 2400px;
    height: 1600px;
    position: fixed;
    z-index: -100;
    filter: blur(3px);
`;

const NoticeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
`;
const NoticeViewStyle = styled.div`
    width: 70%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1%;
    background-color: rgba( 255, 255, 255, 0.6 );
`;


const TitleStyle = styled.h1`
    font-family: 'Pretendard-Regular';
    font-size: 30pt;
    
`;

const WriterAndDateStyle = styled.div`
    font-family: 'Pretendard-Regular';
    font-size: 15pt;
    display: flex;
    flex-direction: row-reverse;

    
`;

const NoticeContentsStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`;

const NoticeTextContentStyle = styled.div`
    width: 70%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 15pt;
    white-space: pre;
`;

const NoticeImageStyle = styled.img`
    width: 70%;
    height: 50%;
    
`;



export default NoticeView;
