import React from "react";
import styled from "styled-components";
import NoticeDeco from "../components/NoticeDeco";
import NoticeThumbnail from "../components/NoticeThumbnail";

const companyNum = 3;

const NoticeGlobalStyle = styled.div`
    display: flex;
    position: absolute;
    
`;
/**공지사항 컴포넌트 전체에 대한 스타일 */

const NoticeTitleStyle = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-basis: auto;
    z-index: 1;

`;
/**공지사항 컴포넌트 제목에 대한 스타일 */

const NoticeThumbnailStyle = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: auto;
`

const NoticeTitle: React.FC = () => {
    return(
        <>
        <NoticeTitleStyle>
            <h1>환경 보호 캠페인</h1>
            <h1>{companyNum} 개의 기업이 함께하고 있어요. </h1>
        </NoticeTitleStyle>
        </>
    );
};
/**공지사항 타이틀 컴포넌트 */

const Notice: React.FC = () => {
    return (
        <div>
            <NoticeGlobalStyle>
                
                <NoticeTitle/> {/**타이틀 컴포 */}
                <NoticeThumbnailStyle>
                    <NoticeThumbnail/>{/**썸넬 6개 */}
                    <NoticeThumbnail/>
                    <NoticeThumbnail/>
                    <NoticeThumbnail/>
                    <NoticeThumbnail/>
                    <NoticeThumbnail/>
                </NoticeThumbnailStyle>
            </NoticeGlobalStyle>
            <NoticeDeco/>
        </div>
    );
}
/**Notice 컴포넌트, Flex Container */

export default Notice;