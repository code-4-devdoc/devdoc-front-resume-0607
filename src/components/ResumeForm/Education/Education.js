import React from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import EducationRecord from "./EducationRecord";
import AddRecord from "../../ResumeCommon/AddRecord";
import {useEducation} from "../../../contexts/EducationContext";


const Education = () => {

    const { educationRecords, addEducation, removeEducation } = useEducation();

    // const [educations, setEducations] = useState([
    //     <EducationRecord key={0} onRemove={() => removeEducation(0)} />
    // ]);
    //
    // const addEducation = () => {
    //     setEducations(prev => [
    //         ...prev,
    //         <EducationRecord key={prev.length} onRemove={() => removeEducation(prev.length)} />
    //     ]);
    // };
    //
    // const removeEducation = (index) => {
    //     setEducations(prev => prev.filter((_, idx) => idx !== index));
    // };

    return (
        <SectionContainer title="Education">
            {educationRecords.map(edu => (
                <EducationRecord key={edu.id} education={edu} onRemove={() => removeEducation(edu.id)} />
            ))}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="학력" onClick={addEducation}></AddRecord>
        </SectionContainer>
    );
};

export default Education;