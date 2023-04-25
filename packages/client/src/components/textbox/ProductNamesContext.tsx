import React, { createContext, useContext, useState } from 'react';

interface ProductNamesContextData {
    productNames: string[];
    addProductName: (value: string) => void;
    setAllProductNames: (values: string[]) => void;
}

const ProductNamesContext = createContext<ProductNamesContextData | null>(null);

export const useProductNames = () => {
    const context = useContext(ProductNamesContext);
    if (!context) {
        throw new Error('useProductNames must be used within a ProductNamesProvider');
    }
    return context;
};

interface ProductNamesProviderProps {
    children: React.ReactNode;
}

export const ProductNamesProvider: React.FC<ProductNamesProviderProps> = ({ children }) => {
    const [productNames, setProductNames] = useState<string[]>([]);

    const addProductName = (value: string) => {
        setProductNames((prevState) => [...prevState, value]);
    };

    const setAllProductNames = (values: string[]) => {
        setProductNames(values);
    };

    return (
        <ProductNamesContext.Provider value={{ productNames, addProductName, setAllProductNames }}>
            {children}
        </ProductNamesContext.Provider>
    );
};
