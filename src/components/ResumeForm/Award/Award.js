import React from 'react';
import AwardRecord from "./AwardRecord"
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import {useAward} from "../../../contexts/AwardContext";

const Award = () => {
    // const [awards, setAwards] = useState([
    //     <AwardRecord key={0} onRemove={() => removeAward(0)} />
    // ]);
    //
    // const addAward = () => {
    //     setAwards(prev => [
    //         ...prev,
    //         <AwardRecord key={prev.length} onRemove={() => removeAward(prev.length)} />
    //     ]);
    // };
    //
    // const removeAward = (index) => {
    //     setAwards(prev => prev.filter((_, idx) => idx !== index));
    // };

    const { awardRecords, addAward, removeAward } = useAward();


    return (
        <SectionContainer title="Award">
            {awardRecords.map(award => (
                <AwardRecord key={award.id} award={award} onRemove={() => removeAward(award.id)} />
            ))}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="수상 이력" onClick={addAward}></AddRecord>
        </SectionContainer>
    );
};

export default Award;
