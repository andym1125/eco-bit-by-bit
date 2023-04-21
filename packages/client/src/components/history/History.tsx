import React, { useState} from "react";
import { Link } from "react-router-dom";
import {useDeletedValues} from "../textbox/DeletedValuesContext";

function Quiz() {
    const { deletedValues } = useDeletedValues();
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);

        setTimeout(() => {
            setCopiedIndex(null);
        }, 2000);
    };

    return (
        <div>
            <h2>Deleted Values</h2>
            <ul>
                {deletedValues.map((value, index) => (
                    <li key={index}>
                        {value}{' '}
                        <button
                            onClick={() => copyToClipboard(value, index)}
                        >
                            {copiedIndex === index ? 'Copied!' : 'Copy'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Quiz;