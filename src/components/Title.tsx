import React from "react";
import styled from "styled-components";

const Title : React.FC = () => {
    return(
        <>
        <TitleLayoutStyle>
            <TitleMainStyle>
                ECOmunity
            </TitleMainStyle>
            <TitleSubStyle>
                우리들의 행동이 만드는 푸른 발자취.
            </TitleSubStyle>
        </TitleLayoutStyle>
        </>
    );
}

const TitleLayoutStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 20px;
    margin-left: 80px;
    
`;/**Flex Container of Title Component */

const TitleMainStyle = styled.p`
    color: white;
    font-family: 'Pretendard-Regular';
    font-size:100px;
    margin: 0;
`;

const TitleSubStyle = styled.div`
    font-family: 'Pretendard-Regular';
    font-size:30px;
    color: white;
    margin: 0;
`;

export default Title;
