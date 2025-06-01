import React, { createContext, useEffect, useState } from 'react';
import initialKeywords from '../data/initialKeywords';
import { loadData, saveData } from '../utils/storage';

export const TranslationContext = createContext();

const TranslationContextProvider = ({ children }) => {
    const [keywords, setKeywords] = useState([]);
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const store = loadData();
        if (store && Array.isArray(store)) {
            setKeywords(store);
        } else {
            setKeywords(initialKeywords.keywords);
            saveData(initialKeywords.keywords);
        }
    }, []);

    const updateKeywords = (newKeywords) => {
        setKeywords(newKeywords);
        saveData(newKeywords);
    };

    return (
        <TranslationContext.Provider value={{ keywords, language, setLanguage, updateKeywords }}>
            {children}
        </TranslationContext.Provider>
    );
};

export default TranslationContextProvider;
