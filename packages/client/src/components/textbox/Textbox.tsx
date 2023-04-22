import React, { useState, useEffect, useContext } from "react";
import "./Textbox.css";
import { useDeletedValues} from "./DeletedValuesContext";
import {useInputValues} from "./InputValuesContext";

interface ScoreResponseBody {
    score: number;
    breakdown: {
        water: number;
        carbon: number;
        esg: "CCC" | "B" | "BB" | "BBB" | "A" | "AA" | "AAA";
        bio: number;
        recycle: number;
        durable: number;
        ctx: string; //extra context of breakdown if needed
    };
    expl: string; //explanation of scores
    err: string; //if error exists, this will not be empty
    reli_expl: string;
    reliability: number;
}

interface InputBoxProps {
    onDelete: (value: string) => void;
}

const Textbox: React.FC<InputBoxProps> = ({ onDelete }) => {
    const { inputValues, setInputValues } = useInputValues();
    const [copied, setCopied] = useState<boolean[]>([false]);
    const { deletedValues, addDeletedValue } = useDeletedValues();
    const [dropdownVisible, setDropdownVisible] = useState<boolean[]>([]);
    const [scoreData, setScoreData] = useState<ScoreResponseBody | null>(null);
    const [allScores, setAllScores] = useState<ScoreResponseBody[]>([]);

    const fetchData = async (url: string) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data: ScoreResponseBody = await response.json();
                console.log("Fetched data:", data);
                setAllScores((prevScores) => [...prevScores, data]);
            } else {
                console.error("Error fetching data. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchScoreData = (inputUrl: string) => {
        const productId = inputUrl.split("/").slice(3).join("/");
        fetchData(`http://localhost:3001/score/${productId}`);
    };

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
                    <div className='input-wrapper'>
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
                        <button
                            className="score-button"
                            onClick={() => {
                                toggleDropdown(index);
                                fetchScoreData(value);
                            }}
                        >
                            Score
                        </button>
                        {dropdownVisible[index] && allScores[index] && (
                            <div className="dropdown-menu" style={{ width: '100%' }}>
                                <h3>Score: {allScores[index].score}</h3>
                                <h4>Reliability: {allScores[index].reliability}</h4>
                                <p>Explanation: {allScores[index].expl}</p>
                                <p>Error: {allScores[index].err}</p>
                                <p>Reliability Explanation: {allScores[index].reli_expl}</p>
                                <h4>Breakdown:</h4>
                                <ul>
                                    <li>Water: {allScores[index].breakdown.water}</li>
                                    <li>Carbon: {allScores[index].breakdown.carbon}</li>
                                    <li>ESG: {allScores[index].breakdown.esg}</li>
                                    <li>Bio: {allScores[index].breakdown.bio}</li>
                                    <li>Recycle: {allScores[index].breakdown.recycle}</li>
                                    <li>Durable: {allScores[index].breakdown.durable}</li>
                                    <li>Extra context: {allScores[index].breakdown.ctx}</li>
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
