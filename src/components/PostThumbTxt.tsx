import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from '@fortawesome/free-solid-svg-icons'

interface Props {
    author: string;
    date: string;
    recommend: number;
    title: string;
}


const PostThumbTxt : React.FC<Props> = (props) => {
    return(
        <PostTxtGlobalStyle>
            <CategoryStyle>
                <p>업사이클</p>
            </CategoryStyle>
            
            <PostTxtTitleStyle>
                <p>{props.title}</p>
            </PostTxtTitleStyle>
            
            <OtherContetnsStyle>
                <LikeStyle>
                    <FontAwesomeIcon icon={faLeaf} color="#14C38E" size="2x"/>
                    <p>{props.recommend}</p>
                </LikeStyle>

                <WriterDateStyle>
                    <p>{props.author}</p>
                    <p>{props.date}</p>
                </WriterDateStyle>
            </OtherContetnsStyle>
            
        </PostTxtGlobalStyle>
    );
};

const OtherContetnsStyle = styled.div`
    font-family: 'Pretendard-Regular';
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const LikeStyle = styled.div`
    font-family: 'Pretendard-Regular';
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    margin-top: 0px;

    p{
        font-size: 15pt;
        margin-left: 10px;
    }

`;


const WriterDateStyle = styled.div`
    font-family: 'Pretendard-Regular';
    font-weight: bold;
    font-size: 20px;
    margin-right: 20px;
    padding-bottom: 40px;

    p{
        margin: 0;
    }
`;

const CategoryStyle = styled.div`
    font-family: 'Pretendard-Regular';
    font-weight: bold;
    font-size: 15pt;
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #14C38E;
    margin-left: 26px;
    margin-top: 20px;
`


const PostTxtGlobalStyle = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #000;
    background-color: #fff;
`;

const PostTxtTitleStyle = styled.div`
    font-family: 'Pretendard-Regular';
    font-weight: bold;

    p{
        margin-left: 30px;
        font-size: 15pt;
    }  
`;

export default PostThumbTxt;