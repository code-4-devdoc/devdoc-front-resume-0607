import React, {useState} from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import styled from 'styled-components';
import blogIcon from '../../../assets/blog-icon.png'
import githubIcon from '../../../assets/github-icon.png'
import emailIcon from '../../../assets/email-icon.png'
import phoneIcon from '../../../assets/phone-icon.png'
import birthdayIcon from '../../../assets/birthday-icon.png'

const Input = styled.input`
    padding: 8px;
    margin-right: 8px; margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;    
    font-size: 15px;
`;

const Button = styled.button`
    width: 25px; height: 25px;
    background-color: ${props => props.active ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)'};
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px; margin-top: 7px;
`;

// 입력 검증 HOOK
function useInputValidation(initialValue, pattern) {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(true);

    function onChange(e) {
        const newValue = e.target.value;
        const valid = pattern.test(newValue);
        setIsValid(valid);
        setValue(newValue);
    }

    return { value,setValue, onChange, isValid };
}

const AboutMe = () => {

    const [isActive, setIsActive] = useState({
        phone: false,
        email: false,
        githubAddress: false,
        blogAddress: false,
        selfIntroduction: false,
        birthday: false
    });

    // 활성화 상태를 토글하는 함수
    const toggleActive = (field, input) => {
        setIsActive(prev => {
            // 현재 필드의 활성화 상태를 토글
            const newState = { ...prev, [field]: !prev[field] };

            // 비활성화하고 입력이 유효하지 않다면, 입력 값을 초기화
            if (prev[field] && !input.isValid) {
                input.setValue("");  // 입력 초기화
            }
            return newState;
        });
    };

    const phoneInput = useInputValidation("", /^\d{3}-\d{4}-\d{4}$/);
    const emailInput = useInputValidation("", /^[a-zA-Z0-9.]+@[a-z]+\.[a-z]+$/);
    const birthdayInput = useInputValidation("", /^\d{4}-\d{2}-\d{2}$/);
    const githubInput = useInputValidation("", /^https:\/\/github\.com\/([a-zA-Z0-9_-]+\/?[a-zA-Z0-9_-]*\/?)*$/);
    const blogInput = useInputValidation("", /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/);
    const introInput = useInputValidation("", /^[\s\S]*$/);


    return (
        <SectionContainer title="About Me">
            <Input placeholder="이름" style={{marginLeft: 39}}/>

            <div style={{display: "flex"}}>
                <img src={birthdayIcon} alt="birthday" style={{padding: 7, width: 25, height: 25}}/>
                <div>
                    <Input placeholder="YYYY-MM-DD" disabled={!isActive.birthday} {...birthdayInput}
                           isValid={birthdayInput.isValid}/>
                    {(isActive.birthday && !birthdayInput.isValid) &&
                        <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>날짜 형식에 맞게 입력해 주세요.</p>}
                </div>
                <Button onClick={() => toggleActive('birthday', birthdayInput)} active={isActive.birthday}>
                    {isActive.birthday ? '-' : '+'}
                </Button>
            </div>

            <div style={{display: "flex"}}>
                <img src={phoneIcon} alt="phone" style={{padding: 7, width: 25, height: 25}}/>
                <div>
                    <Input placeholder="전화번호 ('-' 포함)" disabled={!isActive.phone} {...phoneInput} isValid={phoneInput.isValid}/>
                    {(isActive.phone && !phoneInput.isValid) &&
                        <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>전화번호를 확인해
                            주세요.</p>}
                </div>
                <Button onClick={() => toggleActive('phone', phoneInput)} active={isActive.phone}>
                    {isActive.phone ? '-' : '+'}
                </Button>
            </div>

            <div style={{display: "flex"}}>
                <img src={emailIcon} alt="email" style={{padding: 7, width: 25, height: 25}}/>
                <div>
                    <Input placeholder="이메일" disabled={!isActive.email} {...emailInput} isValid={emailInput.isValid}/>
                    {(isActive.email && !emailInput.isValid) &&
                        <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>이메일 주소를
                            확인해 주세요.</p>}
                </div>
                <Button onClick={() => toggleActive('email', emailInput)} active={isActive.email}>
                    {isActive.email ? '-' : '+'}
                </Button>
            </div>

            <div style={{display: "flex"}}>
                <img src={githubIcon} alt="github" style={{padding: 7, width: 25, height: 25}}/>
                <div>
                    <Input placeholder="깃허브 주소" disabled={!isActive.githubAddress} {...githubInput} isValid={githubInput.isValid}/>
                    {(isActive.githubAddress && !githubInput.isValid) &&
                        <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>깃허브 주소를
                            확인해 주세요.</p>}
                </div>
                <Button onClick={() => toggleActive('githubAddress', githubInput)} active={isActive.githubAddress}>
                    {isActive.githubAddress ? '-' : '+'}
                </Button>
            </div>

            <div style={{display: "flex"}}>
                <img src={blogIcon} alt="blog" style={{padding: 7, width: 25, height: 25}}/>
                <div>
                    <Input placeholder="블로그 주소" disabled={!isActive.blogAddress} {...blogInput} isValid={blogInput.isValid}/>
                    {(isActive.blogAddress && !blogInput.isValid) &&
                        <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>블로그 주소를
                            확인해 주세요.</p>}
                </div>
                <Button onClick={() => toggleActive('blogAddress', blogInput)} active={isActive.blogAddress}>
                    {isActive.blogAddress ? '-' : '+'}
                </Button>
            </div>

            <div style={{display: "flex", marginLeft: 39}}>
                <div>
                    <Input style={{width: 700, height: 60}} as="textarea" placeholder="자기소개를 입력하세요."
                           disabled={!isActive.selfIntroduction} {...introInput} isValid={introInput.isValid}/>
                    {(isActive.selfIntroduction && !introInput.isValid) &&
                        <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>입력을 확인해 주세요.</p>}
                </div>
                <Button onClick={() => toggleActive('selfIntroduction', introInput)} active={isActive.selfIntroduction}>
                    {isActive.selfIntroduction ? '-' : '+'}
                </Button>
            </div>
        </SectionContainer>
    );
};

export default AboutMe;