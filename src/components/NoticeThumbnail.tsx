import React from "react";
import styled from "styled-components";
import NoticeImg from "./NoticeImg";
import NoticeTxt from "./NoticeTxt";
import { Link } from "react-router-dom";
import { API_POST_LIST_ITEM } from "../util/ApiUtil";

const NoticeThumbnail : React.FC<{data: API_POST_LIST_ITEM}> = (props) => {
    return(
        <PostLinkStyle>
        <Link to={`/noticeview?id=${props.data.POST_ID}`}> 
            <NoticeThumbnailStyle>
                    <NoticeImg src={props.data.POST_IMAGE}/>
                    <NoticeTxt 
                        author={props.data.POST_AUTHOR}
                        date={props.data.POST_DATE}
                        title={props.data.POST_TITLE}/>
            </NoticeThumbnailStyle>
        </Link>
        </PostLinkStyle>
    );
};

const PostLinkStyle = styled.div`
    a{
        text-decoration: none; color: white;
    }
    :visited{
        text-decoration: none
    };
`
const NoticeThumbnailStyle = styled.div`
    font-family: 'Pretendard-Regular';
    display: flex;
    flex-direction: column;
    margin-bottom : 50px;
    margin-top: 50px;
    margin-left: 85px;
    box-shadow: 3px 3px 8px 1px #000;   

`;




export default NoticeThumbnail;