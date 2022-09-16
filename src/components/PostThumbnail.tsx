import React from "react";
import styled from "styled-components";
import PostThumbImg from "./PostThumbImg";
import PostThumbTxt from "./PostThumbTxt";
import { Link } from "react-router-dom";
import { API_POST_LIST_ITEM } from "../util/ApiUtil";

const PostThumbnail : React.FC<{data: API_POST_LIST_ITEM}> = (props) => {
    return(
        <PostLinkStyle>
        <Link to={`/postview?id=${props.data.POST_ID}`}> 
            <PostThumbnailStyle>
                    <PostThumbImg src={props.data.POST_IMAGE}/>
                    <PostThumbTxt
                        author={props.data.POST_AUTHOR}
                        date={props.data.POST_DATE}
                        recommend={props.data.POST_RECOMMEND}
                        title={props.data.POST_TITLE}/>
            </PostThumbnailStyle>
        </Link>
        </PostLinkStyle>
    );
};

const PostLinkStyle = styled.div`
    font-family: 'Pretendard-Regular';
    a{
        text-decoration: none; color: white;
    }
    :visited{
        text-decoration: none
    };
`
const PostThumbnailStyle = styled.div`

    display: flex;
    flex-direction: column;
    margin-bottom : 50px;
    margin-top: 50px;
    margin-left: 85px;
    box-shadow: 3px 3px 8px 1px #000;   

`;




export default PostThumbnail;