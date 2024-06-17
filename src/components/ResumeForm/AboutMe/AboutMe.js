import React, { useEffect, useState } from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import styled from 'styled-components';
import blogIcon from '../../../assets/blog-icon.png';
import githubIcon from '../../../assets/github-icon.png';
import emailIcon from '../../../assets/email-icon.png';
import phoneIcon from '../../../assets/phone-icon.png';
import birthdayIcon from '../../../assets/birthday-icon.png';
import { useAboutMe } from "../../../contexts/AboutMeContext";

const Input = styled.input`
    padding: 8px;
    margin-right: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;
    font-size: 15px;
`;

const Button = styled.button`
    width: 25px;
    height: 25px;
    background-color: ${props => props.active ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)'};
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 7px;
`;

const ImagePreview = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-style: dashed;
    border-color: rgba(239, 245, 255, 1);
    padding: 15px 0;
`;

function useInputValidation(initialValue, pattern) {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(true);

    function onChange(e) {
        const newValue = e.target.value;
        const valid = pattern.test(newValue);
        setIsValid(valid);
        setValue(newValue);
    }

    return { value, setValue, onChange, isValid, setIsValid };
}

const AboutMe = () => {
    const { aboutMeInfo, updateAboutMeInfo } = useAboutMe();
    const [isActive, setIsActive] = useState({
        phone: false,
        email: false,
        githubAddress: false,
        blogAddress: false,
        selfIntroduction: false,
        birthday: false
    });

    const toggleActive = (field) => {
        setIsActive(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const phoneInput = useInputValidation("", /^\d{3}-\d{4}-\d{4}$/);
    const emailInput = useInputValidation("", /^[a-zA-Z0-9.]+@[a-z]+\.[a-z]+$/);
    const birthdayInput = useInputValidation("", /^\d{4}\.\d{2}\.\d{2}$/);
    const githubInput = useInputValidation("", /^https:\/\/github\.com\/([a-zA-Z0-9_-]+\/?[a-zA-Z0-9_-]*\/?)*$/);
    const blogInput = useInputValidation("", /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/);
    const introInput = useInputValidation("", /^[\s\S]*$/);

    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
            updateAboutMeInfo("profileImage", reader.result);
        }

        reader.readAsDataURL(file);
    };

    const handleInputChange = (field, value) => {
        updateAboutMeInfo(field, value);
    };

    useEffect(() => {
        console.log(aboutMeInfo);
    }, [aboutMeInfo]);

    return (
        <SectionContainer title="About Me">
            <div style={{display: "flex", paddingTop: 10}}>
                <div>
                    <Input
                        value={aboutMeInfo.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="이름"
                        style={{marginLeft: 39}}
                    />

                    <div style={{display: "flex"}}>
                        <img src={birthdayIcon} alt="birthday" style={{padding: 7, width: 25, height: 25}}/>
                        <div>
                            <Input
                                value={birthdayInput.value}
                                onChange={(e) => {
                                    birthdayInput.onChange(e);
                                    handleInputChange("birthday", e.target.value);
                                }}
                                placeholder="생년월일 (YYYY.MM.DD)"
                                disabled={!isActive.birthday}
                            />
                            {isActive.birthday && !birthdayInput.isValid && (
                                <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>
                                    날짜 형식을 확인해 주세요.
                                </p>
                            )}
                        </div>
                        <Button onClick={() => toggleActive('birthday')} active={isActive.birthday}>
                            {isActive.birthday ? '-' : '+'}
                        </Button>
                    </div>

                    {/* Similar blocks for other fields: phone, email, githubAddress, blogAddress */}
                    <div style={{display: "flex"}}>
                        <img src={phoneIcon} alt="phone" style={{padding: 7, width: 25, height: 25}}/>
                        <div>
                            <Input
                                value={phoneInput.value}
                                onChange={(e) => {
                                    phoneInput.onChange(e);
                                    handleInputChange("phone", e.target.value);
                                }}
                                placeholder="전화번호 ('-' 포함)"
                                disabled={!isActive.phone}
                            />
                            {isActive.phone && !phoneInput.isValid && (
                                <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>
                                    전화번호 형식을 확인해 주세요.
                                </p>
                            )}
                        </div>
                        <Button onClick={() => toggleActive('phone')} active={isActive.phone}>
                            {isActive.phone ? '-' : '+'}
                        </Button>
                    </div>

                    <div style={{display: "flex"}}>
                        <img src={emailIcon} alt="email" style={{padding: 7, width: 25, height: 25}}/>
                        <div>
                            <Input
                                value={emailInput.value}
                                onChange={(e) => {
                                    emailInput.onChange(e);
                                    handleInputChange("email", e.target.value);
                                }}
                                placeholder="이메일"
                                disabled={!isActive.email}
                            />
                            {isActive.email && !emailInput.isValid && (
                                <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>
                                    이메일 형식을 확인해 주세요.
                                </p>
                            )}
                        </div>
                        <Button onClick={() => toggleActive('email')} active={isActive.email}>
                            {isActive.email ? '-' : '+'}
                        </Button>
                    </div>

                    <div style={{display: "flex"}}>
                        <img src={githubIcon} alt="github" style={{padding: 7, width: 25, height: 25}}/>
                        <div>
                            <Input
                                value={githubInput.value}
                                onChange={(e) => {
                                    githubInput.onChange(e);
                                    handleInputChange("githubAddress", e.target.value);
                                }}
                                placeholder="깃허브 주소"
                                disabled={!isActive.githubAddress}
                            />
                            {isActive.githubAddress && !githubInput.isValid && (
                                <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>
                                    깃허브 주소를 확인해 주세요.
                                </p>
                            )}
                        </div>
                        <Button onClick={() => toggleActive('githubAddress')} active={isActive.githubAddress}>
                            {isActive.githubAddress ? '-' : '+'}
                        </Button>
                    </div>

                    <div style={{display: "flex"}}>
                        <img src={blogIcon} alt="blog" style={{padding: 7, width: 25, height: 25}}/>
                        <div>
                            <Input
                                value={blogInput.value}
                                onChange={(e) => {
                                    blogInput.onChange(e);
                                    handleInputChange("blogAddress", e.target.value);
                                }}
                                placeholder="블로그 주소"
                                disabled={!isActive.blogAddress}
                            />
                            {isActive.blogAddress && !blogInput.isValid && (
                                <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>
                                    블로그 주소를 확인해 주세요.
                                </p>
                            )}
                        </div>
                        <Button onClick={() => toggleActive('blogAddress')} active={isActive.blogAddress}>
                            {isActive.blogAddress ? '-' : '+'}
                        </Button>
                    </div>
                </div>
                <div>
                    <ImageContainer style={{marginLeft: 60}}>
                        <input style={{marginLeft: 55}} type="file" onChange={handleImageChange} accept="image/*"/>
                        {imagePreviewUrl && (
                            <ImagePreview style={{marginTop: 10}} src={imagePreviewUrl} alt="Profile Image"/>
                        )}
                    </ImageContainer>
                </div>
            </div>

            <div style={{display: "flex", marginLeft: 39}}>
                <div>
                    <Input
                        value={aboutMeInfo.selfIntroduction}
                        onChange={(e) => handleInputChange("selfIntroduction", e.target.value)}
                        style={{width: 600, height: 60, fontFamily:"inherit"}} as="textarea" placeholder="자기소개를 입력하세요."
                        disabled={!isActive.selfIntroduction}
                    />
                    {(isActive.selfIntroduction && !introInput.isValid) &&
                        <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>
                            입력을 확인해 주세요.
                        </p>
                    }
                </div>
                <Button onClick={() => toggleActive('selfIntroduction')} active={isActive.selfIntroduction}>
                    {isActive.selfIntroduction ? '-' : '+'}
                </Button>
            </div>
        </SectionContainer>
    );
};

export default AboutMe;
