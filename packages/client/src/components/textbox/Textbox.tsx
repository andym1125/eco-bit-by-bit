import React, { useState, useEffect } from "react";
import "./Textbox.css";
import { useDeletedValues} from "./DeletedValuesContext";
import {useInputValues} from "./InputValuesContext";

interface InputBoxProps {
    onDelete: (value: string) => void;
}

const Textbox: React.FC<InputBoxProps> = ({ onDelete }) => {
    const { inputValues, setInputValues } = useInputValues();
    const [copied, setCopied] = useState<boolean[]>([false]);
    const { deletedValues, addDeletedValue } = useDeletedValues();

    const [dropdownVisible, setDropdownVisible] = useState<boolean[]>([]);

    const toggleDropdown = (index: number) => {
        const newDropdownVisible = [...dropdownVisible];
        newDropdownVisible[index] = !newDropdownVisible[index];
        setDropdownVisible(newDropdownVisible);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = e.target.value;
        setInputValues(newInputValues);
    };

    const handleInputBoxDelete = (index: number) => {
        const deletedValue = inputValues[index];
        const newInputValues = inputValues.filter((_, i) => i !== index);
        addDeletedValue(deletedValue);
        const newCopied = [...copied];
        newCopied.splice(index, 1);
        setCopied(newCopied);
        setInputValues(newInputValues);
        onDelete(deletedValue);
    };

    const addInputBox = () => {
        if (inputValues.length < 10) {
            setInputValues([...inputValues, ""]);
            setCopied([...copied, false]);
        }
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        const newCopied = [...copied];
        newCopied[index] = true;
        setCopied(newCopied);
        setTimeout(() => {
            const newCopied = [...copied];
            newCopied[index] = false;
            setCopied(newCopied);
        }, 2000);
    };

    return (
        <div className="container">
            {inputValues.map((value, index) => (
                <div key={index} className="input-box-container">
                    <div className = 'input-wrapper'>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(e, index)}
                            className="input-box"
                        />
                        <button
                            className="copy-button"
                            onClick={() => copyToClipboard(value, index)}
                        >
                            {copied[index] ? "Copied!" : "Copy URL"}
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => handleInputBoxDelete(index)}
                        >
                            Delete
                        </button>
                        <button className="score-button" onClick={() => toggleDropdown(index)}>
                            Score
                        </button>
                        {dropdownVisible[index] && (
                            <div className="dropdown-menu" style={{ width: '100%' }}>
                                <p>score: 0</p>
                                <p>Breakdown: </p>
                                <ul>
                                    <li>
                                        water: 0, carbon: 0, esg: AAA, bio: 0, recycle: 0, durable: 0
                                    </li>
                                    <li>
                                        extra content
                                    </li>
                                    <li>
                                        explanation
                                    </li>
                                    <li>
                                        error if they exists other wise empty
                                    </li>
                                    <li>
                                        reliability: 0
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <button onClick={addInputBox} className="add-box-button">
                Add Input Box
            </button>
        </div>
    );
};

export default Textbox;
