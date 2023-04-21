import React, { createContext, useContext, useState } from 'react';

interface DeletedValuesContextData {
    deletedValues: string[];
    addDeletedValue: (value: string) => void;
}

const DeletedValuesContext = createContext<DeletedValuesContextData | null>(null);

export const useDeletedValues = () => {
    const context = useContext(DeletedValuesContext);
    if (!context) {
        throw new Error('useDeletedValues must be used within a DeletedValuesProvider');
    }
    return context;
};

interface DeletedValuesProviderProps {
    children: React.ReactNode;
}

export const DeletedValuesProvider: React.FC<DeletedValuesProviderProps> = ({ children }) => {
    const [deletedValues, setDeletedValues] = useState<string[]>([]);

    const addDeletedValue = (value: string) => {
        setDeletedValues((prevState) => [...prevState, value]);
    };

    return (
        <DeletedValuesContext.Provider value={{ deletedValues, addDeletedValue }}>
            {children}
        </DeletedValuesContext.Provider>
    );
};
