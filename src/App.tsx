import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBase from './components/NavBase';
import Main from './pages/Main';
import Notice from './pages/Notice';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PostView from './pages/PostView';
import NoticeView from './pages/NoticeView';
import MainStyle from './styles/MainStyle';
import './App.css';

const App: React.FC = () => {
    return (
        <>
        <div className="App">
            <MainStyle>
                <NavBase/>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/notice' element={<Notice />} />
                    <Route path='/post' element={<Post />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/noticeview' element={<NoticeView/>}/>
                    <Route path='/postview' element={<PostView/>} />
                </Routes>
            </MainStyle>
        </div>
        </>
    );
}

export default App;