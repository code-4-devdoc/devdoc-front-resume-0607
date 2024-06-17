import React, { createContext, useContext, useState } from "react";

const AwardContext = createContext();

export const AwardProvider = ({children}) => {
    const [awardRecords, setAwardRecords] = useState([]);

    const addAward = () => {
        const newAward = {
            id: Date.now(),
            awardYear: '',
            awardName: '',
            awardingBody: '',
            description: '',
        }
        setAwardRecords([...awardRecords, newAward]);
    }

    const updateAward = (updatedAward) => {
        setAwardRecords(prevRecords =>
            prevRecords.map(record =>
                record.id === updatedAward.id ? updatedAward : record
            )
        );
    };
    const removeAward = (id) => {
        setAwardRecords(
            prevRecords => prevRecords.filter(record => record.id !== id)
        );
    };

    return (
        <AwardContext.Provider value={{ awardRecords, addAward, updateAward, removeAward }}>
            {children}
        </AwardContext.Provider>
    )
}

export const useAward = () => useContext(AwardContext);