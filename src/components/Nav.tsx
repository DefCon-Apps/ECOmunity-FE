import React, {useState} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../auth";


const Nav: React.FC = () => {
    const [isLogin, setLogin] = useState<boolean>();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLogin(true);
            return;
        }
        setLogin(false);
    });
    return(
            <GlobalNavStyle>
                    <NavMenuStyle>
                        <NavMenuStyle>
                            <p><Link to='/'>HOME</Link></p>
                            <p><Link to='/notice'>NEW ECO</Link></p>
                            <p><Link to='/post'>OUR ECO</Link></p>
                            <p><Link to='/profile'>MY ECO</Link></p>
                            <p><Link to='/login'>
                                {isLogin ?
                                    <>Logout</>
                                    :
                                    <>Login</>
                                }
                                </Link></p>
                        </NavMenuStyle>
                    </NavMenuStyle>
            </GlobalNavStyle>
    );

}


const GlobalNavStyle = styled.div`
    font-family: 'Pretendard-Regular';
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    background-color: rgba( 0, 0, 0, 0.6 );
    z-index: 150;
    width: 100%;
`;

const NavMenuStyle = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    z-index: 102;
    
    
    p{
        font-size: 20px;
        margin-left : 100px;
        margin-right: 100px;

        a { text-decoration: none; color: white; }
        a:visited { text-decoration: none; }
    }
    
`;

export default Nav;