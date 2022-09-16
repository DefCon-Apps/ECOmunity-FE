import React from "react";
import styled from "styled-components";

const PostTitle: React.FC<{postCount: number}> = (props) => {
    
    return(
        <>
        <NoticeTitleStyle>
            <NoticePStyle>ECOmunity</NoticePStyle>
            <NoticeSubPStyle>{props.postCount} 개의 푸른 발자취를 확인해보세요.</NoticeSubPStyle>
        </NoticeTitleStyle>
        </>
    );
};

const NoticeTitleStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-family: 'Pretendard-Regular';
    margin-left: 90px;


`;
/**공지사항 컴포넌트 제목에 대한 스타일 */

const NoticePStyle = styled.p`
    font-family: 'Pretendard-Regular';
    font-size:50px;
    margin: 0;
`;

const NoticeSubPStyle = styled.p`
    font-family: 'Pretendard-Regular';
    font-size:30px;
    margin: 0;
`

export default PostTitle;