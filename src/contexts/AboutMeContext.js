import React, { createContext, useContext, useState } from 'react';

const AboutMeContext = createContext();

export const AboutMeProvider = ({ children }) => {
    const [aboutMeInfo, setAboutMeInfo] = useState({
        // aboutMeInfo 객체의 필드 값 초기화
        name: '',
        birthday: '',
        phone: '',
        email: '',
        githubAddress: '',
        blogAddress: '',
        selfIntroduction: '',
        profileImage: null
    });

    // 특정 필드의 값을 업데이트
    const updateAboutMeInfo = (field, value) => {
        setAboutMeInfo(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AboutMeContext.Provider value={{ aboutMeInfo, updateAboutMeInfo }}>
            {children}
        </AboutMeContext.Provider>
    );
};

// 훅을 통해 AboutMeContext 사용
export const useAboutMe = () => useContext(AboutMeContext);