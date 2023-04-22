import React, { createContext, useContext, useState } from 'react';

interface InputValuesContextData {
    inputValues: string[];
    setInputValues: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputValuesContext = createContext<InputValuesContextData | null>(null);

export const useInputValues = () => {
    const context = useContext(InputValuesContext);
    if (!context) {
        throw new Error('useInputValues must be used within an InputValuesProvider');
    }
    return context;
};

interface InputValuesProviderProps {
    children: React.ReactNode;
}

export const InputValuesProvider: React.FC<InputValuesProviderProps> = ({ children }) => {
    const [inputValues, setInputValues] = useState<string[]>(['']);

    return (
        <InputValuesContext.Provider value={{ inputValues, setInputValues }}>
            {children}
        </InputValuesContext.Provider>
    );
};
