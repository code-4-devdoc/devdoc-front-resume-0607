import React, { createContext, useContext, useState } from 'react';

// context 생성
const EducationContext = createContext();

export const EducationProvider = ({ children }) => {
    const [educationRecords, setEducationRecords] = useState([]);

    const addEducation = () => {
        const newEducation = {
            id: Date.now(),
            degree: '',
            schoolName: '',
            major: '',
            startDate: '',
            endDate: '',
            status: '재학'
        };
        // 기존 배열에 새로운 교육 기록 추가
        setEducationRecords([...educationRecords, newEducation]);
    };

    // 특정 교육 기록 업데이트
    const updateEducation = (updatedEducation) => {
        setEducationRecords(prevRecords =>
            prevRecords.map(record =>
                // 업데이트 해야 하는 id를 가진 record를 업데이트
                record.id === updatedEducation.id ? updatedEducation : record
            )
        );
    };

    const removeEducation = (id) => {
        setEducationRecords(prevRecords => prevRecords.filter(record => record.id !== id));
    };

    return (
        <EducationContext.Provider value={{ educationRecords, addEducation, updateEducation, removeEducation }}>
            {children}
        </EducationContext.Provider>
    );
};

export const useEducation = () => {
    return useContext(EducationContext);
};
