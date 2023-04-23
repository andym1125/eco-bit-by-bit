import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDeletedValues } from "../textbox/DeletedValuesContext";
import "./History.css";

function History() {
    const { deletedValues } = useDeletedValues();
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const productName = (url: string): string => {
        const titleRegex = /https:\/\/www\.amazon\.com\/(.*?)\//;
        const matches = url.match(titleRegex);
        return matches ? matches[1] : url;
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);

        setTimeout(() => {
            setCopiedIndex(null);
        }, 2000);
    };

    return (
        <div>
            <header className="Header-History">
                <h1>History Page</h1>
            </header>
            <h2 className = 'heading'>Deleted Products </h2>
            <ul>
                {deletedValues.map((value, index) => (
                    <li key={index} className="product-item">
                        <div className="product-container">
                            <div className="product-title">{productName(value)}</div>
                        </div>
                        <button
                            className="copy-button"
                            onClick={() => copyToClipboard(value, index)}
                        >
                            {copiedIndex === index ? "Copied!" : "Copy URL"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default History;
