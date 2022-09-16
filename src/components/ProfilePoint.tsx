import React, {useState} from "react";
import { onAuthStateChanged } from 'firebase/auth';
import auth from "../auth";
import styled from "styled-components";
import request from "../util/RequestAPI";

const ProfilePoint:React.FC = () => {
    const [point, setPoint] = useState(0);
    const [isLogin, setLogin] = useState<boolean>();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            user?.getIdToken().then(token => {
                request.post('/profile/getUserInfo', {
                    USER_UID: user.uid,
                    USER_TOKEN: token,
                })
                .then(res => {
                    setLogin(true);
                    setPoint(res.data.RESULT_DATA.USER_POINT);
                })
                .catch(err => {
                    console.log(err);
                });
            });
            setLogin(true);
            return;
        }
        setLogin(false);
    });

    return(
        <div>
            {isLogin?
            <div>
                <ProfileUserNameStyle>{auth.currentUser?.displayName} 님의 Ecomunity 포인트</ProfileUserNameStyle>
                <ProfileUserPointStyle>{point} 점</ProfileUserPointStyle>
            </div>
            :
            <h1>로그인 하고 나의 점수를 확인해보세요.</h1>
            }
        </div>
    );
}

const ProfileUserNameStyle = styled.p`
    font-family: 'Pretendard-Regular';
    font-size : 60px;
`;

const ProfileUserPointStyle = styled.h1`
    font-family: 'Pretendard-Regular';
    font-size : 80px;
    
`;

export default ProfilePoint;
