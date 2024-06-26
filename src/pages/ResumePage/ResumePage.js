import React, {useState} from "react";
import './ResumePage.css'
import ResumeNav from "../../components/ResumeCommon/ResumeNav";
import styled from "styled-components";
import CategoryList from "../../components/ResumeCategory/CategoryList";
import FormContent from "../../components/ResumeForm/FormContent";

const CategoryContainer = styled.div`
    margin-left: 20px;
    width: 400px;
    height: 600px;
    background-color: rgba(0, 30, 89, 1);
`

const CategoryContainer2 = styled.div`
    width:85%;
    height: 90%;
    background-color: white;
    border-radius: 5px;
`

const Title = styled.h3`
    margin-top: 25px;
    margin-left: 25px;
    margin-bottom: 15px;
    background-color: white;
    color: black;
`

const Line = styled.div`
    height: 1px;
    margin-left: 20px;
    width: 300px;
    background-color: rgba(0, 30, 89, 1);
`

const Button = styled.button`
    width: 90px;
    height: 40px;
    background-color: rgba(0, 69, 171, 1);
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`

const ResumeTitle = styled.input`
    display: flex;
    align-items: center;
    width: 700px;
    height: 30px;
    font-size: 20px;
    padding: 15px;
    border-radius: 5px;
    border-color: rgba(89, 127, 200, 1);
    border-width: 3px;
    border-style: solid;
`

const ResumePage = () => {

    // activeSections 배열: CategoryList 컴포넌트에서 활성화한 섹션들의 이름 저장
    const [activeSections, setActiveSections] = useState([]);

    // sections 배열: CategoryList 컴포넌트에서 전달 받은 현재 열려 있는 섹션들의 이름 배열
    const handleSectionChange = (sections) => {
        setActiveSections(sections); // activeSections 상태를 업데이트
    };

    // 이력서 제목 입력
    const [resumeTitle, setResumeTitle] = useState("");

    const handleTitleChange = (event) => {
        setResumeTitle(event.target.value);
    };

    return (
        <div className="app">
            <div className="nav">
                <ResumeNav defaultActive="작성"/>
            </div>
            <div style={{display:'flex'}}>
                <div className="category-container">
                    <CategoryContainer style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <CategoryContainer2>
                            <Title>이력서 항목</Title>
                            <Line/>
                            <CategoryList onSectionChange={handleSectionChange}></CategoryList>
                        </CategoryContainer2>
                    </CategoryContainer>
                </div>
                <div className="form-container">
                    <div style={{marginTop: 25, marginRight: 25, display:"flex", justifyContent:'end', gap: 10}}>
                        <Button>미리보기</Button>
                        <Button>저장</Button>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', marginTop: 30, marginBottom:10}}>
                        <ResumeTitle type="text" vaue={resumeTitle} onChange={handleTitleChange} placeholder="이력서 제목 (저장용)"/>
                    </div>
                    <FormContent activeSections={activeSections}/>
                </div>
            </div>
        </div>
    );
};

export default ResumePage;