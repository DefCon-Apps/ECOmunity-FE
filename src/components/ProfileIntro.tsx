import React, {useState} from "react";
import styled from "styled-components";
import { onAuthStateChanged } from 'firebase/auth';
import auth from "../auth";

const ProfileIntro : React.FC = () => {
    const [isLogin, setLogin] = useState<boolean>();
    const uName = auth.currentUser?.displayName;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLogin(true);
            return;
        }
        setLogin(false);
    });

    return(
        <>
            <IntroH1Style>
                {uName}
            </IntroH1Style>
        </>
    );
}


const IntroH1Style = styled.p`
    font-family: 'Pretendard-Regular';
    font-size: 50px;
`;

export default ProfileIntro;