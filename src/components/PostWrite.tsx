import React, { useEffect, useState } from "react";
import styled from "styled-components";
import auth from "../auth";
import Modal from "./Modal";
import request from "../util/RequestAPI";
import { User } from "firebase/auth";

interface Props {
    show: boolean;
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const PreviewImage = styled.img`
    width: 20rem;
    align-self: center;
    margin: 1rem;
`;

const UploadImage = styled.label`
    padding: 0.5rem 2rem 0.5rem 2rem;
    margin: 1rem;
    background: #00AE68;
    border-radius: 1rem;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    &:hover {
        background: #206A5D;
        color: #fff;
    }
    &:disabled {
        cursor: none;
    }
`;

const TitleInput = styled.input`
    height: 2rem;
    margin: 0.5rem;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    border: 1px solid rgb(77,77,77);
    border-radius: 10px;
    font-size: 16px;
`;

const ContentTextArea = styled.textarea`
    resize: none;
    height: 10rem;
    margin: 0.5rem;
    padding: 0.5rem;
    border: 1px solid rgb(77,77,77);
    border-radius: 10px;
    font-size: 14px;
`;

const ButtonCancel = styled.button`
    padding: 0.5rem 1rem 0.5rem 1rem;
    margin: 0 0.5rem 0 0;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    &:hover {
        background: #E4E4E4;
    }
`;

const ButtonSubmit = styled.button`
    padding: 0.5rem 1rem 0.5rem 1rem;
    margin: 0 0.5rem 0 0;
    border: none;
    border-radius: 1rem;
    background: #00AE68;
    color: #fff;
    cursor: pointer;
    &:hover {
        background: #206A5D;
    }
`;

const PostWrite: React.FC<Props> = (props) => {
    const [image, setImage] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    function onBeforeReload(e: BeforeUnloadEvent) {
        e.preventDefault();
        e.returnValue = '';
    }
    
    function preventGoBack() {
        window.history.pushState(null, "", window.location.href);
    }

    async function createPostId(user: User, token: string) {
        let postId = "";
        const result = await request.post('/board/getPostList', {
            USER_UID: user.uid,
            USER_TOKEN: token,
            POST_IS_NOTICE: false,
        });
        const idNum = (Number(result.data.RESULT_DATA.POST_LIST[0].POST_ID.replace(/0/g, "")) + 1).toString();
        for (let i = 0; i < 5 - (idNum.length); i++) {
            postId += "0";
        }
        postId += idNum;
        return postId;
    }

    async function updateUserPoint(user: User, token: string) {
        const reqUserInfo = await request.post('/profile/getUserInfo', {
            USER_UID: user.uid,
            USER_TOKEN: token,
        });
        const updateUserPoint = reqUserInfo.data.RESULT_DATA.USER_POINT + 5;

        return request.post('/profile/updateUserInfo', {
            USER_UID: user.uid,
            USER_TOKEN: token,    
            USER_INFO: {
                USER_EMAIL: user.email,
                USER_NAME: user.displayName,
                USER_PHONE: user.phoneNumber,
                USER_POINT: updateUserPoint,
                USER_POSTS: reqUserInfo.data.RESULT_DATA.USER_POSTS,
            }
        });
    }

    const onImageChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const imgFile = e.currentTarget.files![0];
        if (imgFile.size > 1040000) {
            window.alert('1MB 이하의 이미지 파일을 업로드 해주세요!');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = e => {
            setImage(reader.result?.toString());
        }
    }

    const onTextChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
        switch(e.currentTarget.name) {
            case "postTitle":
                setTitle(e.currentTarget.value);
                break;
            case "postContent":
                setContent(e.currentTarget.value);
                break;
        }
    }

    const onSubmit = (e: React.BaseSyntheticEvent) => {
        if (!image) {
            alert('인증 사진 1장을 첨부해주세요!');
            return;
        }
        if (!title) {
            alert('제목을 작성해주세요!');
            return;
        }
        if (!content) {
            alert('내용을 입력해주세요!');
            return;
        }
        if (!window.confirm('게시글을 작성하시겠습니까?')) return;
        e.target.disabled = true;
        e.target.innerText = "작성 중";
        const user = auth.currentUser;
        user?.getIdToken().then(token => {
            createPostId(user, token).then(newPostId => {
                request.post('/board/updatePost', {
                    USER_UID: user.uid,
                    USER_TOKEN: token,
                    POST_ID: newPostId,
                    POST_IS_NOTICE: false,
                    POST_DATA: {
                      POST_AUTHOR: user.displayName,
                      POST_CONTENT: content,
                      POST_DATE: new Date().toLocaleDateString(),
                      POST_IMAGE: image,
                      POST_RECOMMEND: 0,
                      POST_TITLE: title
                    }
                })
                .then(res => {
                    console.log(res);
                    if (res.data.RESULT_CODE == 200) {
                        updateUserPoint(user, token).then(res => {
                            window.removeEventListener("beforeunload", onBeforeReload);
                            window.removeEventListener("popstate", preventGoBack);
                            window.location.reload();
                        });
                        return;
                    }
                    e.target.disabled = false;
                    e.target.innerText = "작성"
                    window.alert('게시글을 작성할 수 없습니다!');
                })
                .catch(err => {
                    console.log(err);
                    window.alert('게시글을 작성할 수 없습니다!');
                });
            });
        });
    }

    useEffect(() => {
        if (props.show) {
            window.history.pushState(null, "", window.location.href);
            window.addEventListener("beforeunload", onBeforeReload);
            window.addEventListener("popstate", preventGoBack);
        }
        else {
            window.removeEventListener("beforeunload", onBeforeReload);
            window.removeEventListener("popstate", preventGoBack);
        }
        
    }, [props.show]);

    return (
        <Modal 
            show={props.show}
            header={
                <h2>내 활동 인증</h2>
            }
            main={
                <Form>
                    <PreviewImage src={image}></PreviewImage>
                    <UploadImage>사진 업로드<input type="file" accept="image/png, image/jpeg" name="postImage" onChange={onImageChange} style={{display: "none"}}></input></UploadImage> 
                    <TitleInput type="text" placeholder="제목을 입력하세요." name="postTitle" onChange={onTextChange}></TitleInput>
                    <ContentTextArea placeholder="내용을 입력하세요." name="postContent" onChange={onTextChange}></ContentTextArea>
                </Form>
            }
            footer={
                <>
                    <ButtonCancel onClick={() => window.location.reload()}>취소</ButtonCancel>
                    <ButtonSubmit onClick={onSubmit}>작성</ButtonSubmit>
                </>
            }
            width="60rem"/>
    );
}
export default PostWrite;

