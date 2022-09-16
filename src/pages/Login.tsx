import React, { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import auth, {signInGoogle, signOutGoogle} from '../auth'
import styled from 'styled-components';

const Login: React.FC = () => {

    const [isLogin, setLogin] = useState<boolean>();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLogin(true);
            return;
        }
        setLogin(false);
    });

    return (
        <LoginMainStyle>
            <LoginBgImageStyle src="https://images.pexels.com/photos/209982/pexels-photo-209982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
            {isLogin ?
                <LoginContentsStyle>
                    <h1>환영합니다!</h1>
                    <img src={auth.currentUser?.photoURL as string}></img>
                    <p>안녕하세요, {auth.currentUser?.displayName}님</p>
                    <p>오늘도 ECOmunity와 함께해주셔서 감사합니다</p>
                    <button onClick={signOutGoogle}>로그아웃</button>
                </LoginContentsStyle>
                :
                <LoginContentsStyle>
                    <h1>안녕하세요</h1>
                    <h2>우리의 행동으로 만드는 푸르른 발자취</h2>
                    <h1>ECOmunity입니다.</h1>
                    <button onClick={signInGoogle}>Google 계정으로 로그인</button>
                </LoginContentsStyle>
            }
            </LoginMainStyle>
    );
}

const LoginContentsStyle = styled.div`
    font-family: 'Pretendard-Regular';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 180px;
    font-size: 20pt;
    color: #FFF;


    h1{
        font-family: 'Pretendard-Regular';
        font-size: 50pt;
    }
    img{
        width:50%;
        border-radius: 70%;
        border: 5px solid #00AE68;
    }
    button{
        background: #00AE68;
        position: relative;
        display: block;
        width: 40%;
        padding: 0;
        margin: 10px 20px 10px 0;
        font-weight: 600;
        text-align: center;
        line-height: 50px;
        color: #FFF;
        border-radius: 5px;
        transition: all 0.2s;
        justify-content: center;
        align-items: center;
        float: left;
        font-size: 20px;
    }
    button:hover{
        background: #21825B;
    }
    
`;

const LoginMainStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginBgImageStyle = styled.img`    
    width: 100%;
    height: 150%;
    position: fixed;
    z-index: -100;
    background-color: rgba(0,0,128,0.1);
    filter: blur(10px);
`;

export default Login;