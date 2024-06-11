import React, {useState} from "react";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";
import AddRecord from "../../ResumeCommon/AddRecord";
import MainSkill from "./MainSkill";

const Skill = () => {
    const [mainSkills, setMainSkills] = useState([]);

    const addMainSkill = () => {
        if (mainSkills.length < 3) { // 최대 3개까지만 추가 가능
            setMainSkills(prev => [...prev, <MainSkill key={prev.length} onRemove={() => removeMainSkill(prev.length)} />]);
        }
    }

    const removeMainSkill = (index) => {
        setMainSkills(prev => prev.filter((_, idx) => idx !== index));
        // idx !== index일 경우에만 mainSkills 배열에 추가 (즉, 현재 인덱스 요소만 제외하고 생성 되는 배열)
    };

    return (
        <SectionContainer title="Skill">
            <SkillSearchComponent></SkillSearchComponent>
            <div style={{height: 15}}></div>
            {mainSkills}
            <div style={{height: 15}}></div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <AddRecord fieldName="주요 기술" onClick={addMainSkill}></AddRecord>
                <div>
                    <span style={{fontSize: 11, color: "rgba(90, 214, 169, 1)"}}>*</span><span style={{fontSize: 11}}> 주요 기술은 최대 3개까지 추가할 수 있습니다.</span>
                </div>
            </div>
        </SectionContainer>
    );
}

export default Skill;