import MenuListComposition from "../../ResumeCommon/MenuListComposition";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import UseRadioGroup from "../../ResumeCommon/UseRadioGroup";
import {useEducation} from "../../../contexts/EducationContext";

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
`

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    width: 150px;
`;

const EducationRecord = ({education,onRemove}) => {
    const { updateEducation } = useEducation(); // education context
    const [schoolName, setSchoolName] = useState(education.schoolName || '');
    const [degree, setDegree] = useState(education.degree || '');
    const [major, setMajor] = useState(education.major || '');
    const [selectedRadio, setSelectedRadio] = useState(education.status || '재학');
    const [startDate, setStartDate] = useState(education.startDate || '');
    const [endDate, setEndDate] = useState(education.endDate || '');
    const [error, setError] = useState('');

    useEffect(() => {
        updateEducation({ id: education.id, schoolName, degree, major, startDate, endDate, status: selectedRadio });
    }, [schoolName, degree, major, startDate, endDate, selectedRadio, updateEducation, education.id]);


    //const [selectedRadio, setSelectedRadio] = useState('first'); // 기본값 설정
    const degrees = ["고등학교", "대학교 (2,3년)", "대학교 (4년)", "대학원 (석사)", "대학원 (박사)"];

    const radioOptions = [
        { value: '재학', label: '재학' },
        { value: '휴학', label: '휴학' },
        { value: '중퇴', label: '중퇴' },
        { value: '졸업(예정)', label: '졸업(예정)' }
    ];
    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    };

    const handleDegreeChange = (deg) => {
        setDegree(deg);
    }

    //const [startDate, setStartDate] = useState('');
    //const [endDate, setEndDate] = useState('');
    //const [error, setError] = useState('');

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleDateChange = (setDate, value) => {
        setDate(value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    useEffect(() => {
        if (selectedRadio === '재학') {
            setEndDate('');
        }
    }, [selectedRadio]);

    return (
        <Border>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <button style={{
                    cursor: "pointer",
                    borderRadius: "0px 8px 0px 3px",
                    width: 30,
                    height: 20,
                    backgroundColor: "rgba(18, 73, 156, 50%)",
                    color: "white",
                    border: "none"
                }} onClick={onRemove}>-
                </button>
            </div>
            <div style={{display: "flex", gap: 5}}>
                <MenuListComposition value={degree} menuTitle="학력 구분" menuItems={degrees} onChange={handleDegreeChange}></MenuListComposition>
                <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="학교명"/>
                <Input value={major} onChange={(e) => setMajor(e.target.value)} placeholder="전공"/>
            </div>
            <div style={{display: "flex", gap: 5, alignItems: "center", marginTop: 5}}>
                <Input style={{width: 70}} placeholder="YYYY.MM" value={startDate}
                       onChange={(e) => handleDateChange(setStartDate, e.target.value)}/>
                <span>-</span>
                <Input style={{width: 70, marginRight:10}} placeholder="YYYY.MM"
                       value={endDate}
                       onChange={(e) => handleDateChange(setEndDate, e.target.value)}
                       disabled={selectedRadio === '재학'}/>
                <UseRadioGroup options={radioOptions} value={selectedRadio} onChange={handleRadioChange}/>
            </div>
            {error && <div style={{fontSize: 13, color: 'rgba(202, 5, 5, 1)'}}>{error}</div>}
        </Border>
    );
};

export default EducationRecord;